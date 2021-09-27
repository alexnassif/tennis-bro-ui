import axios from 'axios';
import { useCookies } from "react-cookie";

class MessageService {

    getMessagesBetweenUsers(sender, recipient){
        return axios.get(`http://localhost:8080/message-api/messages/${sender}/${recipient}`, {
            headers: {
                Authorization: `Bearer ${useCookies(['tennisbro-token'])}`,
            }
        })
    }
}

export default new MessageService();