import { useParams } from "react-router-dom";
import StudioLayout from "../shared/StudioLayout";

const Studio = () => {
    const { id } = useParams();
    return (
        <StudioLayout projectid={id}/>
    )
}

export default Studio;