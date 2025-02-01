import styles from './StudioHeader.module.css'
import LOGO from '../../assets/images/logo.png'
import { useState } from 'react'
import { pdf } from '@react-pdf/renderer';
import MyDocument from '../PDF/MyDocument';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { baseurl } from '../../config/apiUrl';
import PDFIConTesting from '../../pages/PDFIconTesting';

const StudioHeader = ({ projectid }) => {
    const [projectName, setProjectName] = useState(`Project ${projectid}`);

    const data = useSelector((state) => state.node.data);

    const backgrounds = useSelector((state) => state.background.data);

    const [loading, setLoading] = useState(false);
    const downloadPdf = async () => {
        try {
            setLoading(true);
            const pdfBlob = await pdf(<MyDocument data={data} backgrounds={backgrounds}/>).toBlob();
            const pdfFile = new File([pdfBlob], "document.pdf", {
                type: 'application/pdf'
            });
            const formData = new FormData();
            formData.append("pdffile", pdfFile);
            
            const res = await axios.post(`${baseurl}/generate-pdf-by-file`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                responseType: 'blob',
            });
            if (res.status === 200) {
                const link = document.createElement('a');
                link.href = URL.createObjectURL(res.data);
                link.download = `file-${projectid}.pdf`;
                
                document.body.appendChild(link);
                link.click();

                document.body.removeChild(link);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <header className={styles.headerWrapper}>
            <nav className={styles.navbarWrapper}>
                <div className={styles.navbarColumn}>
                    <div className={styles.navbarColumnGrid}>
                        <div className={styles.navbarBrand}>
                            <img src={LOGO} alt="logo"/>
                        </div>
                    </div>
                </div>
                <div className={styles.navbarColumn}>
                    <div className={styles.navbarFilename}>
                        <input type='text' placeholder='Project Name' value={projectName} onChange={(e) => setProjectName(e.target.value)}/>
                    </div>
                    <div className={styles.btns}>
                        <button onClick={() => downloadPdf()}>
                            <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 17v-5h1.5a1.5 1.5 0 1 1 0 3H5m12 2v-5h2m-2 3h2M5 10V7.914a1 1 0 0 1 .293-.707l3.914-3.914A1 1 0 0 1 9.914 3H18a1 1 0 0 1 1 1v6M5 19v1a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-1M10 3v4a1 1 0 0 1-1 1H5m6 4v5h1.375A1.627 1.627 0 0 0 14 15.375v-1.75A1.627 1.627 0 0 0 12.375 12H11Z"/>
                            </svg>
                            Download PDF
                        </button>
                        {/* <PDFDownloadLink document={<PDFIConTesting />} fileName='proof.pdf'>
                            Download IconTesting
                        </PDFDownloadLink> */}
                    </div>
                </div>
            </nav>
            {
                loading &&
                <div className={styles.spinnerWrapper}>
                    <div className={styles.spinnerContainer}>
                        <div className={`${styles.dot} ${styles.dot1}`}></div>
                        <div className={`${styles.dot} ${styles.dot2}`}></div>
                        <div className={`${styles.dot} ${styles.dot3}`}></div>
                    </div>
                </div>
            }
        </header>
    )
}

export default StudioHeader;