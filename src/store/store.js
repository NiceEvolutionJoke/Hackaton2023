import { makeAutoObservable } from 'mobx';
import { API_URL } from "../api/axios";
import AuthService from "../services/authService";
import axios from "axios";

export default class Store {

    isAuth = false;
    isLoading = false;

    constructor() {
        makeAutoObservable(this);
    }

    setAuth(bool) {
        this.isAuth = bool;
    }

    setLoading(bool) {
        this.isLoading = bool;
    }

    async Login(login, password) {
        try {
            const response = await AuthService.login(login, password);
            console.log(response);
            localStorage.setItem('accessToken', response.data.accessToken);
            this.setAuth(true);
        } catch (e) {
            console.error(e);
        }
    }

    async Signup(login, name, password, password2) {
        try {
            const response = await AuthService.signup(login, name, password, password2);
            localStorage.setItem('accessToken', response.data.accessToken);
            this.setAuth(true);
        } catch (e) {
            console.error(e.response?.data?.msg);
        }
    }

    async Logout() {
        try {
            const response = await AuthService.logout();
            localStorage.removeItem('accessToken');
            this.setAuth(false);
        } catch (e) {
            console.error(e.response?.data?.msg);
        }
    }

    async chechAuth() {
        this.setLoading(true);
        try {
            const response = await axios.post(`${API_URL}/auth/refresh`, { withCredentials: true });
            console.log(response);
            localStorage.setItem('accessToken', response.data.accessToken);
            this.setAuth(true);
        } catch (e) {
            console.error(e.response?.data?.msg);
        } finally {
            this.setLoading(false);
        }
    }
}