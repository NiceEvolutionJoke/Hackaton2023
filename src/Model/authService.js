import api from "./api/axios";

export default class AuthService {
    static async login(login, password) {
        return api.post('/auth/login', { login, password });
    }

    static async signup(login, name, password, password2) {
        return api.post('/auth/signup', { login, name, password, password2 });
    }

    static async logout() {
        return api.post('/auth/logout');
    }
}