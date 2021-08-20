import axios from 'axios';

class UserService {

    getUsers(token){
        return axios("http://localhost:8080/user-api/user/")
    }
    create(data){
        return axios.post("http://localhost:8080/user-api/user", data)
    }
     checkUsername(data) {
        return axios.post("http://127.0.0.1:8080/api/login", data)
    }
    checkEmail(data){

    }
}

export default new UserService();