import React, { useState, useEffect } from 'react';
import { useHistory, Link  } from 'react-router-dom';
import InputMask from 'react-input-mask';
import { FiArrowLeft, FiCheckCircle, FiXCircle } from 'react-icons/fi';
import axios from 'axios';

import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/logo.png';
const Login = () =>{
    const [ufs, setUfs] = useState([]);
    const [cities, setCities] = useState([]);    
    
    const [name, setName] = useState([]);
    const [email, setEmail] = useState([]);
    const [whatsapp, setWhatsapp] = useState([]);
    const [uf, setUf] = useState('0');
    const [city, setCity] = useState('0');

    const [userID, setUserID] = useState([]);

    const [success, setSuccess] = useState(false);
    const [failed, setFailed] = useState(false);

    const history = useHistory();

    useEffect(() => {
        axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome').then(response => {
          const ufInitials = response.data.map(uf => uf.sigla);
          setUfs(ufInitials);
        })
      }, []);

      useEffect(() => {
        if (uf === '0') {
            return;
        }

        axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`).then(response => {
            const cities = response.data.map(city => city.nome);
            setCities(cities);
        })
    }, [uf]);
    
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
            setUserID(response.data.id);
            setSuccess(true);            
        } catch (err) {
            setFailed(true);            
        }        
    }

    function handleSelectUf(event) {
        const selectedUf = event.target.value;
        setUf(selectedUf);
      }
    
      function handleSelectCity(event) {
        const selectedCity = event.target.value;
        setCity(selectedCity);
      }      

    return (
        <>
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
                            <div className="field">                    
                                <select 
                                    name="uf" 
                                    id="uf" 
                                    className="field-select"
                                    value={uf} 
                                    onChange={handleSelectUf}
                                >
                                    <option value="0">Estado</option>
                                    {ufs.map(ufMap => (
                                    <option key={ufMap} value={ufMap}>{ufMap}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="field">                    
                                <select 
                                    name="city" 
                                    id="city"
                                    className="field-select"
                                    value={city}
                                    onChange={handleSelectCity}
                                >
                                    <option value="0">Cidade</option>
                                    {cities.map(cityMap => (
                                    <option key={cityMap} value={cityMap}>{cityMap}</option>
                                    ))}
                                </select>              
                            </div>
                        </div>   
                        <button className="button" type="submit">Cadastrar</button>
                    </form>      
                </div>      
            </div>
            <div id="sucess" className={success ? "sucess-show" : "sucess-hide"}>
                <div className="content">
                    <FiCheckCircle size="150" color="rgb(16, 131, 31)"/>
                    <h1>Cadastro concluido!</h1>
                    <h3>Seu ID: {userID}</h3>
                    <button onClick={() => { history.push('/'); }}>
                        Fazer login
                    </button>                    
                </div>
            </div>
            <div id="failed" className={failed ? "failed-show" : "failed-hide"}>
                <div className="content">
                    <FiXCircle size="150" color="rgb(180, 0, 0)"/>
                    <h1>Erro ao cadastrar!</h1>
                    <button onClick={() => { setFailed(false); }}>
                        Tentar novamente
                    </button>                    
                </div>
            </div>
        </>        
    );
}

export default Login;