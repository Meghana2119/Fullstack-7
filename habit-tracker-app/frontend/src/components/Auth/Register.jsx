import React, { useState } from 'react';
import './login.css';
import axios from 'axios';

export const Register = (props) => {
    const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
    const [name, setFirstName] = useState("");
    const [surname, setSurname] = useState("");
    const [message, setMessage] = useState("")
    
    const handleSubmit = async(e) => {
        e.preventDefault(); 
        console.log (name + " " + surname);
        try {
            const response = await axios.post('http://localhost:3000/api/register', {
                name,email,
                password,//add email instead of name (if needs to check email)
            });
            setMessage(response.data.message);

    } catch(error){if(error.response){
        setMessage(error.response.data.message, "Registeration failed")

    }
    else {
        setMessage("An unexpected error occurred. Please try again.");
    }}// forgot to handle error
}
    return (
        <div className="form-container">
            <h2>Register</h2>
            <form className="registerForm" onSubmit={handleSubmit}>
                <label htmlFor="firstName">First Name</label>
                <input value={name} onChange={(e) => setFirstName(e.target.value)} type="text" placeholder="Your First Name" id="firstName" name="firstName" />

                <label htmlFor="surname">Surname</label>
                <input value={surname} onChange={(e) => setSurname(e.target.value)} type="text" placeholder="Your Surname" id="surname" name="surname" />
                
                <label htmlFor="email">Email</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="youremail@email.com" id="email" name="email"/>

			    <label htmlFor="password">Create Password</label>
			    <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="*********" id="password" name="password"/>
			    <button type="submit">Sign Up</button>
		    </form>
            <button className="linkButton" onClick={() => props.onFormSwitch("Login")}> Already have an account? Login Here</button>
            {/* Display the success or error message -update the route after registeration*/}
            {message && <div className="message">{message}</div>}
        </div>
        
	);
    
}