import { useNavigate, useParams } from "react-router-dom";
import StudioLayout from "../shared/StudioLayout";
import { useEffect } from "react";
import axios from "axios";
import { baseurl } from "../config/apiUrl";

const Studio = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        const fetchToken = async () => {
            try {
               const res = await axios.post(`${baseurl}/check-token-valid`);
               console.log(res.data); 
            } catch (error) {
                //navigate("")
                //window.location.href = "http://localhost:52495/login.html"
            }
        }
        fetchToken();
    }, [])

    return (
        <StudioLayout projectid={id}/>
    )
}

export default Studio;