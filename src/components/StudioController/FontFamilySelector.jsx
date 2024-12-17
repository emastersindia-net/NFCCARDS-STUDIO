import { useState } from 'react';
import styles from './FontFamilySelector.module.css';

const FontFamilySelector = ({ fonts, selectedFont, onChange }) => {
    const handleClick = (value) => {
        onChange(value);
    }
    const [query, setQuery] = useState("");
    const [show, setShow] = useState(false);
    return (
        <div className={styles.selectorContainer}>
            <span className={styles.selectorText} onClick={() => setShow(!show)}>{selectedFont}</span>
            <div className={`${styles.selectorDropdown} ${show ? `${styles.show}` : ''}`}>
                <input className={styles.selectorSearch} value={query} onChange={(e) => setQuery(e.target.value)}/>
                <ul className={styles.dropdownList}>
                {
                    fonts.map((font, index) => {
                        return (
                            <li key={index} style={{ fontFamily: `${font.ffamily}, sans-serif` }} data-selected={selectedFont === font.title} onClick={handleClick(font.ffamily)}>{font.title}</li>
                        )
                    })
                }
                </ul>
            </div>
        </div>
    )
}

export default FontFamilySelector