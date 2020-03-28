import React, { useState } from 'react';

import './styles.css';

export default function Login() {
    const [name, setName] = useState([]);

    
    function handleRegister(e) {
        e.preventDefault();
        const data = {
            name,
        }
        console.log(data);
    }
    return (
        <div className="login-container">
            <form onSubmit={handleRegister} className="form">
                <input 
                    type="text"
                    placeholder="Seu Nome"
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
                <input 
                    type="text"
                    placeholder="Seu Nome"
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
                <button className="button" type="submit">Cadastrar</button>
            </form>
        </div>
    );
}