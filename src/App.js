import { useEffect } from "react";
import { Routes, Route } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { useStore } from "./store/store";

import './App.scss';

import Layout from "./components/Layout";
import RequireAuth from './components/RequireAuth';
import Loading from './components/loading/Loading';

import Login from "./components/main/login/Login";


function App() {

    const {store} = useStore();
    
    useEffect(() => {
        if (localStorage.getItem('accessToken')) {
            store.chechAuth();
        }
    }, []);

    return (
        <div className="wrapper">
            { store.isLoading
            ? <Loading />
            : <Routes>
                <Route to="/" element={<Layout />}>
                    {/* public routes */}
                    <Route path="login" element={<Login />} />

                    {/* protected routes */}
                    <Route element={<RequireAuth />}>
                        <Route index element={<></>} />
                    </Route>
                </Route>
            </Routes> }
        </div>
        
    )
}

export default observer(App);
