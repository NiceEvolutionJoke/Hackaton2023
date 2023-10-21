import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { useStore } from "./controller/store";

import "./App.scss";

import Layout from "./view/Layout";
import RequireAuth from "./view/RequireAuth";
import Loading from "./view/loading/Loading";

import Login from "./view/main/login/Login";
import { Main } from "./pages/main";

function App() {
  const { store } = useStore();

  /*     useEffect(() => {
        if (localStorage.getItem('accessToken')) {
            store.chechAuth();
        }
    }, []); */

  return (
    <div className="wrapper">
      {/*           { store.isLoading
            ? <Loading />
            : <Routes>
                <Route to="/" element={<Layout />}>
                   
                    <Route path="login" element={<Login />} />

                
                    <Route element={<RequireAuth />}>
                        <Route index element={<></>} />
                    </Route>
                </Route>
            </Routes> } */}
      <Main />
    </div>
  );
}

export default observer(App);
