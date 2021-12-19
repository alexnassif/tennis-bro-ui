import Cookies from "universal-cookie";
import http from "../../http-axios"
const cookies = new Cookies();

class ChatService {

    getDialogs(token, id) {
        return http.get('/room-api/rooms', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        )
    }
}

export default new ChatService();