import React, { useState, useEffect } from 'react';

const AuthContext = React.createContext({
    isLoggedIn: false,
    onLogout: () => {},
    onLogin: () => {},
    staffcode: null,
    username: null,
    location: null,
    isAdmin: null,
    isActive: null,
    logCount: null,
    token: null,
    onLogCountIncrease: () => {}
});

export const AuthContextProvider = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [location, setLocation] = useState(null);
    const [onActionCount, setOnActionCount] = useState(0);
    const [userInfo, setUserInfo] = useState({
        staffcode: null,
        username: null,
        location: null,
        isAdmin: null,
        isActive: null,
        logCount: null,
        token: null
    });

    const onStorageUpdate = (e) => {
        const { key, newValue } = e;
        if (key === "userInfo") {
            setUserInfo(newValue);
        }
        if (key === "isLoggedIn") {
            setIsLoggedIn(newValue);
        }
        if (key === "location") {
            setLocation(newValue);
        }
    };

    useEffect(() => {
        const storedUserLoggedInInformation = localStorage.getItem('isLoggedIn');
        let userInfoData = JSON.parse(localStorage.getItem("userInfo"));
        window.addEventListener("storage", onStorageUpdate);
        if (storedUserLoggedInInformation === '1') {
            setIsLoggedIn(true);
            setUserInfo({
                ...userInfo,
                staffcode: userInfoData.staffcode,
                username: userInfoData.username,
                location: userInfoData.location,
                isAdmin: userInfoData.isAdmin,
                isActive: userInfoData.isActive,
                logCount: userInfoData.logCount,
                token: userInfoData.token
            });
        }
        return () => {
            window.removeEventListener("storage", onStorageUpdate);
        };
    }, [onActionCount]);

    const logoutHandler = () => {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('userInfo');
        localStorage.removeItem('location');
        setIsLoggedIn(false);
        setUserInfo({
            ...userInfo,
            staffcode: null,
            username: null,
            location: null,
            isAdmin: null,
            isActive: null,
            logCount: null,
            token: null
        })
        setOnActionCount(onActionCount + 1);
    };

    const loginHandler = () => {
        localStorage.setItem('isLoggedIn', '1');
        let userInfoData = JSON.parse(localStorage.getItem("userInfo"));
        localStorage.setItem('location', userInfoData.location);
        setUserInfo({
            ...userInfo,
            staffcode: userInfoData.staffcode,
            username: userInfoData.username,
            location: userInfoData.location,
            isAdmin: userInfoData.isAdmin,
            isActive: userInfoData.isActive,
            logCount: userInfoData.logCount,
            token: userInfoData.token
        });
        setIsLoggedIn(true);
        setOnActionCount(onActionCount + 1);
    };

    const increaseLogCount = () => {
        setUserInfo({
            ...userInfo,
            logCount: userInfo.logCount + 1
        })
        let userInfoData = JSON.parse(localStorage.getItem("userInfo"));
        userInfoData.logCount = userInfoData.logCount + 1;
        localStorage.removeItem('userInfo');
        localStorage.setItem('userInfo', JSON.stringify(userInfoData));
    }

    return (
        <AuthContext.Provider
            value={{
                isLoggedIn: isLoggedIn,
                onLogout: logoutHandler,
                onLogin: loginHandler,
                staffcode: userInfo.staffcode,
                username: userInfo.username,
                location: userInfo.location,
                isAdmin: userInfo.isAdmin,
                isActive: userInfo.isActive,
                logCount: userInfo.logCount,
                token: userInfo.token,
                onLogCountIncrease: increaseLogCount
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthContext;