import { useState } from 'react'
import styles from './QrcodeController.module.css'
import { useDispatch } from 'react-redux';
import { addQrNode } from '../../utils/nodeSclice';
const QrcodeController = ({ cardside, projectid }) => {
    const [link, setLink] = useState("");
    const [transparentBackground, setTransparentBackground] = useState(true);
    const [backgroundColor, setBackgroundColor] = useState("#000000");
    const [color, setColor] = useState("#000000");
    const dispatch = useDispatch();
    const handleAddQr = () => {  
        const formData = new FormData();
        formData.append("projectid", projectid);
        formData.append("link", link);
        formData.append("backgroundtype", transparentBackground ? "transparent" : "solid");
        formData.append("bgcolor", backgroundColor);
        formData.append("color", color);
        formData.append("width", 200);
        formData.append("height", 200);
        formData.append("cardside", cardside);
        dispatch(addQrNode(formData));
        setLink("");
        setTransparentBackground(true);
        setBackgroundColor("#000000");
        setColor("#000000");
    }
    return (
        <div className={styles.textControllerWrapper}>
            <div className={styles.textBox}>
                <div className={styles.textHeading}>
                    <h1>Qr Code</h1>
                    <p>Create your QR below and double Click on the add buton to directly add on your design.</p>
                </div>
                <div className={styles.textBody}>
                    <label className={styles.label}>Link</label>
                    <input type='text' className={styles.formControl} value={link} onChange={(e) => setLink(e.target.value)}/>
                    <label className={styles.label}>Background Color</label>
                    <div className={styles.checkBox}>
                        <input type='checkbox' className={styles.checkInput} id="bg-transparent" value={transparentBackground} checked={transparentBackground} onChange={() => setTransparentBackground(!transparentBackground)}/>
                        <label className={styles.checkLabel} htmlFor='bg-transparent'>Transparent Background</label>
                    </div>
                    {
                        !transparentBackground &&
                        <div>
                            <input type="color" value={backgroundColor} onChange={(e) => setBackgroundColor(e.target.value)} className={styles.colorInpt}/>
                        </div>
                    }
                    <label className={styles.label}>Code Color</label>
                    <input type="color" value={color} onChange={(e) => setColor(e.target.value)} className={styles.colorInpt}/>
                </div>
                <div className={styles.textFooter}>
                    <button className={styles.textBtn} onClick={() => handleAddQr()}>Add Qr</button>
                </div>
            </div>
        </div>
    )
}

export default QrcodeController