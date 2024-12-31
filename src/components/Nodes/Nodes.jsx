const Nodes = ({ nodes, cardside, styles, selectedNodes, resizeRefs, handleSelectNodes, handleMouseDrag, startEditing, stopEditing, handleContentMenu }) => {
    return (
        <>
        {
            nodes.map((item, index) => {
                if (item.cardside === cardside) {
                    if (item.nodetype === 'text') {
                        return (
                            <div className={`${styles.node} ${selectedNodes.includes(item.id) ? `${styles.selected}` : ''}`} style={{ width: `${item.width}px`, minHeight: `${item.height}px`, top: `${item.y}px`, left: `${item.x}px`, zIndex: item.styles.zindex }} key={index} id={item.id} data-node={item.nodetype} 
                                onClick={(event) => handleSelectNodes(item.id, event)} 
                                onMouseDown={(e) => handleMouseDrag(e)} 
                                onDoubleClick={(e) => startEditing(item.id)} 
                                onBlur={() => stopEditing()}
                                onContextMenu={(e) => handleContentMenu(e, item.id)}
                            >
                                <span className={`${styles.corners} ${styles.top} ${styles.left}`}></span>
                                <span className={`${styles.corners} ${styles.top} ${styles.right}`}></span>
                                <span className={`${styles.corners} ${styles.bottom} ${styles.left}`}></span>
                                <span className={`${styles.corners} ${styles.bottom} ${styles.right}`}></span>
                                <span className={`${styles.resizer} ${styles.right}`} onMouseDown={(e) => handleResizeRight(e, item.id)} ref={resizeRefs.current[item.id]}></span>
                                
                                <div className={styles.nodeText} style={{ width: '100%', whiteSpace: 'normal', wordWrap: 'break-word', overflowWrap: 'break-word', color: item.styles.color, fontFamily: `${item.styles.ffamily}, sans-serif`, fontSize: item.styles.fsize, fontWeight: item.styles.fweight, lineHeight: `${item.styles.lheight}px`, letterSpacing: item.styles.lspacing, fontStyle: item.styles.fstyle, textDecoration: item.styles.tdecoration, textAlign: item.styles.talign }} dangerouslySetInnerHTML={{ __html: item.text }}></div>
                                <button className={styles.nodeDelte} aria-label='node delete' onClick={() => {
                                    
                                }}>
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
        </>
    )
}

export default Nodes