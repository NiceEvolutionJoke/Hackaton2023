import api from './api/axios';

export default class postService {
    static async getPosts() {
        return api.get('/posts');
    }
}
