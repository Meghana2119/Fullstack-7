import React, { useState } from 'react';
import './login.css';
import axios from 'axios';
//import { useNavigate } from 'react-router-dom'; 

export const Login = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setUsername] = useState("");
    //const navigate = useNavigate(); // useNavigate instead of history.push

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(email);
        try {
            const response = await axios.post('http://localhost:3000/api/login', {
                name,
                password,
                email //need to remove
            });

            localStorage.setItem('token', response.data.token);//Todo-work on this
           // navigate('/dashboard'); // Navigate to the dashboard
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="form-container">
            <h2>Login</h2>
            <form className="loginForm" onSubmit={handleSubmit}>
                <label htmlFor="email">Email</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="youremail@email.com" id="email" name="email"/>
                <label htmlFor='name'>Name</label>
                <input value={name} onChange={(e) => setUsername(e.target.value)} type="text"/>
                <label htmlFor="password">Password</label>
                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="*********" id="password" name="password"/>
                <button type="submit">Log In</button>
            </form>
            <button className="linkButton" onClick={() => props.onFormSwitch("Register")}> Don't have an account? Register Here</button>
        </div>
    );
};
