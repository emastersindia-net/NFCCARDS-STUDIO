import { useEffect, useState } from 'react';
import style from './StyleEditor.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { changeBackgroundColor, changeBackgroundcolorofShape, changeBorderRadius, changeColor, changeFontFamily, changeFontFamilyToProject, changeFontsize, changeFontStyle, changeFontWeight, changeLetterSpacing, changeObjectFit, changeOpacity, changeTextAlign, changeTextAlignToProject, changeTextColor, changeTextDecoration, decreaseBorderRadius, decreaseBorderRadiusofShapes, decreaseFontSize, decreaseletterSpacing, decreaseOpacityofShape, increaseBorderRadius, increaseBorderRadiusofShapes, increaseFontsize, increaseletterSpacing, increaseOpacityofShape, makeNameClose, makeNameFar, toogleBold, toogleItalic, toogleTextDecoration, updateObjectFit } from '../../utils/nodeSclice';

const fontFamilies = [
    {
        title: "Open Sans",
        ffamily: "Open Sans"
    },
    {
        title: "Inter",
        ffamily: "Inter"
    },
    {
        title: "Poppins",
        ffamily: "Poppins"
    },
    {
        title: "Roboto",
        ffamily: "Roboto"
    },
    {
        title: "Didact Gothic",
        ffamily: "Didact Gothic"
    },
    {
        title: "Source Code (Pro)",
        ffamily: "Source Code Pro"
    },
    {
        title: "Sour Gummy",
        ffamily: "Sour Gummy"
    },
    {
        title: "Italianno",
        ffamily: "Italianno"
    },
];
const objectFits = [
    {
        title: "Cover",
        value: "cover"
    },
    {
        title: "Contain",
        value: "contain"
    }
];

const StyleEditor = ({ show = false, nodeid, editorRef }) => {
    const node = useSelector((state) => state.node.data.find(item => item.id === nodeid));
    const nodeStyles = node?.styles || null;
    const dispatch = useDispatch();
    const handleIncreaseFontSize = () => {
        dispatch(increaseFontsize(nodeid));
    }
    const handleDecreaseFontSize = () => {
        dispatch(decreaseFontSize(nodeid));
    }
    const handleChangeColor = (value, element) => {
        dispatch(changeColor({ id: nodeid, color: value }));
        const formdata = new FormData();
        formdata.append("nodeid", nodeid);
        formdata.append("color", value);
        dispatch(changeTextColor(formdata));
        element.value = null;
    }
    const handleShapeColor = (value, element) => {
        dispatch(changeBackgroundcolorofShape({ id: nodeid, value: value }));
        const formdata = new FormData();
        formdata.append("nodeid", nodeid);
        formdata.append("bgcolor", value);
        dispatch(changeBackgroundColor(formdata));
        element.value = null;
    }
    const handleToogleBold = () => {
        dispatch(toogleBold(nodeid));
        const formdata = new FormData();
        formdata.append("nodeid", nodeid);
        if (nodeStyles.fweight === 400) {
            formdata.append("fweight", 700);
            dispatch(changeFontWeight(formdata));
        } else {
            formdata.append("fweight", 400);
            dispatch(changeFontWeight(formdata));
        }
    }
    const handleToogleItalic = () => {
        dispatch(toogleItalic(nodeid));
        const formData = new FormData();
        formData.append("nodeid", nodeid);
        if (nodeStyles.fstyle === 'italic') {
            formData.append("fstyle", 'normal');
            dispatch(changeFontStyle(formData));
        } else {
            formData.append("fstyle", 'italic');
            dispatch(changeFontStyle(formData));
        }
    }
    const handleToogleDecoration = () => {
        dispatch(toogleTextDecoration(nodeid));
        const formData = new FormData();
        formData.append("nodeid", nodeid);
        if (nodeStyles.tdecoration === 'underline') {
            formData.append("tdecoration", "none");
            dispatch(changeTextDecoration(formData));
        } else {
            formData.append("tdecoration", "underline");
            dispatch(changeTextDecoration(formData));
        }
    }
    const handleChangeTextAlign = (value) => {
        dispatch(changeTextAlign({ id: nodeid, value: value }));
        const formData = new FormData();
        formData.append("nodeid", nodeid);
        formData.append("talign", value);
        dispatch(changeTextAlignToProject(formData));
    }
    const handleIncreaseLetterSpacing = () => {
        dispatch(increaseletterSpacing(nodeid));
    }
    const handleDecreaseLetterSpacing = () => {
        dispatch(decreaseletterSpacing(nodeid));
    }
    const [selectedFont, setSelectedFont] = useState('Open Sans');
    const [selectedObjectFit, setSelectedObjectFit] = useState("cover");
    const handleChangeFont = (value) => {
        setSelectedFont(value);
        dispatch(changeFontFamily({ id: nodeid, value: value }));
        const formdata = new FormData();
        formdata.append("nodeid", nodeid);
        formdata.append("ffamily", value);
        dispatch(changeFontFamilyToProject(formdata));
        setShowdrp(false);
    }
    const handleChangeObjectFit = (value) => {
        setSelectedObjectFit(value);
        dispatch(updateObjectFit({ id: nodeid, value: value }));
        const formData = new FormData();
        formData.append("nodeid", nodeid);
        formData.append("ofit", value);
        dispatch(changeObjectFit(formData));
        setShowdrp(false);
    }
    const [query, setQuery] = useState("");

    const [showDrp, setShowdrp] = useState(false);

    useEffect(() => {
        if (nodeStyles?.ffamily) {
            setSelectedFont(nodeStyles.ffamily);
        }
        if (nodeStyles?.ofit) {
            setSelectedObjectFit(nodeStyles.ofit);
        }
    }, [nodeStyles?.ffamily, nodeStyles?.ofit])
    return (
        <>
        {
            show &&
            <>
            {
                (node?.nodetype === 'text' || node?.nodetype === 'magictext') &&
                <div className={style.styleEditorWrapper} ref={editorRef}>
                    <div className='d-flex align-items-center gap-1'>
                        <div className={style.selectorContainer}>
                            <span className={style.selectorText} onClick={() => setShowdrp(!showDrp)}>
                                {selectedFont}
                                <i>
                                    <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m10.5785 19 4.2979-10.92966c.0369-.09379.1674-.09379.2042 0L19.3785 19m-8.8 0H9.47851m1.09999 0h1.65m7.15 0h-1.65m1.65 0h1.1m-7.7-3.9846h4.4M3 16l1.56685-3.9846m0 0 2.73102-6.94506c.03688-.09379.16738-.09379.20426 0l2.50367 6.94506H4.56685Z"/>
                                    </svg>
                                </i>
                            </span>
                            <div className={`${style.selectorDropdown} ${showDrp ? `${style.show}` : ''}`}>
                                <input className={style.selectorSearch} value={query} onChange={(e) => setQuery(e.target.value)}/>
                                <ul className={style.dropdownList}>
                                {
                                    fontFamilies.map((font, index) => {
                                        return (
                                            <li key={index} style={{ fontFamily: `${font.ffamily}, sans-serif` }} data-selected={selectedFont === font.title} onClick={() => handleChangeFont(font.ffamily)}>{font.title}</li>
                                        )
                                    })
                                }
                                </ul>
                            </div>
                        </div>
                        <div className={style.fonsizeEditor}>
                            <button className={style.fsizeBtn} onClick={() => {
                                handleDecreaseFontSize();
                                const fordata = new FormData();
                                fordata.append("nodeid", nodeStyles.nodeid);
                                fordata.append("fsize", nodeStyles.fsize - 1);
                                dispatch(changeFontsize(fordata));
                            }}>-</button>
                            <span className={style.fontsizeText}>{nodeStyles?.fsize}px</span>
                            <button className={style.fsizeBtn} onClick={() => {
                                handleIncreaseFontSize();
                                const fordata = new FormData();
                                fordata.append("nodeid", nodeStyles.nodeid);
                                fordata.append("fsize", nodeStyles.fsize + 1);
                                dispatch(changeFontsize(fordata));
                            }}>+</button>
                        </div>
                        <span className={style.fontsizeText}>Letter Spacing</span>
                        <div className={style.fonsizeEditor}>
                            <button className={style.fsizeBtn} onClick={() => {
                                handleDecreaseLetterSpacing();
                                const formdata = new FormData();
                                formdata.append("nodeid", nodeStyles.nodeid);
                                formdata.append("lspacing", nodeStyles.lspacing - 1);
                                dispatch(changeLetterSpacing(formdata));
                            }}>-</button>
                            <span className={style.fontsizeText}>{nodeStyles?.lspacing}px</span>
                            <button className={style.fsizeBtn} onClick={() => {
                                handleIncreaseLetterSpacing();
                                const formdata = new FormData();
                                formdata.append("nodeid", nodeStyles.nodeid);
                                formdata.append("lspacing", nodeStyles.lspacing + 1);
                                dispatch(changeLetterSpacing(formdata));
                            }}>+</button>
                        </div>
                        <div className={style.fontColor}>
                            <input type='color' value={nodeStyles && nodeStyles.color} onChange={(e) => handleChangeColor(e.target.value, e.target)}/>
                        </div>
                        <div className={style.fontStyles}>
                            <button aria-label='bold btn' className={`${style.fontstyleBtn} ${nodeStyles?.fweight === 700 ? `${style    .active}` : ""}`} onClick={() => handleToogleBold()}>
                                <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5h4.5a3.5 3.5 0 1 1 0 7H8m0-7v7m0-7H6m2 7h6.5a3.5 3.5 0 1 1 0 7H8m0-7v7m0 0H6"/>
                                </svg>
                            </button>
                            <button aria-label='italic btn' className={`${style.fontstyleBtn} ${nodeStyles?.fstyle === 'italic' ? `${style.active}` : ""}`} onClick={() => handleToogleItalic()}>
                                <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m8.874 19 6.143-14M6 19h6.33m-.66-14H18"/>
                                </svg>
                            </button>
                            <button aria-label='underline btn' className={`${style.fontstyleBtn} ${nodeStyles?.tdecoration === 'underline' ? `${style.active}` : ""}`} onClick={() => handleToogleDecoration()}>
                                <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M5 19h14M7.6 16l4.2979-10.92963c.0368-.09379.1674-.09379.2042 0L16.4 16m-8.8 0H6.5m1.1 0h1.65m7.15 0h-1.65m1.65 0h1.1m-8.33315-4h5.66025"/>
                                </svg>
                            </button>
                        </div>
                        {
                            node?.nodetype === "text" &&
                            <div className={style.fontStyles}>
                                <button aria-label='bold btn' className={`${style.fontstyleBtn} ${nodeStyles?.talign === 'left' ? `${style    .active}` : ""}`} onClick={() => handleChangeTextAlign('left')}>
                                    <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 6h8m-8 4h12M6 14h8m-8 4h12"/>
                                    </svg>
                                </button>
                                <button aria-label='italic btn' className={`${style.fontstyleBtn} ${nodeStyles?.talign === 'center' ? `${style.active}` : ""}`} onClick={() => handleChangeTextAlign('center')}>
                                    <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 6h8M6 10h12M8 14h8M6 18h12"/>
                                    </svg>
                                </button>
                                <button aria-label='underline btn' className={`${style.fontstyleBtn} ${nodeStyles?.talign === 'right' ? `${style.active}` : ""}`} onClick={() => handleChangeTextAlign('right')}>
                                    <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 6h-8m8 4H6m12 4h-8m8 4H6"/>
                                    </svg>
                                </button>
                            </div>
                        }
                        {
                            (node?.nodetype === "magictext" && node?.nodetype === "logo-text") &&
                            <>
                            <span className={style.fontsizeText}>Make name close to logo</span>
                            <div className={style.fonsizeEditor}>
                                <button className={style.fsizeBtn} onClick={() => dispatch(makeNameFar(nodeid))}>-</button>
                                <span className={style.fontsizeText}>{nodeStyles?.mtop}px</span>
                                <button className={style.fsizeBtn} onClick={() => dispatch(makeNameClose(nodeid))}>+</button>
                            </div>
                            </>
                        }
                    </div>
                </div>
            }
            {
                node?.nodetype === 'image' &&
                <div className={style.styleEditorWrapper} ref={editorRef}>
                    <div className='d-flex align-items-center gap-1'>
                        <div className={style.selectorContainer}>
                            <span className={style.selectorText} onClick={() => setShowdrp(!showDrp)}  style={{ textTransform: 'capitalize', fontFamily: 'AdobeClean-Regular' }}>
                                {selectedObjectFit}
                                <i className={style.fontsizeText}>
                                    Object Fit
                                </i>
                            </span>
                            <div className={`${style.selectorDropdown} ${showDrp ? `${style.show}` : ''}`}>
                                <input className={style.selectorSearch} value={query} onChange={(e) => setQuery(e.target.value)}/>
                                <ul className={style.dropdownList}>
                                {
                                    objectFits.map((item, index) => {
                                        return (
                                            <li key={index} data-selected={selectedObjectFit === item.value} style={{ fontFamily: 'AdobeClean-Regular' }} onClick={() => handleChangeObjectFit(item.value)}>{item.title}</li>
                                        )
                                    })
                                }
                                </ul>
                            </div>
                        </div>
                        <div className={style.fonsizeEditor}>
                            <button className={style.fsizeBtn} onClick={() => {
                                dispatch(decreaseBorderRadius(nodeid));
                                const formdata = new FormData();
                                formdata.append("nodeid", nodeid);
                                formdata.append("bradius", nodeStyles.bradius - 10);
                                dispatch(changeBorderRadius(formdata));
                            }}>-</button>
                            <span className={style.fontsizeText}>{nodeStyles?.bradius}%</span>
                            <button className={style.fsizeBtn} onClick={() => {
                                dispatch(increaseBorderRadius(nodeid));
                                const formdata = new FormData();
                                formdata.append("nodeid", nodeid);
                                formdata.append("bradius", nodeStyles.bradius + 10);
                                dispatch(changeBorderRadius(formdata));
                            }}>+</button>
                        </div>
                    </div>
                </div>
            }
            {
                node?.nodetype === "shape" && (node?.shapetype === "square" || node?.shapetype === "rectangle") &&
                <div className={style.styleEditorWrapper} ref={editorRef}>
                    <div className='d-flex align-items-center gap-1'>
                        <span className={style.fontsizeText}>Border Radius</span>
                        <div className={style.fonsizeEditor}>
                            <button className={style.fsizeBtn} onClick={() => {
                                dispatch(decreaseBorderRadiusofShapes(nodeid));
                                const formData = new FormData();
                                formData.append("nodeid", nodeid);
                                formData.append("bradius", nodeStyles.bradius - 1);
                                dispatch(changeBorderRadius(formData));
                            }}>-</button>
                            <span className={style.fontsizeText}>{nodeStyles?.bradius}px</span>
                            <button className={style.fsizeBtn} onClick={() => {
                                dispatch(increaseBorderRadiusofShapes(nodeid));
                                const formData = new FormData();
                                formData.append("nodeid", nodeid);
                                formData.append("bradius", nodeStyles.bradius + 1);
                                dispatch(changeBorderRadius(formData));
                            }}>+</button>
                        </div>
                        <div className={style.fontColor}>
                            <input type='color' value={nodeStyles?.bgcolor} onChange={(e) => handleShapeColor(e.target.value, e.target)}/>
                        </div>
                        <span className={style.fontsizeText}>Opacity</span>
                        <div className={style.fonsizeEditor}>
                            <button className={style.fsizeBtn} onClick={() => {
                                dispatch(decreaseOpacityofShape(nodeid));
                                const formdata = new FormData();
                                formdata.append("nodeid", nodeid);
                                formdata.append("opacity", nodeStyles.opacity - 10);
                                dispatch(changeOpacity(formdata));
                            }}>-</button>
                            <span className={style.fontsizeText}>{nodeStyles?.opacity}%</span>
                            <button className={style.fsizeBtn} onClick={() => {
                                dispatch(increaseOpacityofShape(nodeid));
                                const formdata = new FormData();
                                formdata.append("nodeid", nodeid);
                                formdata.append("opacity", nodeStyles.opacity + 10);
                                dispatch(changeOpacity(formdata));
                            }}>+</button>
                        </div>
                    </div>
                </div>
            }
            </>
        }
        </>
    )
}

export default StyleEditor;