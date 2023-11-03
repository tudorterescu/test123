import React, {useEffect,useState} from "react";
import fbapp from "./firebaseConfig";

export const Usercontext = React.createContext();

export const UserProvider = ({children})=>{
    const [currentUser, setCurrentUser] = useState(null);
    
    
    useEffect(() =>{
        fbapp.auth().onAuthStateChanged(setCurrentUser)
    }, []);

    return(
        <Usercontext.Provider
        value={{
            currentUser
        }}
        >
            {children}
        </Usercontext.Provider>
    );
};