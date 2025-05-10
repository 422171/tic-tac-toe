import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ setUser }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:3001/login', { username, password });
            setUser({ username, score: response.data.score });
        } catch (error) {
            alert(error.response.data.message);
        }
    };

    return (
        <div className="container">
            <h2>Login</h2>
            <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button id="login" onClick={handleLogin}>Login</button>
        </div>
    );
};

export default Login;
