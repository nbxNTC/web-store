import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';
 
import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/logo.png';

export default function Login() {
    const [id, setId] = useState([]);    

    const history = useHistory();
    
    async function handleLogin(e) {
        e.preventDefault();         
        try {
            const response = await api.post('sessions', { id });   
            localStorage.setItem('user_id', id);
            localStorage.setItem('user_name', response.data.name);
            history.push('/products');
        } catch (err) {
            alert('Erro ao logar, tente novamente.');
        }        
    }
    return (
        <div className="login-container">   
            <section className="form">                        
                <img src={logoImg} alt="BMO" width="55%"/>
                <form onSubmit={handleLogin}>
                    <h1>Faça seu logon</h1>
                    <input                         
                        placeholder="Sua ID"
                        value={id}                       
                        onChange={e => setId(e.target.value)}                        
                    />                        
                    <button className="button" type="submit">Entrar</button>

                    <Link className="back-link" to="/register">
                        <FiLogIn size="16" color="#9400d3"/>
                        Não tenho cadastro
                    </Link>
                </form>                
            </section> 
        </div>
    );
}