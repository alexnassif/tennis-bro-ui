import axios from 'axios';
import React, { useEffect, useState } from 'react';


const Users = () =>{
    const [users, setUsers] = useState([]);

    useEffect(()=>{
        const fetchUsers = async () => {
            const result = await axios('http://localhost:8080/user-api/user');
            setUsers(result.data);
            console.log(result.data);
        };
        fetchUsers();

    }, []

    );

    return (
        <div>

        </div>
    )

}

export default Users;