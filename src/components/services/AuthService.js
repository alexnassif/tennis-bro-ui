import axios from 'axios';

class AuthService {
     login(data) {
        console.log(data);
        return axios.post("http://127.0.0.1:8080/api/login/", data)
    }
}

export default new AuthService();