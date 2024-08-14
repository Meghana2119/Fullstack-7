// import React, { useState } from 'react';
// import './login.css';
// import axios from 'axios';
// //import { useNavigate } from 'react-router-dom'; 

// export const Login = (props) => {
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [name, setUsername] = useState("");
//     //const navigate = useNavigate(); // useNavigate instead of history.push

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         console.log(email);
//         try {
//             const response = await axios.post('http://localhost:3000/api/login', {
//                 name,
//                 password,
//                 email //need to remove
//             })
//             document.getElementById('success-message').innerText = response.data
//             localStorage.setItem('token', response.data.token);//Todo-work on this
//            // navigate('/dashboard'); // Navigate to the dashboard
//         } catch (error) {
//             console.error(error);
//         }
//     }

//     return (
//         <div className="form-container">
//             <h2>Login</h2>
//             <form className="loginForm" onSubmit={handleSubmit}>
//                 <label htmlFor="email">Email</label>
//                 <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="youremail@email.com" id="email" name="email"/>
//                 <label htmlFor='name'>Name</label>
//                 <input value={name} onChange={(e) => setUsername(e.target.value)} type="text"/>
//                 <label htmlFor="password">Password</label>
//                 <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="*********" id="password" name="password"/>
//                 <button type="submit">Log In</button>
//             </form>
//             <div id="sucess-message"></div>
//             <button className="linkButton" onClick={() => props.onFormSwitch("Register")}> Don't have an account? Register Here</button>
//         </div>
//     );
// };
import React, { useState } from 'react';
import './login.css';
import axios from 'axios';

export const Login = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setUsername] = useState("");
    const [message, setMessage] = useState("");  // State to store messages

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");  // Clear any previous messages

        try {
            const response = await axios.post('http://localhost:3000/api/login', {
                name,
                password,//add email instaeds of name if needs to check email
            });

            // Display the success message
            setMessage(response.data.message);

            // Optionally store the token
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
            }

            //Todo  if you want to navigate after successful login
            // navigate('/dashboard');
        } catch (error) {
            console.error("Login error:", error);

            // if any error
            if (error.response) {
                setMessage(error.response.data.message || "Login failed");
            } else {
                setMessage("An unexpected error occurred. Please try again.");
            }
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
            {message && <div id="success-message">{message}</div>}  {/* Display the sucess message */}
            <button className="linkButton" onClick={() => props.onFormSwitch("Register")}> Don't have an account? Register Here</button>
        </div>
    );
};
