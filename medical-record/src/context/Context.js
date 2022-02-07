import React, { useState, useContext, useEffect } from 'react'

const AppContext=React.createContext();

const AppProvider=({children})=>{

  const [alert, setAlert] = useState({ show: false, msg: '', type: '' });
  const [userToken,setUserToken]=useState('')

    const showAlert = (show = false, type = '', msg = '') => {
      setAlert({ show, type, msg });
    };

    const Alert = ({ type, msg, removeAlert }) => {
        useEffect(() => {
          const timeout = setTimeout(() => {
            removeAlert();
          },3000);
          return () => clearTimeout(timeout);
        }, [msg]);
        return <p className={`alert alert-${type}`}>{msg}</p>;
    };


    return (
        <AppContext.Provider
          value={{ Alert, showAlert,setAlert,alert,
          userToken,setUserToken }}
        >
          {children}
        </AppContext.Provider>
    )

      
}

export const useGlobalContext = () => {
    return useContext(AppContext)
  }
  
export { AppContext, AppProvider }
  