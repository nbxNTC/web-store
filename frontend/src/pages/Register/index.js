import React, { useState } from 'react';
import { useHistory, Link  } from 'react-router-dom';
import InputMask from 'react-input-mask';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/logo.png';

export default function Login() {
    const [name, setName] = useState([]);
    const [email, setEmail] = useState([]);
    const [whatsapp, setWhatsapp] = useState([]);
    const [city, setCity] = useState([]);
    const [uf, setUf] = useState([]);

    const history = useHistory();
    
    async function handleRegister(e) {
        e.preventDefault();
        const data = {
            name,
            email,
            whatsapp,
            city,
            uf
        }   
        try {
            console.log(data);
            const response = await api.post('profile', data);
            alert(`Seu ID de acesso: ${response.data.id}`);
            history.push('/');
        } catch (err) {
            alert('Erro ao cadastrar, tente novamente.');
        }        
    }
    return (
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Web Store" width="60%"/>
                    <h1>Cadastro</h1>
                    <p>Efetue o seu cadastro para realizar compras na nossa loja.</p>
                    <Link className="back-link" to="/">
                        <FiArrowLeft size="16" color="#9400d3"/>
                        Voltar para o logon
                    </Link>
                </section> 
                <form onSubmit={handleRegister}>
                    <input 
                        type="text"
                        placeholder="Nome"
                        value={name}                        
                        onChange={e => setName(e.target.value)}
                        required
                    />
                    <input 
                        type="email"
                        placeholder="E-mail"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                    />
                    <InputMask
                        type="text"
                        placeholder="Whatsapp"
                        mask="(99)99999-9999"
                        value={whatsapp}
                        onChange={e => setWhatsapp(e.target.value)}
                        required
                    />                    
                    <div className="row-2">
                        <input 
                            type="text"
                            placeholder="Cidade"                            
                            value={city}
                            onChange={e => setCity(e.target.value)}
                            required
                        />
                        <input 
                            type="text"
                            placeholder="UF"
                            value={uf}
                            style={{ width: 80 }}
                            maxLength={2}
                            onChange={e => setUf(e.target.value)}
                            required
                        />
                    </div>
                    <button className="button" type="submit">Cadastrar</button>
                </form>      
            </div>      
        </div>
    );
}