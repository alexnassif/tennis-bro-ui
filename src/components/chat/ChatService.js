import Cookies from "universal-cookie";
import http from "../../http-axios"
const cookies = new Cookies();

class ChatService {

    getDialogs(token) {
        return http.get('/chatapi/dialogs/', {
                headers: {
                    'Authorization': `Token ${token}`
                }
            }
        )
    }
}

export default new ChatService();