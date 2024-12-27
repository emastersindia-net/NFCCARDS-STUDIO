import { useNavigate, useParams } from "react-router-dom";
import StudioLayout from "../shared/StudioLayout";
import { useEffect, useState } from "react";
import axios from "axios";
import { baseurl } from "../config/apiUrl";
axios.defaults.withCredentials = true;

const Studio = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const fetchToken = async () => {
            try {
               const res = await axios.post(`${baseurl}/check-token-valid`);
            } catch (error) {
                //navigate("")
                //window.location.href = "http://localhost:52495/login.html"
            }
        }
        fetchToken();
    }, [])
    if (!loading) {
        return
    }
    return (
        <StudioLayout projectid={id}/>
    )
}

export default Studio;