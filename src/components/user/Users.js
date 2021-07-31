import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router';
import { useCookies } from "react-cookie"


const Users = () =>{
    const [users, setUsers] = useState([]);
    const [redirect, setRedirect] = useState(false);
    const [id, setId] = useState();
    const [user, setUser] = useState("");
    const [token] = useCookies(['tennisbro-token'])

    function sendToChat(event, ID){
        event.preventDefault();
        setId(ID);
        setRedirect(true);

    }
    function handleChange(e){
        setUser(user => e.target.value)
    }

    useEffect(()=>{
        if(!token['tennisbro-token']) {
            window.location.href = '/';
        } 
        const fetchUsers = async () => {
            const result = await axios("http://localhost:8080/user-api/user");
            setUsers(result.data);
        };
        fetchUsers();

    }, []);

    if(redirect){
        return <Redirect to={{pathname:"/chat", state:{ID: id, user_ID: user}}}/>;
    }

    return (
        <div className="container">

            {
                users.map(
                    (user) => {
                        return (<div key={user.ID} className="card" style={{width: "18rem"}}>
                        <img className="card-img-top" src="..." alt="Card image cap"/>
                        <div className="card-body">
                          <h5 className="card-title">{user.user_name}</h5>
                          <p className="card-text">{user.bio}</p>
                          <button className="btn btn-primary" onClick={(e)=> sendToChat(e, user.ID)}>Chat</button>
                        </div>
                      </div>)
                    }
                )
            }

            <input type="text" value={user} onChange={(e) => handleChange(e)}></input>

        </div>
    )

}

export default Users;