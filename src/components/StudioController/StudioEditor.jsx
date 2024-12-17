import { useDispatch, useSelector } from 'react-redux';
import styles from './StudioEditor.module.css'
import React, { useEffect, useRef, useState } from 'react';
import { deleteNode, deleteNodeFromProject, duplicateLayerBack, duplicateLayerFront, editNodeText, resizeImageNode, updateNodeDimension, updateNodePositions, updateNodeWidth } from '../../utils/nodeSclice';
import StyleEditor from './StyleEditor';
import { addEditingnodeId, removeEditingnodeId } from '../../utils/selectedNodeSlice';
import placeholderImage from '../../assets/images/placeholder-image.jpg'
import { baseurl } from '../../config/apiUrl';

const StudioEditor = ({ cardside, cardsideToogler }) => {
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
                    background: bg?.front?.bgimage_url ? `url(http://localhost:52495${bg?.front?.bgimage_url}?v=${Date.now()}) no-repeat 100% 100%` : undefined
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
                    background: bg?.back?.bgimage_url ? `url(http://localhost:52495${bg?.back?.bgimage_url}?v=${Date.now()}) no-repeat 100% 100%` : undefined
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

                return { id: node.id, newX, newY };
            })
            dispatch(updateNodePositions({ updates }));
        };
    
        const onMouseUp = () => {
            leftGuideLineRef.current.style.opacity = 0;
            topGuideLineRef.current.style.opacity = 0;
            rightGuideLineRef.current.style.opacity = 0;
            bottomGuideLineRef.current.style.opacity = 0;
            centerLineRef.current.style.opacity = 0;
            middleLineRef.current.style.opacity = 0;
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

                return { id: node.id, newX, newY };
            })
            console.log(updates);
            dispatch(updateNodePositions({ updates }));
        };
    
        const onMouseUp = () => {
            leftGuideLineRef.current.style.opacity = 0;
            topGuideLineRef.current.style.opacity = 0;
            rightGuideLineRef.current.style.opacity = 0;
            bottomGuideLineRef.current.style.opacity = 0;
            centerLineRef.current.style.opacity = 0;
            middleLineRef.current.style.opacity = 0;      
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

                return { id: node.id, newX, newY };
            })
            dispatch(updateNodePositions({ updates }));
        };
    
        const onMouseUp = () => {
            leftGuideLineRef.current.style.opacity = 0;
            topGuideLineRef.current.style.opacity = 0;
            rightGuideLineRef.current.style.opacity = 0;
            bottomGuideLineRef.current.style.opacity = 0;
            centerLineRef.current.style.opacity = 0;
            middleLineRef.current.style.opacity = 0;      
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
    const handleDeleteNode = (id) => {
        dispatch(deleteNode(id));
        setEditingDivId(null);
    }

    const handleResizeRight = (e, id) => {
        e.preventDefault();
        const startX = e.clientX;
        const nodeToResize = nodes.find((node) => node.id === id);
    
        const initialWidth = nodeToResize.width;
        const initialX = nodeToResize.x;
        const parentWidth = 1050;
    
        const onMouseMove = (moveEvent) => {
            const deltaX = moveEvent.clientX - startX;
            const newWidth = initialWidth + deltaX;
            const maxWidth = parentWidth - initialX;
            if (newWidth > 0 && newWidth <= maxWidth) {
                dispatch(updateNodeWidth({ id, width: newWidth }));
            }
        };
    
        const onMouseUp = () => {
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
                            dispatch(duplicateLayerFront(contextMenu.id));
                            setContentMenu({ visible: false });
                        }}>Duplicate Layer in Front</button>
                        <button className={styles.contextBtn} onClick={() => {
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
                        <div className={`${styles.safeAreaGuide} ${styles.left}`}></div>
                        <div className={`${styles.safeAreaGuide} ${styles.top}`}></div>
                        <div className={`${styles.safeAreaGuide} ${styles.right}`}></div>
                        <div className={`${styles.safeAreaGuide} ${styles.bottom}`}></div>
                    </div>
                    <div className={`${styles.safeAreaGuideLine} ${styles.left}`} ref={leftGuideLineRef}></div>
                    <div className={`${styles.safeAreaGuideLine} ${styles.top}`} ref={topGuideLineRef}></div>
                    <div className={`${styles.safeAreaGuideLine} ${styles.right}`} ref={rightGuideLineRef}></div>
                    <div className={`${styles.safeAreaGuideLine} ${styles.bottom}`} ref={bottomGuideLineRef}></div>
                    <div className={`${styles.safeAreaGuideLine} ${styles.center}`} ref={centerLineRef}></div>
                    <div className={`${styles.safeAreaGuideLine} ${styles.middle}`} ref={middleLineRef}></div>
                    {
                        nodes.map((item, index) => {
                            if (item.cardside === 'front') {
                                if (item.nodetype === 'text') {
                                    return (
                                        <div className={`${styles.node} ${selectedNodes.includes(item.id) ? `${styles.selected}` : ''}`} style={{ width: `${item.width}px`, minHeight: `${item.height}px`, top: `${item.y}px`, left: `${item.x}px`, zIndex: item.styles.zindex }} key={index} id={item.id} data-node={item.nodetype} onClick={(event) => handleSelectNodes(item.id, event)} onMouseDown={(e) => handleMouseDrag(e)} onDoubleClick={(e) => startEditing(item.id)} onBlur={() => stopEditing()}
                                        onContextMenu={(e) => handleContentMenu(e, item.id)}
                                        >
                                            <span className={`${styles.corners} ${styles.top} ${styles.left}`}></span>
                                            <span className={`${styles.corners} ${styles.top} ${styles.right}`}></span>
                                            <span className={`${styles.corners} ${styles.bottom} ${styles.left}`}></span>
                                            <span className={`${styles.corners} ${styles.bottom} ${styles.right}`}></span>
                                            {/* <span className={`${styles.resizer} ${styles.left}`}></span> */}
                                            <span className={`${styles.resizer} ${styles.right}`} onMouseDown={(e) => handleResizeRight(e, item.id)} ref={resizeRefs.current[item.id]}></span>
                                            <span className={`${styles.textContentEditor} ${editingDivId === item.id ? `${styles.show}` : ""}`}>
                                                <input className={styles.textContentInput} value={item.text} onChange={(e) => handleChangeContent(item.id, e.target.value)}/>
                                            </span>
                                            <div className={styles.nodeText} style={{ width: '100%', whiteSpace: 'normal', wordWrap: 'break-word', overflowWrap: 'break-word', color: item.styles.color, fontFamily: `${item.styles.ffamily}, sans-serif`, fontSize: item.styles.fsize, fontWeight: item.styles.fweight, lineHeight: `${item.styles.lheight}px`, letterSpacing: item.styles.lspacing, fontStyle: item.styles.fstyle, textDecoration: item.styles.tdecoration, textAlign: item.styles.talign }} dangerouslySetInnerHTML={{ __html: item.text }}></div>
                                            <button className={styles.nodeDelte} aria-label='node delete' onClick={() => handleDeleteNode(item.id)}>
                                                <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="none" viewBox="0 0 24 24">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"/>
                                                </svg>
                                            </button>
                                        </div>
                                    )
                                } else if (item.nodetype === 'image') {
                                    return (
                                        <div className={`${styles.node} ${styles.nodeImage} ${selectedNodes.includes(item.id) ? `${styles.selected}` : ''}`}
                                        style={{ width: `${item.width}px`, height: `${item.height}px`, top: `${item.y}px`, left: `${item.x}px` }}
                                        key={index} id={item.id} data-node={item.nodetype}
                                        onClick={(event) => handleSelectNodes(item.id, event)}
                                        onMouseDown={(e) => handleMouseDragImage(e)}
                                        onDoubleClick={() => startEditing(item.id)} onBlur={() => stopEditing()}
                                        onContextMenu={(e) => handleContentMenu(e, item.id)}
                                        >
                                            <span className={`${styles.corners} ${styles.top} ${styles.left}`}></span>
                                            <span className={`${styles.corners} ${styles.top} ${styles.right}`}></span>
                                            <span className={`${styles.corners} ${styles.bottom} ${styles.left}`}></span>
                                            <span className={`${styles.corners} ${styles.bottom} ${styles.right} ${styles.imageResizer}`} onMouseDown={(e) => handleResizeImage(e, item.id)} ref={resizeRefs.current[item.id]}></span>
                                            <div alt="node image" style={{ width: "100%", height: "100%", borderRadius: `${item.styles.bradius}%`, borderWidth: `${item.styles.bwidth}px`, borderStyle: item.styles.bstyle, borderColor: item.styles.bcolor, cursor: 'grab', backgroundImage: `url(${baseurl}${item.image})`, backgroundRepeat: 'no-repeat', backgroundSize: item.styles.ofit }}></div>
                                            <button className={styles.nodeDelte} aria-label='node delete' onClick={() => {
                                                dispatch(deleteNode(item.id));
                                                dispatch(deleteNodeFromProject(item.id));
                                            }}>
                                                <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="none" viewBox="0 0 24 24">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"/>
                                                </svg>
                                            </button>
                                        </div>
                                    )
                                } else if (item.nodetype === "shape" && item.shapetype === 'square' || item.shapetype === 'rectangle' || item.shapetype === 'circle') {
                                    return (
                                        <div className={`${styles.node} ${styles.nodeShape} ${selectedNodes.includes(item.id) ? `${styles.selected}` : ''}`}
                                        style={{ top: `${item.y}px`, left: `${item.x}px` }}
                                        key={index} id={item.id} data-node={item.nodetype}
                                        onClick={(event) => handleSelectNodes(item.id, event)}
                                        onMouseDown={(e) => handleMouseDragImage(e)}
                                        onDoubleClick={() => startEditing(item.id)} onBlur={() => stopEditing()}
                                        onContextMenu={(e) => handleContentMenu(e, item.id)}
                                        >
                                            <span className={`${styles.corners} ${styles.top} ${styles.left}`}></span>
                                            <span className={`${styles.corners} ${styles.top} ${styles.right}`}></span>
                                            <span className={`${styles.corners} ${styles.bottom} ${styles.left}`}></span>
                                            <span className={`${styles.corners} ${styles.bottom} ${styles.right} ${styles.imageResizer}`} onMouseDown={(e) => handleResizeImage(e, item.id)} ref={resizeRefs.current[item.id]}></span>
                                            <div style={{ width: `${item.width}px`, height: `${item.height}px`, top: `${item.y}px`, left: `${item.x}px`, backgroundColor: `${item.styles.bgcolor}`, borderRadius: `${item.shapetype !== 'circle' ? `${item.styles.bradius}px` : `${item.styles.bradius}%`}`, borderWidth: `${item.styles.bwidth}px`, borderStyle: item.styles.bstyle, borderColor: item.styles.bcolor, opacity: `${item.styles.opacity}%` }}></div>
                                            <button className={styles.nodeDelte} aria-label='node delete' onClick={() => dispatch(deleteNode(item.id))}>
                                                <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="none" viewBox="0 0 24 24">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"/>
                                                </svg>
                                            </button>
                                        </div>
                                    )
                                } else if (item.nodetype === "magictext" && item.type === "logo-text") {
                                    return (
                                        <div className={`${styles.node} ${styles.nodeShape} ${selectedNodes.includes(item.id) ? `${styles.selected}` : ''}`}
                                        key={index} id={item.id} data-node={item.nodetype}
                                        style={{ top: `${item.y}px`, left: `${item.x}px` }}
                                        onClick={(event) => handleSelectNodes(item.id, event)}
                                        onMouseDown={(e) => handleMouseDragMagicText(e)}
                                        onDoubleClick={() => startEditing(item.id)} onBlur={() => stopEditing()}
                                        onContextMenu={(e) => handleContentMenu(e, item.id)}
                                        >
                                            <span className={`${styles.corners} ${styles.top} ${styles.left}`}></span>
                                            <span className={`${styles.corners} ${styles.top} ${styles.right}`}></span>
                                            <span className={`${styles.corners} ${styles.bottom} ${styles.left}`}></span>
                                            <span className={`${styles.corners} ${styles.bottom} ${styles.right}`}></span>
                                            <div style={{ display: "flex", flexDirection: `${item.textposition === "bottom-center" ? "column" : "column-reverse"}`, alignItems: 'center', justifyContent: 'center', gap: "10px" }}>
                                                <div style={{ backgroundImage: `url(${item.image ? item.image : placeholderImage})`, backgroundRepeat: "no-repeat", backgroundSize: "100% 100%", width: `${item.width}px`, height: `${item.height}px`, position: "relative" }}>
                                                    <span className={`${styles.corners} ${styles.bottom} ${styles.right} ${styles.imageResizer}`} ref={resizeRefs.current[item.id]} onMouseDown={(e) => handleResizeImage(e, item.id)}></span>
                                                </div>
                                                <span style={{ fontSize: `${item.styles.fsize}px`, fontFamily: `${item.styles.ffamily}, sans-serif`, fontWeight: item.styles.fweight, lineHeight: `${item.styles.lheight}px`, color: item.styles.color, letterSpacing: `${item.styles.lspacing}px`, fontStyle: item.styles.fstyle, textDecoration: item.styles.tdecoration, marginTop: `${item.styles.mtop}px`, position: "relative" }}>{item.text}</span>
                                            </div>
                                            <button className={styles.nodeDelte} aria-label='node delete' onClick={() => dispatch(deleteNode(item.id))}>
                                                <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="none" viewBox="0 0 24 24">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"/>
                                                </svg>
                                            </button>
                                        </div>
                                    )
                                } else if (item.nodetype === "magictext" && item.type === "icon-text") {
                                    return (
                                        <div className={`${styles.node} ${selectedNodes.includes(item.id) ? `${styles.selected}` : ''}`}
                                        key={index} id={item.id} data-node={item.nodetype}
                                        style={{ top: `${item.y}px`, left: `${item.x}px`, width: `${item.width}px`, minHeight: `${item.height}px`, minWidth: '140px' }}
                                        onClick={(event) => handleSelectNodes(item.id, event)}
                                        onMouseDown={(e) => handleMouseDrag(e)}
                                        onDoubleClick={() => startEditing(item.id)} onBlur={() => stopEditing()}
                                        onContextMenu={(e) => handleContentMenu(e, item.id)}
                                        >
                                            <span className={`${styles.corners} ${styles.top} ${styles.left}`}></span>
                                            <span className={`${styles.corners} ${styles.top} ${styles.right}`}></span>
                                            <span className={`${styles.corners} ${styles.bottom} ${styles.left}`}></span>
                                            <span className={`${styles.corners} ${styles.bottom} ${styles.right}`}></span>
                                            <span className={`${styles.resizer} ${styles.right}`} onMouseDown={(e) => handleResizeRight(e, item.id)} ref={resizeRefs.current[item.id]}></span>
                                            <span className={`${styles.textContentEditor} ${editingDivId === item.id ? `${styles.show}` : ""}`}>
                                                <input className={styles.textContentInput} value={item.text} onChange={(e) => handleChangeContent(item.id, e.target.value)}/>
                                            </span>
                                            <div style={{ display: 'flex', alignItems: `${item.textposition === 'right-center' ? 'center' : ''}`}}>
                                                <i style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: `${item.icon.width}px`, height: `${item.icon.height}px` }} dangerouslySetInnerHTML={{ __html: item.icon.svg }}></i>
                                                <div style={{ flex: '1', paddingLeft: "10px", fontSize: `${item.styles.fsize}px`, fontFamily: `${item.styles.ffamily}, sans-serif`, fontWeight: item.styles.fweight, lineHeight: `${item.styles.lheight}px`, color: item.styles.color, letterSpacing: `${item.styles.lspacing}px`, fontStyle: item.styles.fstyle, textDecoration: item.styles.tdecoration, userSelect: "none" }}>
                                                    {item.text}
                                                </div>
                                            </div>
                                            <button className={styles.nodeDelte} aria-label='node delete' onClick={() => dispatch(deleteNode(item.id))}>
                                                <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="none" viewBox="0 0 24 24">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"/>
                                                </svg>
                                            </button>
                                        </div>
                                    )
                                }
                            }
                        })
                    }
                </div>
                :
                <div className={styles.editorArea} id={styles.editorAreaBack} ref={parentRef} style={{ ...backgroundStyles('back', background?.back?.type, background), transform: `scale(${scale})`}}>
                    <span className={styles.bleedText}>Bleed Area</span>
                    <div className={styles.editorSafeArea}>
                        <span className={styles.safeAreaText}>Safe Area</span>
                        <div className={`${styles.safeAreaGuide} ${styles.left}`}></div>
                        <div className={`${styles.safeAreaGuide} ${styles.top}`}></div>
                        <div className={`${styles.safeAreaGuide} ${styles.right}`}></div>
                        <div className={`${styles.safeAreaGuide} ${styles.bottom}`}></div>
                    </div>
                    <div className={`${styles.safeAreaGuideLine} ${styles.left}`} ref={leftGuideLineRef}></div>
                    <div className={`${styles.safeAreaGuideLine} ${styles.top}`} ref={topGuideLineRef}></div>
                    <div className={`${styles.safeAreaGuideLine} ${styles.right}`} ref={rightGuideLineRef}></div>
                    <div className={`${styles.safeAreaGuideLine} ${styles.bottom}`} ref={bottomGuideLineRef}></div>
                    <div className={`${styles.safeAreaGuideLine} ${styles.center}`} ref={centerLineRef}></div>
                    <div className={`${styles.safeAreaGuideLine} ${styles.middle}`} ref={middleLineRef}></div>
                    {
                        nodes.map((item, index) => {
                            if (item.cardside === 'back') {
                                if (item.nodetype === 'text') {
                                    return (
                                        <div className={`${styles.node} ${selectedNodes.includes(item.id) ? `${styles.selected}` : ''}`} style={{ width: `${item.width}px`, minHeight: `${item.height}px`, top: `${item.y}px`, left: `${item.x}px` }} key={index} id={item.id} data-node={item.nodetype} onClick={(event) => handleSelectNodes(item.id, event)} onMouseDown={(e) => handleMouseDrag(e)} onDoubleClick={() => startEditing(item.id)}onBlur={() => stopEditing(item.id)} onContextMenu={(e) => handleContentMenu(e, item.id)}>
                                            <span className={`${styles.corners} ${styles.top} ${styles.left}`}></span>
                                            <span className={`${styles.corners} ${styles.top} ${styles.right}`}></span>
                                            <span className={`${styles.corners} ${styles.bottom} ${styles.left}`}></span>
                                            <span className={`${styles.corners} ${styles.bottom} ${styles.right}`}></span>
                                            {/* <span className={`${styles.resizer} ${styles.left}`}></span> */}
                                            <span className={`${styles.resizer} ${styles.right}`} onMouseDown={(e) => handleResizeRight(e, item.id)} ref={resizeRefs.current[item.id]}></span>
                                            {
                                                editingDivId === item.id &&
                                                <span className={styles.textContentEditor}>
                                                    <input className={styles.textContentInput} value={item.text} onChange={(e) => handleChangeContent(item.id, e.target.value)}/>
                                                </span>
                                            }
                                            <div className={styles.nodeText} style={{ width: '100%', whiteSpace: 'normal', wordWrap: 'break-word', overflowWrap: 'break-word', color: item.styles.color, fontFamily: `${item.styles.ffamily}, sans-serif`, fontSize: item.styles.fsize, fontWeight: item.styles.fweight, lineHeight: `${item.styles.lheight}px`, letterSpacing: item.styles.lspacing, fontStyle: item.styles.fstyle, textDecoration: item.styles.tdecoration, textAlign: item.styles.talign }} dangerouslySetInnerHTML={{ __html: item.text }}></div>
                                            <button className={styles.nodeDelte} aria-label='node delete' onClick={() => handleDeleteNode(item.id)}>
                                                <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="none" viewBox="0 0 24 24">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"/>
                                                </svg>
                                            </button>
                                        </div>
                                    )
                                } else if (item.nodetype === 'image') {
                                    return (
                                        <div className={`${styles.node} ${styles.nodeImage} ${selectedNodes.includes(item.id) ? `${styles.selected}` : ''}`}
                                        style={{ width: `${item.width}px`, height: `${item.height}px`, top: `${item.y}px`, left: `${item.x}px` }}
                                        key={index} id={item.id} data-node={item.nodetype}
                                        onClick={(event) => handleSelectNodes(item.id, event)}
                                        onMouseDown={(e) => handleMouseDragImage(e)}
                                        onDoubleClick={() => startEditing(item.id)} onBlur={() => stopEditing()}
                                        onContextMenu={(e) => handleContentMenu(e, item.id)}
                                        >
                                            <span className={`${styles.corners} ${styles.top} ${styles.left}`}></span>
                                            <span className={`${styles.corners} ${styles.top} ${styles.right}`}></span>
                                            <span className={`${styles.corners} ${styles.bottom} ${styles.left}`}></span>
                                            <span className={`${styles.corners} ${styles.bottom} ${styles.right} ${styles.imageResizer}`} onMouseDown={(e) => handleResizeImage(e, item.id)} ref={resizeRefs.current[item.id]}></span>
                                            <div alt="node image" style={{ width: "100%", height: "100%", borderRadius: `${item.styles.bradius}%`, borderWidth: `${item.styles.bwidth}px`, borderStyle: item.styles.bstyle, borderColor: item.styles.bcolor, cursor: 'grab', backgroundImage: `url(${baseurl}${item.image})`, backgroundRepeat: 'no-repeat', backgroundSize: item.styles.ofit }}></div>
                                            <button className={styles.nodeDelte} aria-label='node delete' onClick={() => dispatch(deleteNode(item.id))}>
                                                <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="none" viewBox="0 0 24 24">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"/>
                                                </svg>
                                            </button>
                                        </div>
                                    )
                                } else if (item.nodetype === "shape" && item.shapetype === 'square' || item.shapetype === 'rectangle') {
                                    return (
                                        <div className={`${styles.node} ${styles.nodeShape} ${selectedNodes.includes(item.id) ? `${styles.selected}` : ''}`}
                                        style={{ width: `${item.width}px`, height: `${item.height}px`, top: `${item.y}px`, left: `${item.x}px`, backgroundColor: `${item.styles.bgcolor}`, borderRadius: `${item.styles.bradius}px`, borderWidth: `${item.styles.bwidth}px`, borderStyle: item.styles.bstyle, borderColor: item.styles.bcolor, opacity: item.styles.opacity }}
                                        key={index} id={item.id} data-node={item.nodetype}
                                        onClick={(event) => handleSelectNodes(item.id, event)}
                                        onMouseDown={(e) => handleMouseDragImage(e)}
                                        onDoubleClick={() => startEditing(item.id)} onBlur={() => stopEditing()}
                                        onContextMenu={(e) => handleContentMenu(e, item.id)}
                                        >
                                            <span className={`${styles.corners} ${styles.top} ${styles.left}`}></span>
                                            <span className={`${styles.corners} ${styles.top} ${styles.right}`}></span>
                                            <span className={`${styles.corners} ${styles.bottom} ${styles.left}`}></span>
                                            <span className={`${styles.corners} ${styles.bottom} ${styles.right} ${styles.imageResizer}`} onMouseDown={(e) => handleResizeImage(e, item.id)} ref={resizeRefs.current[item.id]}></span>
                                            <button className={styles.nodeDelte} aria-label='node delete' onClick={() => dispatch(deleteNode(item.id))}>
                                                <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="none" viewBox="0 0 24 24">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"/>
                                                </svg>
                                            </button>
                                        </div>
                                    )
                                } else if (item.nodetype === "magictext" && item.type === "logo-text") {
                                    return (
                                        <div className={`${styles.node} ${styles.nodeShape} ${selectedNodes.includes(item.id) ? `${styles.selected}` : ''}`}
                                        key={index} id={item.id} data-node={item.nodetype}
                                        style={{ top: `${item.y}px`, left: `${item.x}px` }}
                                        onClick={(event) => handleSelectNodes(item.id, event)}
                                        onMouseDown={(e) => handleMouseDragMagicText(e)}
                                        onDoubleClick={() => startEditing(item.id)} onBlur={() => stopEditing()}
                                        onContextMenu={(e) => handleContentMenu(e, item.id)}
                                        >
                                            <span className={`${styles.corners} ${styles.top} ${styles.left}`}></span>
                                            <span className={`${styles.corners} ${styles.top} ${styles.right}`}></span>
                                            <span className={`${styles.corners} ${styles.bottom} ${styles.left}`}></span>
                                            <span className={`${styles.corners} ${styles.bottom} ${styles.right}`}></span>
                                            <div style={{ display: "flex", flexDirection: `${item.textposition === "bottom-center" ? "column" : "column-reverse"}`, alignItems: 'center', justifyContent: 'center', gap: "10px" }}>
                                                <div style={{ backgroundImage: `url(${item.image ? item.image : placeholderImage})`, backgroundRepeat: "no-repeat", backgroundSize: "100% 100%", width: `${item.width}px`, height: `${item.height}px`, position: "relative" }}>
                                                    <span className={`${styles.corners} ${styles.bottom} ${styles.right} ${styles.imageResizer}`} ref={resizeRefs.current[item.id]} onMouseDown={(e) => handleResizeImage(e, item.id)}></span>
                                                </div>
                                                <span style={{ fontSize: `${item.styles.fsize}px`, fontFamily: `${item.styles.ffamily}, sans-serif`, fontWeight: item.styles.fweight, lineHeight: `${item.styles.lheight}px`, color: item.styles.color, letterSpacing: `${item.styles.lspacing}px`, fontStyle: item.styles.fstyle, textDecoration: item.styles.tdecoration, marginTop: `${item.styles.mtop}px`, position: "relative" }}>{item.text}</span>
                                            </div>
                                            <button className={styles.nodeDelte} aria-label='node delete' onClick={() => dispatch(deleteNode(item.id))}>
                                                <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="none" viewBox="0 0 24 24">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"/>
                                                </svg>
                                            </button>
                                        </div>
                                    )
                                } else if (item.nodetype === "magictext" && item.type === "icon-text") {
                                    return (
                                        <div className={`${styles.node} ${selectedNodes.includes(item.id) ? `${styles.selected}` : ''}`}
                                        key={index} id={item.id} data-node={item.nodetype}
                                        style={{ top: `${item.y}px`, left: `${item.x}px`, width: `${item.width}px`, minHeight: `${item.height}px`, minWidth: '140px' }}
                                        onClick={(event) => handleSelectNodes(item.id, event)}
                                        onMouseDown={(e) => handleMouseDrag(e)}
                                        onDoubleClick={() => startEditing(item.id)} onBlur={() => stopEditing()}
                                        onContextMenu={(e) => handleContentMenu(e, item.id)}
                                        >
                                            <span className={`${styles.corners} ${styles.top} ${styles.left}`}></span>
                                            <span className={`${styles.corners} ${styles.top} ${styles.right}`}></span>
                                            <span className={`${styles.corners} ${styles.bottom} ${styles.left}`}></span>
                                            <span className={`${styles.corners} ${styles.bottom} ${styles.right}`}></span>
                                            <span className={`${styles.resizer} ${styles.right}`} onMouseDown={(e) => handleResizeRight(e, item.id)} ref={resizeRefs.current[item.id]}></span>
                                            <span className={`${styles.textContentEditor} ${editingDivId === item.id ? `${styles.show}` : ""}`}>
                                                <input className={styles.textContentInput} value={item.text} onChange={(e) => handleChangeContent(item.id, e.target.value)}/>
                                            </span>
                                            <div style={{ display: 'flex', alignItems: `${item.textposition === 'right-center' ? 'center' : ''}`}}>
                                                <i style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: `${item.icon.width}px`, height: `${item.icon.height}px` }} dangerouslySetInnerHTML={{ __html: item.icon.svg }}></i>
                                                <div style={{ flex: '1', paddingLeft: "10px", fontSize: `${item.styles.fsize}px`, fontFamily: `${item.styles.ffamily}, sans-serif`, fontWeight: item.styles.fweight, lineHeight: `${item.styles.lheight}px`, color: item.styles.color, letterSpacing: `${item.styles.lspacing}px`, fontStyle: item.styles.fstyle, textDecoration: item.styles.tdecoration, userSelect: "none" }}>
                                                    {item.text}
                                                </div>
                                            </div>
                                            <button className={styles.nodeDelte} aria-label='node delete' onClick={() => dispatch(deleteNode(item.id))}>
                                                <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="none" viewBox="0 0 24 24">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"/>
                                                </svg>
                                            </button>
                                        </div>
                                    )
                                }
                            }
                        })
                    }
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

export default StudioEditor;