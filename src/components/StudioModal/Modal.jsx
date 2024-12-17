import styles from './Modal.module.css'

const Modal = ({ children, show = false, id, onclose }) => {
    return (
        <>
        {/* ${show ? `${styles.show}` : ""} */}
        <div id={id} className={`${styles.modal}`}>
            <div className={styles.modalDialogue}>
                <div className={styles.modalContent}>
                    {children}
                </div>
            </div>
            <div className={`${styles.modalBackdrop}`}></div>
        </div>
        </>
    )
}

export default Modal