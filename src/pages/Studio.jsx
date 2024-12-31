import { useNavigate, useParams } from "react-router-dom";
import StudioLayout from "../shared/StudioLayout";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { baseurl } from "../config/apiUrl";


const Studio = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    
    useEffect(() => {
        const usercookie = Cookies.get("user_token") ?? "";
        const refreshcookie = Cookies.get("user_refresh_token") ?? "";
        const fetchNewToken = async () => {
            try {
                const res = await axios.post(`${baseurl}/protected-login-route`, { token: refreshcookie});
                //console.log(res.data);
                Cookies.set("user_token", res.data.New_Token, { expires: 1 / (24 * 60) });
                setLoading(true);
            } catch (error) {
                window.location.href = "http://localhost:52495/login.html";
            }
        }
        if (!usercookie) {
            if (!refreshcookie) {
                window.location.href = "http://localhost:52495/login.html";
            } else {
                fetchNewToken();
            }
        } else {
            setLoading(true);
        }
    }, [])
    if (!loading) {
        return
    }
    return (
        <StudioLayout projectid={id}/>
    )
}

export default Studio;