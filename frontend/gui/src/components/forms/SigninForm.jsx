import React, { Component } from 'react'
import axios from 'axios'

class SigninForm extends Component {

    state = {
        username: '',
        password: '',
        loading: false,
        successMsg: '',
        errorMsg: ''
    }

    handleSubmit = (event) => {
        event.preventDefault()
        this.setState({
            loading: true,
            errorMsg: '',
            successMsg: ''
        })
        const url = "http://localhost:8000/api/auth/"
        const loginPostData = {
            username: this.state.username,
            password: this.state.password
        }
        
        axios.post(url, loginPostData)
        .then(data => {
            this.setState({
                loading: false,
                successMsg: "Logged in successfully!"
            })

            // Save the token in localStorage for later usage
            localStorage.setItem('token', data.data.token)
        })
        .catch(error => {
            this.setState({
                loading: false,
                errorMsg: "Wrong credentials"
            })
        })
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render() {
        return (

            <div className="container">
                <h2 className="display-4 text-center my-5">Login to your account</h2>
                <form onSubmit={this.handleSubmit} className="card col-md-6 offset-md-3 mb-5">
                    <div className="card-body">
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input onChange={this.handleChange} type="text" id="username" name="username" className="form-control" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="passowrd">Passowrd</label>
                            <input onChange={this.handleChange} type="password" id="passowrd" name="password" className="form-control" />
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-primary btn-block">Login</button>
                        </div>
                        <div className="form-group">
                            <span>{this.state.loading && "Loading... Please wait"}</span>
                            <span>{this.state.errorMsg}</span>
                            <span>{this.state.successMsg}</span>
                        </div>
                    </div>
                </form>
            </div>

        );
    }
}

export default SigninForm;
