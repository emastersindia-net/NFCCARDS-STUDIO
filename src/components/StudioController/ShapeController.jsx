import { useDispatch } from 'react-redux'
import styles from './ShapeController.module.css'
import { addShapeToProject } from '../../utils/nodeSclice';

const ShapeController = ({ cardside, projectid }) => {
    const dispatch = useDispatch();
    return (
        <div className={styles.textControllerWrapper}>
        <div className={styles.textBox}>
            <div className={styles.textHeading}>
                <h1>Shapes</h1>
                <p>Double click on the shapes to add to design.</p>
            </div>
            <div className={styles.textBody}>
                <div className={styles.row}>
                    <div className={styles.col}>
                        <div className={styles.shapeBox} onDoubleClick={() => {
                            dispatch(addShapeToProject({ cardside: cardside, projectid: projectid, shapetype: "square" }));
                        }}>
                            <i className={styles.squareIcon}></i>
                            <span className={styles.shapeName}>Square</span>
                        </div>
                    </div>
                    <div className={styles.col}>
                        <div className={styles.shapeBox} onDoubleClick={() => {
                            dispatch(addShapeToProject({ cardside: cardside, projectid: projectid, shapetype: "circle" }));
                        }}>
                            <i className={styles.circleIcon}></i>
                            <span className={styles.shapeName}>Circle</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

export default ShapeController