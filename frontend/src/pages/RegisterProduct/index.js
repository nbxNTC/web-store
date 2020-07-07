import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FiArrowLeft, FiCheckCircle, FiXCircle, FiPower } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

import Dropzone from '../../components/Dropzone';

import logoImg from '../../assets/logo.png';

const RegisterProduct = () =>{        
    const [title, setTitle] = useState([]);
    const [plataform, setPlataform] = useState([]);
    const [value, setValue] = useState([]);     
    const [selectedFile, setSelectedFile] = useState();

    const [success, setSuccess] = useState(false);
    const [failed, setFailed] = useState(false);

    const user_name = localStorage.getItem('user_name');
    const user_id = localStorage.getItem('user_id');

    const history = useHistory();    
    
    function handleLogout() {
        localStorage.clear();
        history.push('/');
    }

    async function handleRegister(e) {
        e.preventDefault();  
        const data = new FormData();
        const auth = new Headers();

        auth.append('authorization', user_id);

        data.append('title', title);
        data.append('plataform', plataform);
        data.append('value', value);

        if (selectedFile) {
            data.append('image', selectedFile);
        }         
        try {
            console.log(data);
            console.log(user_id);
            await api.post('products', data, {
                headers: {
                    'authorization': user_id
                }
            });             
            setSuccess(true);            
        } catch (err) {
            setFailed(true);            
        }        
    }    

    return (
        <>
            <div className="register-product-container">

                <header>
                    <div className="left">
                    <img src={logoImg} alt="Web Store" width="10%"/>
                    <span>Bem vindo(a), {user_name}</span>      
                    </div>
                    <div className="right">                    
                    <button onClick={() => { history.push('/products') }} type="button" style={ {width: 100} }>
                        <FiArrowLeft size="18" color="#fff" />
                        <span>
                            Voltar
                        </span>
                    </button>
                    <button onClick={handleLogout} type="button" style={ {width: 90} }>
                        <FiPower size="18" color="#fff" />
                        <span>
                            Sair
                        </span>
                    </button>
                    </div>
                </header>

                <div className="content">
                    <section>
                        <h1>Cadastrar Produto</h1>
                        <p>Registre o seu produto em nosso marketplace.</p>
                    </section> 
                    <form onSubmit={handleRegister}>
                        <Dropzone onFileUploaded={setSelectedFile}/> 
                        <input 
                            type="text"
                            placeholder="Título"
                            value={title}                        
                            onChange={e => setTitle(e.target.value)}
                            required
                        />
                        <input 
                            type="text"
                            placeholder="Plataforma"
                            value={plataform}
                            onChange={e => setPlataform(e.target.value)}
                            required
                        />
                        <input 
                            type="number"
                            placeholder="Valor"
                            value={value}
                            onChange={e => setValue(e.target.value)}
                            required
                        />                                                 
                        <button className="button" type="submit">Cadastrar</button>
                    </form>      
                </div>      
            </div>
            <div id="sucess" className={success ? "sucess-show" : "sucess-hide"}>
                <div className="content">
                    <FiCheckCircle size="150" color="rgb(16, 131, 31)"/>
                    <h1>Produto Cadastrado!</h1>                    
                    <button onClick={() => { history.push('/products'); }}>
                        Voltar
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

export default RegisterProduct;