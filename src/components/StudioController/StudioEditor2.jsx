import { useDispatch, useSelector } from 'react-redux';
import styles from './StudioEditor.module.css'
import React, { useEffect, useRef, useState } from 'react';
import { deleteNode, deleteNodeFromProject, duplicateLayer, duplicateLayerBack, duplicateLayerFront, editNodeText, nodeTextUpdate, nodeTextWidthUpdate, resizeImageNode, updateNodeDimension, updateNodePosition, updateNodePositions, updateNodeWidth } from '../../utils/nodeSclice';
import StyleEditor from './StyleEditor';
import { addEditingnodeId, removeEditingnodeId } from '../../utils/selectedNodeSlice';
import placeholderImage from '../../assets/images/placeholder-image.jpg'
import { baseurl } from '../../config/apiUrl';
import Nodes from '../Nodes/Nodes';

const StudioEditor2 = ({ cardside, cardsideToogler }) => {
    const nodes = useSelector((state) => state.node.data);
    const background = useSelector((state) => state.background.data);
    const [selectedNodes, setSelectedNodes] = useState([]);
    const [editingDivId, setEditingDivId] = useState(null);
    const [scale, setScale] = useState(1);
    const backgroundStyles = (side, type, bg) => {
        if (side === 'front') {
            if (type === 'solid') {
                return {
                    background: bg?.front?.bgcolor,
                };
            } else if (type === 'gradient') {
                return {
                    background: `linear-gradient(${bg?.front?.gradient.direction}, ${bg?.front?.gradient.colors.map((c) => `${c.code} ${c.spread}%`).join(", ")})`
                };
            } else {
                return {
                    background: bg?.front?.bgimage_url ? `url(http://localhost:52495${bg?.front?.bgimage_url}?v=${Date.now()}) no-repeat center/cover` : undefined
                };
            }
        } else {
            if (type === 'solid') {
                return {
                    background: bg?.back?.bgcolor,
                };
            } else if (type === 'gradient') {
                return {
                    background: `linear-gradient(${bg?.back?.gradient?.direction}, ${bg?.back?.gradient?.colors?.map((c) => `${c.code} ${c.spread}%`).join(', ')})`,
                };
            } else {
                return {
                    background: bg?.back?.bgimage_url ? `url(http://localhost:52495${bg?.back?.bgimage_url}?v=${Date.now()}) no-repeat center/cover` : undefined
                };
            }
        }
    }
    const parentRef = useRef(null);
    const resizeRefs = useRef({});
    const editorRef = useRef(null);
    const leftGuideLineRef = useRef(null);
    const topGuideLineRef = useRef(null);
    const rightGuideLineRef = useRef(null);
    const bottomGuideLineRef = useRef(null);
    const centerLineRef = useRef(null);
    const middleLineRef = useRef(null);

    const contextRef = useRef(null);
    const editorWrapperRef = useRef(null);

    const dispatch = useDispatch();
    const handleSelectNodes = (id, event) => {
        event.preventDefault();
        if (event.ctrlKey) {
            if (selectedNodes.includes(id)) {
                setSelectedNodes(selectedNodes.filter(item => item !== id));
            } else {
                setSelectedNodes([...selectedNodes, id]);
            }
        } else {
            setSelectedNodes([id]);
        }
    }
    const startEditing = (id) => {
        setEditingDivId(id);
        dispatch(addEditingnodeId(id));
    }
    const stopEditing = () => {
        setEditingDivId(null);
        dispatch(removeEditingnodeId());
    }
    const handleMouseDrag = (e) => {
        if (editingDivId) return;
        const startX = e.clientX;
        const startY = e.clientY;

        const selectedNodeState = nodes.filter((node) =>
            selectedNodes.includes(node.id)
        );

        const resizing = selectedNodeState.some((node) => {
            return resizeRefs.current[node.id]?.current?.contains(e.target);
        })

        if (resizing) return;
        let finalJson;
        const onMouseMove = (moveEvent) => {
            const deltaX = moveEvent.clientX - startX;
            const deltaY = moveEvent.clientY - startY;
            const updates = selectedNodeState.map((node) => {
                let eleHeight, eleWidth;
                if (node.id.toString() === e.target.id) {
                    eleHeight = e.target.offsetHeight;
                    eleWidth = e.target.offsetWidth;
                } else if (node.id.toString() === e.target.parentElement?.id) {
                    eleHeight = e.target.parentElement.offsetHeight;
                    eleWidth = e.target.parentElement.offsetWidth;
                } else {
                    eleHeight = node.height;
                    eleWidth = node.width;
                }
                const newX = Math.min(Math.max(node.x + deltaX, 21), 1008 + 21 - node.width);
                const newY = Math.min(Math.max(node.y + deltaY, 21), 558 + 21 - eleHeight);
                if (newX === 21) {
                    leftGuideLineRef.current.style.opacity = 1;
                } else {
                    leftGuideLineRef.current.style.opacity = 0;
                }
                if (newX === 829) {
                    rightGuideLineRef.current.style.opacity = 1;
                } else {
                    rightGuideLineRef.current.style.opacity = 0;
                }
                if (newY === 21) {
                    topGuideLineRef.current.style.opacity = 1;
                } else {
                    topGuideLineRef.current.style.opacity = 0;
                }
                if (newY === 535) {
                    bottomGuideLineRef.current.style.opacity = 1;
                } else {
                    bottomGuideLineRef.current.style.opacity = 0;
                }

                const elementCenterX = newX + eleWidth / 2;
                const centerLineX = centerLineRef.current.offsetLeft;

                if (Math.abs(elementCenterX - centerLineX) < 2) {
                    centerLineRef.current.style.opacity = 1;
                } else {
                    centerLineRef.current.style.opacity = 0;
                }
                const elementCenterY = newY + eleHeight / 2;
                const middleLineY = middleLineRef.current.offsetTop;
                if (Math.abs(elementCenterY - middleLineY) < 2) {
                    middleLineRef.current.style.opacity = 1;
                } else {
                    middleLineRef.current.style.opacity = 0;
                }

                return { id: node.id, x: newX, y: newY };
            })
            finalJson = JSON.stringify(updates);
            dispatch(updateNodePositions({ updates }));
        };

        const onMouseUp = () => {
            leftGuideLineRef.current.style.opacity = 0;
            topGuideLineRef.current.style.opacity = 0;
            rightGuideLineRef.current.style.opacity = 0;
            bottomGuideLineRef.current.style.opacity = 0;
            centerLineRef.current.style.opacity = 0;
            middleLineRef.current.style.opacity = 0;
            if (finalJson) {
                dispatch(updateNodePosition(finalJson));
            }
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("mouseup", onMouseUp);
        };

        window.addEventListener("mousemove", onMouseMove);
        window.addEventListener("mouseup", onMouseUp);
    };
    const handleMouseDragImage = (e) => {
        if (editingDivId) return;
        const startX = e.clientX;
        const startY = e.clientY;

        const selectedNodeState = nodes.filter((node) =>
            selectedNodes.includes(node.id)
        );

        const resizing = selectedNodeState.some((node) => {
            return resizeRefs.current[node.id]?.current?.contains(e.target);
        })

        if (resizing) return;
        let finalJson;
        const onMouseMove = (moveEvent) => {
            const deltaX = moveEvent.clientX - startX;
            const deltaY = moveEvent.clientY - startY;
            const updates = selectedNodeState.map((node) => {
                let eleHeight, eleWidth;
                if (node.id.toString() === e.target.id) {
                    eleHeight = e.target.offsetHeight;
                    eleWidth = e.target.offsetWidth;
                } else if (node.id.toString() === e.target.parentElement?.id) {
                    eleHeight = e.target.parentElement.offsetHeight;
                    eleWidth = e.target.offsetWidth;
                } else {
                    eleHeight = node.height;
                    eleWidth = node.width;
                }
                const newX = Math.min(Math.max(node.x + deltaX, 0), 1050 - node.width);
                const newY = Math.min(Math.max(node.y + deltaY, 0), 600 - eleHeight);
                leftGuideLineRef.current.style.opacity = 1;
                topGuideLineRef.current.style.opacity = 1;
                rightGuideLineRef.current.style.opacity = 1;
                bottomGuideLineRef.current.style.opacity = 1;

                const elementCenterX = newX + eleWidth / 2;
                const centerLineX = centerLineRef.current.offsetLeft;

                if (Math.abs(elementCenterX - centerLineX) < 2) {
                    centerLineRef.current.style.opacity = 1;
                } else {
                    centerLineRef.current.style.opacity = 0;
                }
                const elementCenterY = newY + eleHeight / 2;
                const middleLineY = middleLineRef.current.offsetTop;
                if (Math.abs(elementCenterY - middleLineY) < 2) {
                    middleLineRef.current.style.opacity = 1;
                } else {
                    middleLineRef.current.style.opacity = 0;
                }

                return { id: node.id, x: newX, y: newY };
            })
            finalJson = JSON.stringify(updates);
            dispatch(updateNodePositions({ updates }));
        };

        const onMouseUp = () => {
            leftGuideLineRef.current.style.opacity = 0;
            topGuideLineRef.current.style.opacity = 0;
            rightGuideLineRef.current.style.opacity = 0;
            bottomGuideLineRef.current.style.opacity = 0;
            centerLineRef.current.style.opacity = 0;
            middleLineRef.current.style.opacity = 0;
            if (finalJson) {
                dispatch(updateNodePosition(finalJson));
            }
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("mouseup", onMouseUp);
        };

        window.addEventListener("mousemove", onMouseMove);
        window.addEventListener("mouseup", onMouseUp);
    };


    const handleMouseDragMagicText = (e) => {
        const startX = e.clientX;
        const startY = e.clientY;

        const selectedNodeState = nodes.filter((node) =>
            selectedNodes.includes(node.id)
        );

        const resizing = selectedNodeState.some((node) => {
            return resizeRefs.current[node.id]?.current?.contains(e.target);
        })

        if (resizing) return;
        let finalJson;
        const onMouseMove = (moveEvent) => {
            const deltaX = moveEvent.clientX - startX;
            const deltaY = moveEvent.clientY - startY;
            const updates = selectedNodeState.map((node) => {
                let eleHeight, eleWidth;
                eleHeight = e.target.parentElement.offsetHeight;
                eleWidth = e.target.parentElement.offsetWidth;
                const newX = Math.min(Math.max(node.x + deltaX, 21), 1008 + 21 - eleWidth);
                const newY = Math.min(Math.max(node.y + deltaY, 21), 558 + 21 - eleHeight);
                leftGuideLineRef.current.style.opacity = 1;
                topGuideLineRef.current.style.opacity = 1;
                rightGuideLineRef.current.style.opacity = 1;
                bottomGuideLineRef.current.style.opacity = 1;

                const elementCenterX = newX + eleWidth / 2;
                const centerLineX = centerLineRef.current.offsetLeft;
                if (Math.abs(elementCenterX - centerLineX) < 2) {
                    centerLineRef.current.style.opacity = 1;
                } else {
                    centerLineRef.current.style.opacity = 0;
                }
                const elementCenterY = newY + eleHeight / 2;
                const middleLineY = middleLineRef.current.offsetTop;
                if (Math.abs(elementCenterY - middleLineY) < 2) {
                    middleLineRef.current.style.opacity = 1;
                } else {
                    middleLineRef.current.style.opacity = 0;
                }

                return { id: node.id, x: newX, y: newY };
            })
            finalJson = JSON.stringify(updates);
            dispatch(updateNodePositions({ updates }));
        };

        const onMouseUp = () => {
            leftGuideLineRef.current.style.opacity = 0;
            topGuideLineRef.current.style.opacity = 0;
            rightGuideLineRef.current.style.opacity = 0;
            bottomGuideLineRef.current.style.opacity = 0;
            centerLineRef.current.style.opacity = 0;
            middleLineRef.current.style.opacity = 0;
            if (finalJson) {
                dispatch(updateNodePosition(finalJson));
            }
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("mouseup", onMouseUp);
        };

        window.addEventListener("mousemove", onMouseMove);
        window.addEventListener("mouseup", onMouseUp);
    };

    const handleClickOutside = (e) => {
        if (!editorRef.current) {
            if (!parentRef.current.contains(e.target)) {
                setSelectedNodes([]);
                setEditingDivId(null);
                dispatch(removeEditingnodeId());
                if (!contextRef.current.contains(e.target)) {
                    setContentMenu({
                        visible: false,
                    })
                }
            }
        } else {
            if (!parentRef.current.contains(e.target) && !editorRef.current.contains(e.target)) {
                setSelectedNodes([]);
                setEditingDivId(null);
                dispatch(removeEditingnodeId());
                setContentMenu({
                    visible: false,
                })
                if (!contextRef.current.contains(e.target)) {
                    setContentMenu({
                        visible: false,
                    })
                }
            }
        }
    }
   
    const handleResizeRight = (e, id) => {
        e.preventDefault();
        const startX = e.clientX;
        const nodeToResize = nodes.find((node) => node.id === id);

        const initialWidth = nodeToResize.width;
        const initialX = nodeToResize.x;
        const parentWidth = 1050;
        let mainWidth;
        const onMouseMove = (moveEvent) => {
            const deltaX = moveEvent.clientX - startX;
            const newWidth = initialWidth + deltaX;
            const maxWidth = parentWidth - initialX;
            if (newWidth > 0 && newWidth <= maxWidth) {
                mainWidth = newWidth;
                dispatch(updateNodeWidth({ id, width: newWidth }));
            }
        };

        const onMouseUp = () => {
            if (mainWidth) {
                const formData = new FormData();
                formData.append("nodeid", id);
                formData.append("width", mainWidth);
                dispatch(nodeTextWidthUpdate(formData));
            }
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("mouseup", onMouseUp);
        };
        window.addEventListener("mousemove", onMouseMove);
        window.addEventListener("mouseup", onMouseUp);
    };

    const handleResizeImage = (e, id) => {
        e.preventDefault();
        const startX = e.clientX;
        const startY = e.clientY;
        const nodetoResize = nodes.find((node) => node.id === id);

        const initialWidth = nodetoResize.width;
        const initialHeight = nodetoResize.height;
        const initialX = nodetoResize.x;
        const initialY = nodetoResize.y;

        const aspectRatio = initialWidth / initialHeight;
        const parentWidth = 1050;
        const parentHeight = 600;

        let newWidth, newHeight;

        const onMouseMove = (moveElement) => {
            const deltaX = moveElement.clientX - startX;
            const deltaY = moveElement.clientY - startY;



            if (moveElement.altKey) {
                const delta = Math.max(deltaX, deltaY);
                newWidth = initialWidth + delta;
                newHeight = newWidth / aspectRatio;
            } else {
                newWidth = initialWidth + deltaX;
                newHeight = initialHeight + deltaY;
            }

            const maxWidth = parentWidth - initialX;
            const maxHeight = parentHeight - initialY;

            if (newWidth > 0 && newWidth <= maxWidth && newHeight > 0 && newHeight <= maxHeight) {
                dispatch(
                    updateNodeDimension({
                        id,
                        width: newWidth,
                        height: newHeight,
                    })
                );
            }
        };

        const onMouseUp = () => {
            const formData = new FormData();
            formData.append("nodeid", id);
            formData.append("height", newHeight);
            formData.append("width", newWidth);
            dispatch(resizeImageNode(formData));
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("mouseup", onMouseUp);
        };

        window.addEventListener("mousemove", onMouseMove);
        window.addEventListener("mouseup", onMouseUp);
    };

    const [contextMenu, setContentMenu] = useState({ visible: false, x: 0, y: 0, id: 0 });
    const handleChangeContent = (id, value) => {
        dispatch(editNodeText({id: id, value: value}));
    }
    const handleContentMenu = (e, id) => {
        e.preventDefault();
        handleSelectNodes(id, e);
        setContentMenu({
            visible: true,
            x: e.clientX,
            y: e.clientY,
            id: id
        });
    }
    const adjustScale = () => {
        const originalWidth = 1050;
        const originalHeight = 600;

        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;

        const parentWidth = editorWrapperRef.current.clientWidth || screenWidth;

        let scl = 1;

        if (screenWidth < 1600 || screenHeight < 782) {
          const scaleX = parentWidth / originalWidth;
          const scaleY = screenHeight / originalHeight;
          scl = Math.min(scaleX, scaleY);
        }

        scl = Math.min(scl, 1);
        setScale(scl);

    }
    useEffect(() => {
        window.addEventListener("mousedown", handleClickOutside);
        adjustScale();
        window.addEventListener('resize', adjustScale);
        return () => {
            window.removeEventListener("mousedown", handleClickOutside);
            window.removeEventListener('resize', adjustScale);
        }
    }, [])
    useEffect(() => {
        nodes.forEach((node) => {
            if (!resizeRefs.current[node.id]) {
                resizeRefs.current[node.id] = React.createRef();
            }
        })
    }, [nodes]);
    return (
        <div className={styles.editorWrapper} ref={editorWrapperRef}>
            <div className={`${styles.contextMenuWrapper} ${contextMenu.visible ? `${styles.show}` : ''}`} style={{ top: contextMenu.y, left: contextMenu.x }} ref={contextRef}>
                    <div className={styles.contextMenu}>
                        <button className={styles.contextBtn} onClick={() => {
                            // dispatch(duplicateLayerFront(contextMenu.id));
                            const formData = new FormData();
                            formData.append("nodeid", contextMenu.id);
                            formData.append("cardside", "front");
                            dispatch(duplicateLayer(formData));
                            setContentMenu({ visible: false });
                        }}>Duplicate Layer in Front</button>
                        <button className={styles.contextBtn} onClick={() => {
                            const formData = new FormData();
                            formData.append("nodeid", contextMenu.id);
                            formData.append("cardside", "back");
                            dispatch(duplicateLayer(formData));
                            dispatch(duplicateLayerBack(contextMenu.id));
                            setContentMenu({ visible: false });
                        }}>Duplicate Layer in Back</button>
                    </div>
                </div>
            <div>
            {
                cardside === 'front' ?
                <div className={styles.editorArea} id={styles.editorAreaFront} ref={parentRef} style={{ ...backgroundStyles('front', background?.front?.type, background), transform: `scale(${scale})`}}>
                    <span className={styles.bleedText}>Bleed Area</span>
                    <div className={styles.editorSafeArea}>
                        <span className={styles.safeAreaText}>Safe Area</span>
                        {/* <div className={`${styles.safeAreaGuide} ${styles.left}`}></div>
                        <div className={`${styles.safeAreaGuide} ${styles.top}`}></div>
                        <div className={`${styles.safeAreaGuide} ${styles.right}`}></div>
                        <div className={`${styles.safeAreaGuide} ${styles.bottom}`}></div> */}
                    </div>
                    <div className={`${styles.safeAreaGuideLine} ${styles.left}`} ref={leftGuideLineRef}></div>
                    <div className={`${styles.safeAreaGuideLine} ${styles.top}`} ref={topGuideLineRef}></div>
                    <div className={`${styles.safeAreaGuideLine} ${styles.right}`} ref={rightGuideLineRef}></div>
                    <div className={`${styles.safeAreaGuideLine} ${styles.bottom}`} ref={bottomGuideLineRef}></div>
                    <div className={`${styles.safeAreaGuideLine} ${styles.center}`} ref={centerLineRef}></div>
                    <div className={`${styles.safeAreaGuideLine} ${styles.middle}`} ref={middleLineRef}></div>
                    <Nodes nodes={nodes} cardside={cardside} styles={styles} selectedNodes={selectedNodes} resizeRefs={resizeRefs} handleSelectNodes={handleSelectNodes} handleMouseDrag={handleMouseDrag} startEditing={startEditing} stopEditing={stopEditing} handleContentMenu={handleContentMenu}/>
                </div>
                :
                <div className={styles.editorArea} id={styles.editorAreaBack} ref={parentRef} style={{ ...backgroundStyles('back', background?.back?.type, background), transform: `scale(${scale})`}}>
                    <span className={styles.bleedText}>Bleed Area</span>
                    <div className={styles.editorSafeArea}>
                        <span className={styles.safeAreaText}>Safe Area</span>
                        {/* <div className={`${styles.safeAreaGuide} ${styles.left}`}></div>
                        <div className={`${styles.safeAreaGuide} ${styles.top}`}></div>
                        <div className={`${styles.safeAreaGuide} ${styles.right}`}></div>
                        <div className={`${styles.safeAreaGuide} ${styles.bottom}`}></div> */}
                    </div>
                    <div className={`${styles.safeAreaGuideLine} ${styles.left}`} ref={leftGuideLineRef}></div>
                    <div className={`${styles.safeAreaGuideLine} ${styles.top}`} ref={topGuideLineRef}></div>
                    <div className={`${styles.safeAreaGuideLine} ${styles.right}`} ref={rightGuideLineRef}></div>
                    <div className={`${styles.safeAreaGuideLine} ${styles.bottom}`} ref={bottomGuideLineRef}></div>
                    <div className={`${styles.safeAreaGuideLine} ${styles.center}`} ref={centerLineRef}></div>
                    <div className={`${styles.safeAreaGuideLine} ${styles.middle}`} ref={middleLineRef}></div>
                    <Nodes nodes={nodes} cardside={cardside} styles={styles} selectedNodes={selectedNodes} resizeRefs={resizeRefs} handleSelectNodes={handleSelectNodes} handleMouseDrag={handleMouseDrag} startEditing={startEditing} stopEditing={stopEditing} handleContentMenu={handleContentMenu}/>
                </div>
            }
                <div className='d-flex justify-content-end'>
                    <div className={styles.switch}>
                        <span className={styles.switchText}>Front</span>
                        <span className={styles.switchContainer} onClick={() => cardsideToogler()}>
                            <span className={styles.switchContent}>
                                <span className={`${styles.switchBtn} ${cardside === 'back' ? `${styles.active}` : ""}`}></span>
                            </span>
                        </span>
                        <span className={styles.switchText}>Back</span>
                    </div>
                </div>
            </div>
            <StyleEditor show={editingDivId ? true : false} nodeid={editingDivId} editorRef={editorRef}/>
        </div>
    )
}

export default StudioEditor2;