import React, { Component } from 'react'
import Navbar from './navigation'
import Routes from '../routes'

class App extends Component {

    state = {
        loggedIn: false
    }

    componentDidMount = () => {
        // get token from localStorage
        const token = localStorage.getItem('token')
        if (!token) {
            this.setState({
                errorMsg: "You are not logged in. Please login to view your tasks.",
                taskLoading: false
            })
            return
        }

        else {
            this.setState({
                loggedIn: true
            })
        }
    }

    render() {
        return (
            <div className="container">
                <Navbar state={this.state} />
                <Routes />
            </div>
        );
    }
}

export default App;
