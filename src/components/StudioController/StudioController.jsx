import { useSelector } from "react-redux";
import ImageController from "./ImageController";
import TextController from "./TextController"
import BackgroundController from "./BackgroundController";
import ShapeController from "./ShapeController";
import MagicTextController from "./MagicTextController";

const StudioController = ({ active, cardside, projectid }) => {
    const nodes = useSelector((state) => state.node.data);
    if (active === "text") {
        return <TextController cardside={cardside} nodes={nodes} projectid={projectid}/>
    } else if (active === "images") {
        return <ImageController cardside={cardside} projectid={projectid}/>
    } else if (active === "background") {
        return <BackgroundController cardside={cardside} projectid={projectid}/>
    } else if (active === "shapes") {
        return <ShapeController cardside={cardside} projectid={projectid}/>
    } else if (active === "magictext") {
        return <MagicTextController cardside={cardside} nodes={nodes} projectid={projectid}/>
    }
}

export default StudioController;