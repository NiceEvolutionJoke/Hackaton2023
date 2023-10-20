import { useContext, useEffect, useState } from "react";
import { observer } from 'mobx-react-lite';
import { Context } from './index';
import UserService from "./services/userService";

import Login from "./components/Login";

function App() {

    const {store} = useContext(Context);
    const [users, setUsers] = useState([]);
    useEffect(() => {
        if (localStorage.getItem('accessToken')) {
            store.chechAuth()
        }
    }, []);

    async function getUsers() {
        try {
            const response = await UserService.getUsers();
            console.log(response);
            setUsers(response.data.users);
        } catch(err) {
            console.error(err);
        }
    }

    if (store.isLoading) {
        return (
            <div>Загрузка...</div>
        )
    }

    if (!store.isAuth) {
        return (
            <>
            <Login />
            <div>
                <button onClick={getUsers}>Получить пользователей</button>
            </div>
            </>
            
        )
    }

    return (
        <>
        <h1>{store.isAuth ? 'Авторизован' : 'НЕТ'}</h1>
        <button onClick={() => store.Logout()}>Выйти</button>
        <div>
            <button onClick={getUsers}>Получить пользователей</button>
        </div>
        {users.map(user => 
            <div key={user.id}>{user.username}</div>
        )}
        </>
        
    )
}

export default observer(App);
