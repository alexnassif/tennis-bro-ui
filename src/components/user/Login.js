import React, {useState, useEffect } from "react"
import AuthService from "../services/AuthService"
import {Link} from "react-router-dom";
import { useCookies } from "react-cookie"


const LoginPage = () => {
    //the synkup-token is set here and can be used everywhere 
    const [token, setToken] = useCookies(['tennisbro-token'])
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("");

    //when the token changes
    useEffect( () => {
        console.log(token)
        if(token['tennisbro-token']) {
            window.location.href = '/';
        } 
    }, [token])

    //login user here
    function submitLogin(event) {
        if (event) {
            event.preventDefault();

        }
        const credentials = {
            "username": username,
            "password": password,

        }
        AuthService.login(credentials)
            .then(function (response) {
                setToken('tennisbro-token', response.data)
            }).catch(function (error) {
            alert(error);
        });
        event.preventDefault();
    }

    const usernameHandlerChange = (event) => {
        // event.persist();
        setUsername(event.target.value)

    };

    const passwordHandlerChange = (event) => {
        // event.persist();
        setPassword(event.target.value)

    };
        return ( 
          <>
          <header class="page-header">
            <div className="container pt-3">
                <div class="row align-item-center justify-content-center">
                    <div class="col-md-6">
                        <img src="" className="img-responsive img-fluid"  alt="Responsive image"/>
                    </div>
                    <div class="col-md-6">
                        <div className="jumbotron mb-5">
                            <h1><strong>Login</strong></h1>
                            <form className="form-signin" onSubmit={e => submitLogin(e)} >  
                            <label for="inputUsername" className="sr-only">Username</label>
                            <input 
                                type="Username" 
                                id="inputUsername" 
                                className="form-control" 
                                placeholder="Username" 
                                onChange = {e => usernameHandlerChange(e)}
                                value={username}
                                required 
                                autofocus/>
                            <label for="inputPassword" className="sr-only">Password</label>
                            <input 
                                type="password" 
                                id="inputPassword" 
                                className="form-control" 
                                placeholder="Password" 
                                value={password}
                                onChange = {e => passwordHandlerChange(e)}
                                required/>
                            <div class="d-grid gap-2">
                                <button className="btn btn-lg btn-primary btn-block mt-3" type="submit">Sign in</button>
                            </div>
                            </form>
                            <p className="mt-3">Don't have an account? Register <span><Link to="/register">here</Link></span></p>

                        </div> 
                    </div>
                </div>
                
            </div>
            </header>

            </>

           
        )
    }
    
export default LoginPage