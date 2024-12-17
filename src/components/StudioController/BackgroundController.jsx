import { useDispatch, useSelector } from 'react-redux'
import styles from './BackgroundController.module.css'
import { addColorToGradient, addnewColor, changeBackgroundColor, changeGradientDirection, changelinearGradientColor, changeSpread, changeTypes, deleteColorFromGradient, setBackgroundImage, updategradientData } from '../../utils/backgroundSlice';
import Placeholder from '../../assets/images/placeholder-image.jpg'
import axios from 'axios';
import { baseurl } from '../../config/apiUrl';

const BackgroundController = ({ cardside, projectid }) => {
    const background = useSelector((state) => state.background.data);
    const dispatch = useDispatch();
    const handleAddBgImage = (file, inputEle, side) => {
        if (file) {
            const formData = new FormData();
            formData.append("image", file);
            formData.append("side", side);
            formData.append("type", "image");
            formData.append("id", projectid);
            dispatch(setBackgroundImage(formData));
            if (inputEle) inputEle.value = null;
        }
    }
    const handleChangeColor = async (e, index, side, id) => {
        dispatch(changelinearGradientColor({ value: e.target.value, index: index, side: side }));
        try {
            const formData = new FormData();
            formData.append("colorid", id);
            formData.append("code", e.target.value);
            const res = await axios.post(`${baseurl}/update-color-code`, formData, {
                "Content-Type": 'multipart/form-data'
            });
            console.log(res.data);
        } catch (error) {
            console.log(error.message);
        }
    }
    const handleChangeSpread = async (e, index, side, id) => {
        dispatch(changeSpread({ value: e.target.value, index: index, side: side }));
        try {
            const formData = new FormData();
            formData.append('colorid', id);
            formData.append('spread', e.target.value);
            const res = await axios.post(`${baseurl}/update-color-spread`, formData, {
                "Content-Type": 'multipart/form-data'
            });
            console.log(res.data);
        } catch (error) {
            console.log(error.message);
        }
    }
    const handleTypechange = async (side, type) => {
        try {
            const formdata = new FormData();
            formdata.append('projectid', projectid);
            formdata.append('side', side);
            formdata.append('type', type);
            const res = await axios.post(`${baseurl}/update-bg-type`, formdata, {
                'Content-Type': 'multipart/form-data'
            });
            console.log(res);
        } catch (error) {
            console.log(error.message);
        }
    }
    const handleDeleteColor = async (id) => {
        try {
            const formdata = new FormData();
            formdata.append("id", id);
            const res = await axios.post(`${baseurl}/delete-color`, formdata, {
                'Content-Type': 'multipart/form-data'
            });
            console.log(res);
        } catch (error) {
            console.log(error.message);
        }
    }
    const handleBgColorChange = async (value, side) => {
        try {
            const formdata = new FormData();
            formdata.append("projectid", projectid);
            formdata.append("bgcolor", value);
            formdata.append("side", side);
            const res = await axios.post(`${baseurl}/update-bg-color`, formdata, {
                "Content-Type": "multipart/form-data"
            });
            console.log(res);
        } catch (error) {
            console.log(error.message);
        }
    }
    return (
        <div className={styles.textControllerWrapper}>
        <div className={styles.textBox}>
            <div className={styles.textHeading}>
                <h1>Background</h1>
                <p>Set any Background Color, linear gradient or background image for the card from here</p>
            </div>
            <div className={styles.textBody}>
                {
                    cardside === 'front' ?
                    <>
                    <ul className={styles.tabs}>
                        <li>
                            <button className={background?.front?.type === 'solid' ? styles.active : ''} onClick={() => {
                                dispatch(changeTypes({ value: 'solid', side: 'front'}));
                                handleTypechange('front', 'solid');
                            }}>Solid</button>
                        </li>
                        <li>
                            <button className={background?.front?.type === 'gradient' ? styles.active : ''} onClick={() => {
                                dispatch(changeTypes({ value: 'gradient', side: 'front'}));
                                handleTypechange('front', 'gradient');
                            }}>Linear Gradient</button>
                        </li>
                        <li>
                            <button className={background?.front?.type === 'image' ? styles.active : ''} onClick={() => {
                                dispatch(changeTypes({ value: 'image', side: 'front'}));
                                handleTypechange('front', 'image');
                            }}>Image</button>
                        </li>
                    </ul>
                    {
                        background?.front?.type === 'solid' ? (
                        <div>
                            <input type="color" className={styles.inputColor} value={background?.front.bgcolor} onChange={(e) => {
                                dispatch(changeBackgroundColor({ value: e.target.value, side: 'front' }));
                                handleBgColorChange(e.target.value, 'front');
                            }}/>
                        </div>
                        )
                        : background?.front?.type === 'gradient' ? (
                        <div>
                            <div className={styles.gradientContainer} style={{ background: `linear-gradient(${background?.front?.gradient.direction}, ${background?.front?.gradient.colors.map((c) => `${c.code} ${c.spread}%`).join(", ")})` }}></div>
                            <label className={styles.label}>Direction</label>
                            <select defaultValue={background.front.gradient.direction} className={styles.selectBox} onChange={(e) => {
                                dispatch(updategradientData({
                                    projectid: parseInt(projectid),
                                    gradientid: background.front.gradient.gradientid,
                                    direction: e.target.value,
                                    side: 'front',
                                    type: 'gradient'
                                }));
                                dispatch(changeGradientDirection({ value: e.target.value, side: 'front' }));
                            }}>
                                <option value="to right">To Right</option>
                                <option value="to left">To Left</option>
                                <option value="to top">To Top</option>
                                <option value="to bottom">To Bottom</option>
                                <option value="45deg">45°</option>
                                <option value="135deg">135°</option>
                            </select>
                            <div className={styles.gradBox}>
                            {
                                background?.front?.gradient.colors.map((item, index) => {
                                    return (
                                        <div className={styles.colorBox} key={index}>
                                            <input type='color' value={item.code} onChange={(e) => handleChangeColor(e, index, 'front', item.colorid)}/>
                                            {
                                                index > 1 &&
                                                <button aria-label='delete color' onClick={() => {
                                                    dispatch(deleteColorFromGradient({ index: index, side: 'front' }));
                                                    handleDeleteColor(item.colorid);
                                                }}>
                                                    <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"/>
                                                    </svg>
                                                </button>
                                            }
                                            <input
                                                type="range"
                                                min="0"
                                                max="100"
                                                value={item.spread}
                                                onChange={(e) => handleChangeSpread(e, index, 'front', item.colorid)}
                                                style={{ width: "100%" }}
                                            />
                                            <span className={styles.label} style={{ marginTop: 0 }}>{item.spread}%</span>
                                        </div>
                                    )
                                })
                            }
                            </div>
                            <button className={styles.btn} onClick={() => {
                                const formData = new FormData();
                                formData.append('gradientid', background?.front?.gradient.gradientid);
                                formData.append('code', "#ffffff");
                                formData.append('spread', 100);
                                formData.append('projectid', projectid);
                                dispatch(addnewColor(formData));
                            }}>Add Color</button>
                        </div>
                        )
                        : (
                        <div className={styles.bgImageWrapper}>
                            <div className={styles.bgImageInner}>
                                <img src={background?.front?.bgimage_url && `http://localhost:52495${background?.front?.bgimage_url}?v=${Date.now()}` || background?.front?.bgimage || Placeholder} className={styles.bgimage} alt='bg image'/>
                                <input type='file' className={styles.inputFile} accept='image/*' title="" onChange={(e) => handleAddBgImage(e.target.files[0], e.target, 'front')}/>
                            </div>
                        </div>
                        )
                    }
                    </>
                    :
                    <>
                    <ul className={styles.tabs}>
                        <li>
                            <button className={background?.back?.type === 'solid' ? styles.active : ''} onClick={() => {
                                dispatch(changeTypes({ value: 'solid', side: 'back'}));
                                handleTypechange('back', 'solid');
                            }}>Solid</button>
                        </li>
                        <li>
                            <button className={background?.back?.type === 'gradient' ? styles.active : ''} onClick={() => {
                                dispatch(changeTypes({ value: 'gradient', side: 'back'}));
                                handleTypechange('back', 'gradient');
                            }}>Linear Gradient</button>
                        </li>
                        <li>
                            <button className={background?.back?.type === 'image' ? styles.active : ''} onClick={() => {
                                dispatch(changeTypes({ value: 'image', side: 'back'}));
                                handleTypechange('back', 'image');
                            }}>Image</button>
                        </li>
                    </ul>
                    {
                        background.back.type === 'solid' ? (
                        <div>
                            <input type="color" className={styles.inputColor} value={background?.back.bgcolor} onChange={(e) => {
                                dispatch(changeBackgroundColor({ value: e.target.value, side: 'back' }));
                                handleBgColorChange(e.target.value, 'back');
                            }}/>
                        </div>
                        )
                        : background.back.type === 'gradient' ? (
                        <div>
                            <div className={styles.gradientContainer} style={{ background: `linear-gradient(${background?.back?.gradient.direction}, ${background?.back?.gradient.colors.map((c) => `${c.code} ${c.spread}%`).join(", ")})` }}></div>
                            <label className={styles.label}>Direction</label>
                            <select defaultValue={background.back.gradient.direction} className={styles.selectBox} onChange={(e) => {
                                dispatch(updategradientData({
                                    projectid: parseInt(projectid),
                                    gradientid: background.back.gradient.gradientid,
                                    direction: e.target.value,
                                    side: 'back',
                                    type: 'gradient'
                                }));
                                dispatch(changeGradientDirection({ value: e.target.value, side: 'back' }));
                            }}>
                                <option value="to right">To Right</option>
                                <option value="to left">To Left</option>
                                <option value="to top">To Top</option>
                                <option value="to bottom">To Bottom</option>
                                <option value="45deg">45°</option>
                                <option value="135deg">135°</option>
                            </select>   
                            <div className={styles.gradBox}>
                            {
                                background.back.gradient.colors.map((item, index) => {
                                    return (
                                        <div className={styles.colorBox} key={index}>
                                            <input type='color' value={item.code} onChange={(e) => handleChangeColor(e, index, 'back', item.colorid)}/>
                                            {
                                                index > 1 &&
                                                <button aria-label='delete color' onClick={() => dispatch(deleteColorFromGradient({ index: index, side: 'back' }))}>
                                                    <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"/>
                                                    </svg>
                                                </button>
                                            }
                                            <input
                                                type="range"
                                                min="0"
                                                max="100"
                                                value={item.spread}
                                                onChange={(e) => handleChangeSpread(e, index, 'back', item.colorid)}
                                                style={{ width: "100%" }}
                                            />
                                            <span className={styles.label} style={{ marginTop: 0 }}>{item.spread}%</span>
                                        </div>
                                    )
                                })
                            }
                            </div>
                            <button className={styles.btn} onClick={() => dispatch(addColorToGradient('back'))}>Add Color</button>
                        </div>
                        )
                        : (
                        <div className={styles.bgImageWrapper}>
                            <div className={styles.bgImageInner}>
                                <img src={background?.back?.bgimage_url && `http://localhost:52495${background?.back?.bgimage_url}?v=${Date.now()}` || background?.back?.bgimage || Placeholder} className={styles.bgimage} alt='bg image'/>
                                <input type='file' className={styles.inputFile} accept='image/*' title="" onChange={(e) => handleAddBgImage(e.target.files[0], e.target, 'back')}/>
                            </div>
                        </div>
                        )
                    }
                    </>
                }
            </div>
        </div>
    </div>
    )
}

export default BackgroundController