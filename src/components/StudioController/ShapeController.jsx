import { useDispatch } from 'react-redux'
import styles from './ShapeController.module.css'
import { addACircleShape, addARectangleShape, addASquareShape } from '../../utils/nodeSclice';

const ShapeController = ({ cardside }) => {
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
                        <div className={styles.shapeBox} onDoubleClick={() => dispatch(addASquareShape(cardside))}>
                            <i className={styles.squareIcon}></i>
                            <span className={styles.shapeName}>Square</span>
                        </div>
                    </div>
                    {/* <div className={styles.col}>
                        <div className={styles.shapeBox} onDoubleClick={() => dispatch(addARectangleShape(cardside))}>
                            <i className={styles.recIcon}></i>
                            <span className={styles.shapeName}>Rectangle</span>
                        </div>
                    </div> */}
                    <div className={styles.col}>
                        <div className={styles.shapeBox} onDoubleClick={() => dispatch(addACircleShape(cardside))}>
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