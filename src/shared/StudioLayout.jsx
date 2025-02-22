import { useEffect, useRef, useState } from "react";
import StudioHeader from "../components/StudioHeader/StudioHeader"
import StudioSidebar from "../components/StudioSidebar/StudioSidebar";
import StudioController from "../components/StudioController/StudioController";
import StudioEditor from "../components/StudioController/StudioEditor";
import { useDispatch, useSelector } from "react-redux";
import { fetchBackground } from "../utils/backgroundSlice";
import Loader from "../components/loader/Loader";
import { fetchProjectImages } from "../utils/imageSlice";
import { fetchAllNodes } from "../utils/nodeSclice";
import { Helmet } from "react-helmet";

const StudioLayout = ({ projectid }) => {
    const [sidebarActive, setSidebarActive] = useState('text');
    const handleChangeSidebarActive = (value) => {
        setSidebarActive(value);
    }
    const [cardside, setCardside] = useState("front");
    const handleChangeBackside = () => {
        if (cardside === 'front') {
            setCardside('back');
        } else {
            setCardside('front');
        }
    }
    const dispatch = useDispatch();

    const parentRef = useRef(null);

    const backgroundsLoaded = useSelector((state) => state.background.status);

    useEffect(() => {
        dispatch(fetchBackground(projectid));
        dispatch(fetchProjectImages(projectid));
        dispatch(fetchAllNodes(projectid));

    }, [projectid])

    if (backgroundsLoaded === 'loading' || backgroundsLoaded === 'failed') {
        return <Loader />
    }

    return (
        <>
        <Helmet>
            <title>{projectid}</title>
        </Helmet>
        <StudioHeader projectid={projectid} parentRefer={parentRef}/>
        <StudioSidebar value={sidebarActive} onChange={handleChangeSidebarActive}/>
        <main id="studio-main">
            <div className="studio-row">
                <div className="studio-col1">
                    <StudioController active={sidebarActive} cardside={cardside} projectid={projectid}/>
                </div>
                <div className="studio-col2">
                    <StudioEditor cardside={cardside} cardsideToogler={handleChangeBackside} reference={parentRef}/>
                </div>
            </div>
        </main>
        </>
    )
}

export default StudioLayout;