import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = (props) => {

    return (
        <div className="navbar">
            <NavLink to="/" activeClassName="selected">
                Home
                </NavLink>
            {props.state.loggedIn ?
                <NavLink to="/logout" activeClassName="selected">
                    Logout
                    </NavLink>
                :
                <>
                    <NavLink to="/signin" activeClassName="selected">
                        Login
                        </NavLink>
                    {/* <NavLink to="/signup">
                            Register
                        </NavLink> */}
                </>
            }
        </div>
    );
}

export default Navbar;
