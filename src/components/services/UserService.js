import axios from 'axios';

class UserService {

    getUsers(token){
        return axios.get("http://localhost:8080/user-api/user", {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
    }
    create(data){
        return axios.post("http://localhost:8080/user-api/user", data)
    }
     checkUsername(data) {
        return axios.post("http://127.0.0.1:8080/api/login", data)
    }
    checkEmail(data){

    }
    getUser(token){
        return axios.get("http://localhost:8080/user-api/me", {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
    }
}

export default new UserService();