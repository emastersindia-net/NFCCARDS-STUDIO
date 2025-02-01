import { useDispatch, useSelector } from 'react-redux'
import styles from './ImageController.module.css'
import { addImageNodeToProject } from '../../utils/nodeSclice';
import { addImagetoProject, deleteProjectImage } from '../../utils/imageSlice';
import { baseurl } from '../../config/apiUrl';

const ImageController = ({ cardside, projectid }) => {
    const dispatch = useDispatch();
    const images = useSelector((state) => state.images.data);
    const handleUploadImage = (event) => {
        const file = event.target.files[0];
        if (file) {

            const isWebp = file.name.toLowerCase().endsWith('.webp');
            const isSvg = file.name.toLowerCase().endsWith(".svg");
            if (isWebp || isSvg) {
                alert("File format is not supported");
                event.target.value = null;
                return;
            }

            // if (isSvg) {
                
            //     const reader = new FileReader();
            //     reader.readAsText(file);
            //     reader.onload = () => {
            //         try {
            //             const parser = new DOMParser();
            //             const svgDoc = parser.parseFromString(reader.result, "image/svg+xml");
            //             const svgElement = svgDoc.querySelector("svg");

            //             const viewBox = svgElement.getAttribute("viewBox") || null;
            //             const fill = svgElement.getAttribute("fill") || "";
            //             const pathFill = fill !== "none";

            //             const paths = Array.from(svgElement.querySelectorAll("path")).map(path => ({
            //                 d: path.getAttribute("d") || null,
            //                 strokelinecap: path.getAttribute("stroke-linecap") || null,
            //                 strokelinejoin: path.getAttribute("stroke-linejoin") || null,
            //                 strokewidth: path.getAttribute("stroke-width") || null,
            //                 stroke: path.getAttribute("stroke") || null,
            //                 pathfill: path.getAttribute("fill") || null,
            //                 pathfillrule: path.getAttribute("fill-rule") || null,
            //                 pathcliprule: path.getAttribute("clip-rule") || null,
            //                 opacity: path.getAttribute("opacity") || null
            //             }));

            //             const svgData = {
            //                 paths,
            //                 viewbox: viewBox,
            //                 fill: fill,
            //                 pathfill: pathFill
            //             };

            //             console.log(svgData);

            //         } catch (error) {
            //             console.log(error);
            //         }
            //     }

            // }

            const reader = new FileReader();
            reader.onload = (e) => {
                const img = new Image();
                img.onload = () => {
                    let newWidth = img.width;
                    let newHeight = img.height;

                    if (img.width > 1000 || img.height > 500) {
                        const widthRatio = 800 / img.width;
                        const heightRatio = 500 / img.height;

                        const scaleFactor = Math.min(widthRatio, heightRatio);

                        newWidth = Math.floor(img.width * scaleFactor);
                        newHeight = Math.floor(img.height * scaleFactor);
                    }
                    const formData = new FormData();
                    formData.append("projectid", projectid);
                    formData.append("height", newHeight);
                    formData.append("width", newWidth);
                    formData.append("imagefile", file);
                    dispatch(addImagetoProject(formData));
                }
                img.src = e.target.result;
                event.target.value = null;
            }
            reader.readAsDataURL(file);
        } else {
            alert("There is an error in uploading file");
        }
    }
    return (
        <div className={styles.textControllerWrapper}>
        <div className={styles.textBox}>
            <div className={styles.textHeading}>
                <h1>Images</h1>
                <div className={styles.textBtn}>
                    <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v9m-5 0H5a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1h-2M8 9l4-5 4 5m1 8h.01"/>
                    </svg>
                    Upload File
                    <input type='file' className={styles.uploadFile} accept='image/*' title='' onChange={(e) => handleUploadImage(e)}/>
                </div>
            </div>
            <div className={styles.textBody}>
                <div className={styles.row}>
                {
                    images.map((item, index) => {
                        return (
                            <div key={index} className={styles.col}>
                                <div className={styles.imageWrapper} onDoubleClick={() => {
                                    const formData = new FormData();
                                    formData.append("projectid", projectid);
                                    formData.append("imageurl", item.image);
                                    formData.append("height", item.height);
                                    formData.append("width", item.width);
                                    formData.append("cardside", cardside);
                                    dispatch(addImageNodeToProject(formData));
                                }}>
                                    <img src={`${baseurl}${item.image}`} alt="image node"/>
                                    <button className={styles.delBtn} onClick={() => {
                                        dispatch(deleteProjectImage({ imageid: item.id, projectid: projectid }));
                                    }} aria-labelledby='del node'>
                                        <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"/>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        )
                    })
                }
                </div>
            </div>
            
        </div>
    </div>
    )
}

export default ImageController