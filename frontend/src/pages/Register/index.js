import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';//useHistory pra voltar pra rota raiz depois de executado o cadastro
import { FiArrowLeft } from 'react-icons/fi';//eu acho o FiArrowLeft procurando em feather icons
import './styles.css';
import api from '../../services/api';
import logoImg from '../../assets/logo.svg';

export default function Register() {
    const [name, setName] = useState('');//primeiro parametro e o valor e o segundo é a funcao para atualizar esse valor. Começo com ('') porque é um input de texto
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [city, setCity] = useState('');
    const [uf, setUf] = useState('');

    const history = useHistory();

    async function handleRegister(e) {//responsavel por fazer o cadastro do usuario
        e.preventDefault();

        const data = {
            name,
            email,
            whatsapp,
            city,
            uf
        };

        try {
            const response = await api.post('/ongs', data);//enviando para a api. api.post(rota onde estao as variaveis que eu quero, os dados que eu quero enviar)
            alert(`Seu ID de acesso: ${response.data.id}`);//uso `` para poder colocar uma variável 
            history.push('/');//depois de feito o cadastro ele volta para a rota raiz
        } catch (err) {
            alert('Erro no cadastro, tente novamente'); 
        }
    }
    return (
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be the hero" />
                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos da sua ONG.</p>

                    <Link className="back-link" to="/">
                        <FiArrowLeft size={16} color="#E02041" />
                    Não tenho cadastro</Link>
                </section>

                <form onSubmit={handleRegister}>
                    <input
                        placeholder="Nome da ONG"
                        value={name}//variavel do estado
                        onChange={e => setName(e.target.value)}//Eu estou escutando as mudanças aqui. e.target.value representa o valor do input. To colocando ele dentro da variavel name (estado)
                    />
                    <input     
                        placeholder="E-mail"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <input
                        placeholder="whatsapp"
                        value={whatsapp}
                        onChange={e => setWhatsapp(e.target.value)}
                    />
                    <div className="input-group">{/* Crio uma div pra ficar um do lado do outro */}
                        <input
                            placeholder="Cidade"
                            value={city}
                            onChange={e => setCity(e.target.value)}
                        />
                        <input
                            placeholder="UF"
                            style={{ width: 80 }}//deixo com largura fixa, estou incluindo um codigo css usando essas {{}}
                            value={uf}
                            onChange={e => setUf(e.target.value)}
                        />
                    </div>

                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}