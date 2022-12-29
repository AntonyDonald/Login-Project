import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import api from "../api/Api";


const DataContext = createContext({});


export const DataProvider = ({ children }) => {

    const [getData, setGetData] = useState([]);
    const [userData , setUserData] = useState({})
    const [ username , setUserName] = useState("");
    const [password , setPassword] = useState("");
    const [retypepassword , setRetypePassword] = useState("");
    const [access , setAccess] = useState(true)

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get('/user')
                setGetData(response.data)
            } catch (err) {
                console.log(err.message)
            }

        }
        fetchData()
    }, []);

    const logout = () => {
setAccess(false)
navigate('/')
    }

    return (
        <DataContext.Provider value={{
            getData, setGetData,username,setUserName,password,setPassword,navigate, retypepassword,
            setRetypePassword,userData,setUserData,access,setAccess,logout
        }}>{children}</DataContext.Provider>
    )
}

export default DataContext;