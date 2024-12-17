import axios from "axios";
import { useNavigate } from "react-router-dom";
import { baseurl } from "../config/apiUrl";

const HomePage = () => {
    const navigate = useNavigate();
    const handleCreateProject = async () => {
        try {
            const res = await axios.post(`${baseurl}/create-new-card?projectname=`, {});
            if (res.status === 200) {
                navigate(`/studio/${res.data.data}`);
            }
        } catch (error) {
            console.log(error.message);
        }
    }
    return (
        <div>
            <button onClick={() => handleCreateProject()}>Create new project!</button>
        </div>
    )
}

export default HomePage