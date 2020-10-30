import React from 'react'
import { useHistory } from "react-router-dom";

const Logout = () => {
    let history = useHistory();

    function handleClick() {
        // remove token from localStorage
        localStorage.removeItem('token')


        history.push("/");
    }

    return (
        <div className="container">
            <h3>Are you sure want to logout?</h3>
            <button type="button" className="btn btn-danger" onClick={handleClick}>
                Logout
            </button>
        </div>
    );

}

export default Logout;
