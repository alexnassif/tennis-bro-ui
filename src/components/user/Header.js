import React from "react";
import {Link} from "react-router-dom";
import {useCookies} from "react-cookie";

const Header = () => {
    const [token, , deleteToken] = useCookies(['tennisbro-token']);
    //logout user
    const logoutUser = (event) => {
        if(event){
            event.preventDefault();
        }
        
        deleteToken(['tennisbro-token']);
        window.location.href = '/login';

    }

    return (

        <>
            <nav class="navbar navbar-expand-lg bg-dark navbar-dark py-2 px-5">
                <div class="container-fluid">
                    <a href="/update-profile" class='navbar-brand'><h3>TENNIS BRO</h3></a>

                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navmenu"><span class="navbar-toggler-icon"></span></button>
                        
                    <div class="collapse navbar-collapse" id="navmenu">
                        <ul class="navbar-nav ms-auto">
                            <li class="nav-item">
                                <Link to='/update-profile' className="nav-link custom-color h5">Profile</Link>
                            </li>
                            <li class="nav-item">
                                <Link to='/search'  className="nav-link custom-color h5">Search</Link>
                            </li>
                            <li class="nav-item">
                                <Link to='/chat-list' className="nav-link custom-color h5">
                                    Chat
                                </Link>
                            </li>
                            <li class="nav-item">
                                <a className="nav-link custom-color h5" onClick={e => logoutUser(e)}>Logout</a>
                            </li>
                            
                        </ul>
                    </div>
                </div>
            </nav>
        </>

    )
}

export default Header;