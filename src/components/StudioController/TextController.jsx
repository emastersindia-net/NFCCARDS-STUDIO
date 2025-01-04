import { useDispatch, useSelector } from 'react-redux';
import styles from './TextController.module.css'
import { addTextNodeToProject, deleteNode, deleteNodeFromProject, editNodeText, nodeTextUpdate } from '../../utils/nodeSclice';

const TextController = ({ cardside, nodes, projectid }) => {
   const selectednode = useSelector((state) => state.selectednode);
   const dispatch = useDispatch();
   const handleAddNewTextNode = () => {
        dispatch(addTextNodeToProject({ cardside: cardside, projectid: projectid}));
   }
   return (
    <div className={styles.textControllerWrapper}>
        <div className={styles.textBox}>
            <div className={styles.textHeading}>
                <h1>Text</h1>
                <p>Edit your text below or double Click on the field you'd like to edit directly on your design.</p>
            </div>
            <div className={styles.textBody}>
                {
                    cardside === 'front' ?
                    <>
                    {
                        nodes.map((item, index) => {
                            if (item.cardside === 'front' && item.nodetype === 'text') {
                                return (
                                    <div className={styles.formGroup} key={item.id} id={`text-node-controller-${index + 1}`} data-selected={selectednode === item.id}>
                                        <input type='text' className={styles.formControl} value={item.text} onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                const input = e.target.value;
                                                e.target.value = input + '<br />';
                                                e.preventDefault();
                                            }
                                        }}  onChange={(e) => {
                                            dispatch(editNodeText({id: item.id, value: e.target.value}));
                                            const formdata = new FormData();
                                            formdata.append("nodeid", item.id);
                                            formdata.append("text", e.target.value);
                                            dispatch(nodeTextUpdate(formdata));
                                        }}/>
                                        <button className={styles.deleteBtn} aria-label='delete text node' onClick={() => {
                                            dispatch(deleteNode(item.id));
                                            dispatch(deleteNodeFromProject(item.id));
                                        }}>
                                            <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"/>
                                            </svg>
                                        </button>
                                    </div>
                                )
                            }
                        })
                    }
                    </>
                    :
                    <>
                    {
                        nodes.map((item, index) => {
                            if (item.cardside === 'back' && item.nodetype === 'text') {
                                return (
                                    <div className={styles.formGroup} key={item.id} id={`text-node-controller-${index + 1}`}>
                                        <input type='text' className={styles.formControl} value={item.text} onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                const input = e.target.value;
                                                e.target.value = input + '<br />';
                                                e.preventDefault();
                                            }
                                        }} onChange={(e) => {
                                            dispatch(editNodeText({id: item.id, value: e.target.value}));
                                            const formdata = new FormData();
                                            formdata.append("nodeid", item.id);
                                            formdata.append("text", e.target.value);
                                            dispatch(nodeTextUpdate(formdata));
                                        }}/>
                                        <button className={styles.deleteBtn} aria-label='delete text node' onClick={() => {
                                             dispatch(deleteNode(item.id));
                                             dispatch(deleteNodeFromProject(item.id));
                                        }}>
                                            <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"/>
                                            </svg>
                                        </button>
                                    </div>
                                )
                            }
                        })
                    }
                    </>
                }
            </div>
            <div className={styles.textFooter}>
                <button className={styles.textBtn} onClick={() => handleAddNewTextNode()}>New Text Field</button>
            </div>
        </div>
    </div>
   ) 
}

export default TextController;