// Initialize Userfront Core JS
import Userfront from "@userfront/react";
import React from "react";
import isAuthenticated from "./isAuthenticated";

Userfront.init("xbr78p4n");

// Define the Signup form component
export default class SignupFormCustom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            accountName: "",
            password: "",
            passwordVerify: "",
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // Whenever an input changes value, change the corresponding state variable
    handleInputChange(event) {
        event.preventDefault();
        const target = event.target;
        this.setState({
            [target.name]: target.value,
        });
    }

    // Handle the form submission by calling Userfront.signup()
    handleSubmit(event) {
        event.preventDefault();
        // Call Userfront.signup()
        Userfront.signup({
            method: "password",
            email: this.state.email,
            password: this.state.password,
            data: {
                accountName: this.state.accountName,
            },
        }).then(() => {
            if(isAuthenticated()) {
            console.log("hello")
        }
        });
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Email address
                        <input
                            name="email"
                            type="email"
                            value={this.state.email}
                            onChange={this.handleInputChange}
                        />
                    </label><br/>
                    <label>
                        Account name (custom field)
                        <input
                            name="accountName"
                            type="text"
                            value={this.state.accountName}
                            onChange={this.handleInputChange}
                        />
                    </label><br/>
                    <label>
                        Password
                        <input
                            name="password"
                            type="password"
                            value={this.state.password}
                            onChange={this.handleInputChange}
                        />
                    </label><br/>
                    <label>
                        Verify password
                        <input
                            name="passwordVerify"
                            type="password"
                            value={this.state.passwordVerify}
                            onChange={this.handleInputChange}
                        />
                    </label><br/>
                    <button type="submit">Sign up</button>
                </form>
            </div>
        );
    }
}

