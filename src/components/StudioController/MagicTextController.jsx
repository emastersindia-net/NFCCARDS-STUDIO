import styles from './MagicTextController.module.css'
import placeholder from '../../assets/images/placeholder-image.jpg'
import { useDispatch } from 'react-redux'
import { addIconText, addImageToLogoText, addLogoText, changeCompanyNameforMagicText, changeIcon, changeIconofMagicText, nodeTextUpdate } from '../../utils/nodeSclice'
import { useState } from 'react'
import { baseurl } from '../../config/apiUrl'

const iconData = [
    {
        "svg": `<svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" viewBox="0 0 24 24">
  <path d="M7.978 4a2.553 2.553 0 0 0-1.926.877C4.233 6.7 3.699 8.751 4.153 10.814c.44 1.995 1.778 3.893 3.456 5.572 1.68 1.679 3.577 3.018 5.57 3.459 2.062.456 4.115-.073 5.94-1.885a2.556 2.556 0 0 0 .001-3.861l-1.21-1.21a2.689 2.689 0 0 0-3.802 0l-.617.618a.806.806 0 0 1-1.14 0l-1.854-1.855a.807.807 0 0 1 0-1.14l.618-.62a2.692 2.692 0 0 0 0-3.803l-1.21-1.211A2.555 2.555 0 0 0 7.978 4Z"/>
</svg>`,
        "path": "M7.978 4a2.553 2.553 0 0 0-1.926.877C4.233 6.7 3.699 8.751 4.153 10.814c.44 1.995 1.778 3.893 3.456 5.572 1.68 1.679 3.577 3.018 5.57 3.459 2.062.456 4.115-.073 5.94-1.885a2.556 2.556 0 0 0 .001-3.861l-1.21-1.21a2.689 2.689 0 0 0-3.802 0l-.617.618a.806.806 0 0 1-1.14 0l-1.854-1.855a.807.807 0 0 1 0-1.14l.618-.62a2.692 2.692 0 0 0 0-3.803l-1.21-1.211A2.555 2.555 0 0 0 7.978 4Z",
        "viewbox": "0 0 24 24",
        "strokelinecap": null,
        "strokelinejoin": null,
        "strokewidth": null,
        "fill": "#000000",
        "stroke": null,
        "pathfill": "#000000",
        "pathfillrule": null,
        "pathcliprule": null
    },
    {
        "svg": `<svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="none" viewBox="0 0 24 24">
  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.427 14.768 17.2 13.542a1.733 1.733 0 0 0-2.45 0l-.613.613a1.732 1.732 0 0 1-2.45 0l-1.838-1.84a1.735 1.735 0 0 1 0-2.452l.612-.613a1.735 1.735 0 0 0 0-2.452L9.237 5.572a1.6 1.6 0 0 0-2.45 0c-3.223 3.2-1.702 6.896 1.519 10.117 3.22 3.221 6.914 4.745 10.12 1.535a1.601 1.601 0 0 0 0-2.456Z"/>
</svg>`,
        "path": "M18.427 14.768 17.2 13.542a1.733 1.733 0 0 0-2.45 0l-.613.613a1.732 1.732 0 0 1-2.45 0l-1.838-1.84a1.735 1.735 0 0 1 0-2.452l.612-.613a1.735 1.735 0 0 0 0-2.452L9.237 5.572a1.6 1.6 0 0 0-2.45 0c-3.223 3.2-1.702 6.896 1.519 10.117 3.22 3.221 6.914 4.745 10.12 1.535a1.601 1.601 0 0 0 0-2.456Z",
        "viewbox": "0 0 24 24",
        "strokelinecap": "round",
        "strokelinejoin": "round",
        "strokewidth": 2,
        "fill": "none",
        "stroke": "#000000",
        "pathfill": null,
        "pathfillrule": null,
        "pathcliprule": null
    },
    {
        "svg": `<svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" viewBox="0 0 24 24">
  <path fill-rule="evenodd" d="M5 4a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4Zm12 12V5H7v11h10Zm-5 1a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2H12Z" clip-rule="evenodd"/>
</svg>`,
        "path": "M5 4a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4Zm12 12V5H7v11h10Zm-5 1a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2H12Z",
        "viewbox": "0 0 24 24",
        "strokelinecap": null,
        "strokelinejoin": null,
        "strokewidth": null,
        "fill": "#000000",
        "stroke": null,
        "pathfill": null,
        "pathfillrule": "evenodd",
        "pathcliprule": "evenodd"
    },
    {
        "svg": `<svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" viewBox="0 0 24 24">
  <path d="M2.038 5.61A2.01 2.01 0 0 0 2 6v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6c0-.12-.01-.238-.03-.352l-.866.65-7.89 6.032a2 2 0 0 1-2.429 0L2.884 6.288l-.846-.677Z"/>
  <path d="M20.677 4.117A1.996 1.996 0 0 0 20 4H4c-.225 0-.44.037-.642.105l.758.607L12 10.742 19.9 4.7l.777-.583Z"/>
</svg>`,
        "path": "M5 4a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4Zm12 12V5H7v11h10Zm-5 1a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2H12Z",
        "viewbox": "0 0 24 24",
        "strokelinecap": null,
        "strokelinejoin": null,
        "strokewidth": null,
        "fill": "#000000",
        "stroke": null,
        "pathfill": null,
        "pathfillrule": "evenodd",
        "pathcliprule": "evenodd"
    },
    {
        svg: `<svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="none" viewBox="0 0 24 24">
  <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="m3.5 5.5 7.893 6.036a1 1 0 0 0 1.214 0L20.5 5.5M4 19h16a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Z"/>
</svg>`
    },
    {
        svg: `<svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" viewBox="0 0 24 24">
  <path fill-rule="evenodd" d="M11.906 1.994a8.002 8.002 0 0 1 8.09 8.421 7.996 7.996 0 0 1-1.297 3.957.996.996 0 0 1-.133.204l-.108.129c-.178.243-.37.477-.573.699l-5.112 6.224a1 1 0 0 1-1.545 0L5.982 15.26l-.002-.002a18.146 18.146 0 0 1-.309-.38l-.133-.163a.999.999 0 0 1-.13-.202 7.995 7.995 0 0 1 6.498-12.518ZM15 9.997a3 3 0 1 1-5.999 0 3 3 0 0 1 5.999 0Z" clip-rule="evenodd"/>
</svg>`
    },
    {
        svg: `<svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="none" viewBox="0 0 24 24">
  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.8 13.938h-.011a7 7 0 1 0-11.464.144h-.016l.14.171c.1.127.2.251.3.371L12 21l5.13-6.248c.194-.209.374-.429.54-.659l.13-.155Z"/>
</svg>`
    },
    {
        svg: `<svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" viewBox="0 0 24 24">
  <path fill-rule="evenodd" d="M8.64 4.737A7.97 7.97 0 0 1 12 4a7.997 7.997 0 0 1 6.933 4.006h-.738c-.65 0-1.177.25-1.177.9 0 .33 0 2.04-2.026 2.008-1.972 0-1.972-1.732-1.972-2.008 0-1.429-.787-1.65-1.752-1.923-.374-.105-.774-.218-1.166-.411-1.004-.497-1.347-1.183-1.461-1.835ZM6 4a10.06 10.06 0 0 0-2.812 3.27A9.956 9.956 0 0 0 2 12c0 5.289 4.106 9.619 9.304 9.976l.054.004a10.12 10.12 0 0 0 1.155.007h.002a10.024 10.024 0 0 0 1.5-.19 9.925 9.925 0 0 0 2.259-.754 10.041 10.041 0 0 0 4.987-5.263A9.917 9.917 0 0 0 22 12a10.025 10.025 0 0 0-.315-2.5A10.001 10.001 0 0 0 12 2a9.964 9.964 0 0 0-6 2Zm13.372 11.113a2.575 2.575 0 0 0-.75-.112h-.217A3.405 3.405 0 0 0 15 18.405v1.014a8.027 8.027 0 0 0 4.372-4.307ZM12.114 20H12A8 8 0 0 1 5.1 7.95c.95.541 1.421 1.537 1.835 2.415.209.441.403.853.637 1.162.54.712 1.063 1.019 1.591 1.328.52.305 1.047.613 1.6 1.316 1.44 1.825 1.419 4.366 1.35 5.828Z" clip-rule="evenodd"/>
</svg>
`
    },
    {
        svg: `<svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" viewBox="0 0 24 24">
  <path fill-rule="evenodd" d="M13.135 6H15V3h-1.865a4.147 4.147 0 0 0-4.142 4.142V9H7v3h2v9.938h3V12h2.021l.592-3H12V6.591A.6.6 0 0 1 12.592 6h.543Z" clip-rule="evenodd"/>
</svg>`
    },
    {
        svg: `<svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="none" viewBox="0 0 24 24">
  <path fill="currentColor" fill-rule="evenodd" d="M3 8a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8Zm5-3a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H8Zm7.597 2.214a1 1 0 0 1 1-1h.01a1 1 0 1 1 0 2h-.01a1 1 0 0 1-1-1ZM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm-5 3a5 5 0 1 1 10 0 5 5 0 0 1-10 0Z" clip-rule="evenodd"/>
</svg>`
    },
    {
        svg: `<svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" viewBox="0 0 24 24">
  <path fill-rule="evenodd" d="M12.51 8.796v1.697a3.738 3.738 0 0 1 3.288-1.684c3.455 0 4.202 2.16 4.202 4.97V19.5h-3.2v-5.072c0-1.21-.244-2.766-2.128-2.766-1.827 0-2.139 1.317-2.139 2.676V19.5h-3.19V8.796h3.168ZM7.2 6.106a1.61 1.61 0 0 1-.988 1.483 1.595 1.595 0 0 1-1.743-.348A1.607 1.607 0 0 1 5.6 4.5a1.601 1.601 0 0 1 1.6 1.606Z" clip-rule="evenodd"/>
  <path d="M7.2 8.809H4V19.5h3.2V8.809Z"/>
</svg>
`
    }
]

const MagicTextController = ({ cardside, nodes, projectid }) => {
    const dispatch = useDispatch();
    const handleChangeCompanyImage = (id, e) => {
        const file = e.target.files[0];
        if (file) {

            const isWebp = file.name.toLowerCase().endsWith('.webp');
            if (isWebp) {
                alert("Webp format is not supported");
                e.target.value = null;
                return;
            }

            const reader = new FileReader();
            reader.onloadend = () => {
                //dispatch(changeCompanyLogoforMagicText({ id: id, image: reader.result}));
                const formData = new FormData();
                formData.append("nodeid", id);
                formData.append("image", file);
                dispatch(addImageToLogoText({ formData, projectid }));
                e.target.value = null;
            }
            reader.readAsDataURL(file);
        }
    }
    const [openId, setOpenId] = useState(null);

    const handleOpenDropdown = (id) => {
        if (openId === id) {
            setOpenId(null);
        } else {
            setOpenId(id);
        }
    }

    return (
        <div className={styles.textControllerWrapper}>
            <div className={styles.textBox}>
                <div className={styles.textHeading}>
                    <h1>Magic Text</h1>
                    <p>This feature is used to create text with icons or with logos or images quickly</p>
                </div>
                <div className={styles.textBody}>
                    <button className={styles.textBtn} onClick={() => {
                        dispatch(addLogoText({ cardside: cardside, projectid: projectid }));
                    }}>Add Company Logo Width Text</button>
                    <button className={styles.textBtn} onClick={() => {
                        dispatch(addIconText({ cardside: cardside, projectid: projectid }));
                    }}>Add Contacts</button>
                    <div style={{ maxHeight: "230px", minHeight: "230px", overflowY: "auto", overflowX: "hidden" }}>
                        {
                            nodes.map((item, index) => {
                                if (item.nodetype === 'magictext' && item.type === 'logo-text') {
                                    return (
                                        <div key={index} id={item.id}>
                                            <div className={styles.magicNodeImage}>
                                                <img src={item.image ? `${baseurl}${item.image}` : placeholder} alt='logo'/>
                                                <input type="file" accept='image/*' title='' onChange={(e) => handleChangeCompanyImage(item.id, e)}/>
                                            </div>
                                            <input type='text' className={styles.nodeInput} value={item.text} onChange={(e) => {
                                                dispatch(changeCompanyNameforMagicText({ id: item.id, value: e.target.value }));
                                                const formdata = new FormData();
                                                formdata.append("nodeid", item.id);
                                                formdata.append("text", e.target.value);
                                                dispatch(nodeTextUpdate(formdata));
                                            }}/>
                                        </div>
                                    )
                                } else if (item.nodetype === 'magictext' && item.type === 'icon-text') {
                                    return (
                                        <div key={index} id={item.id} style={{ display: "flex", alignItems: "center" }}>
                                            <div className={styles.iconSelector}>
                                                <span className={styles.iconContent} onClick={() => handleOpenDropdown(item.id)} dangerouslySetInnerHTML={{ __html: item.icon.svg }}></span>
                                                {
                                                    openId === item.id &&
                                                    <div className={styles.iconDropdown}>
                                                        <ul>
                                                            {
                                                                iconData.map((icon, index) => {
                                                                    return (
                                                                        <li key={index} dangerouslySetInnerHTML={{ __html: icon.svg }} onClick={() => {
                                                                            dispatch(changeIconofMagicText({ id: item.id, svg: icon.svg }));
                                                                            dispatch(changeIcon({ nodeid: item.id, svg: icon.svg }));
                                                                            setOpenId(null);
                                                                        }}></li>
                                                                    )
                                                                })
                                                            }
                                                        </ul>
                                                    </div>
                                                }
                                            </div>
                                            <input type='text' className={styles.iconText} value={item.text} onChange={(e) => {
                                                dispatch(changeCompanyNameforMagicText({ id: item.id, value: e.target.value }));
                                                const formdata = new FormData();
                                                formdata.append("nodeid", item.id);
                                                formdata.append("text", e.target.value);
                                                dispatch(nodeTextUpdate(formdata));
                                            }}/>
                                        </div>
                                    )
                                }
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MagicTextController