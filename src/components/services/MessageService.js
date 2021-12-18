import axios from 'axios';

class MessageService {

    getMessagesBetweenUsers(sender, recipient, token){
        return axios.get(`http://localhost:8080/message-api/messages/${sender}/${recipient}`, {
            headers: {
                Authorization: `Bearer ${token})}`,
            }
        })
    }
}

export default new MessageService();