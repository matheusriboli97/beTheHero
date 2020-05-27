import React, { useState } from 'react';
import './styles.css';
import { Link, useHistory } from 'react-router-dom';//para deixar a transição de uma pagina pra outra no modo spa, ou seja , sem ter q recarregar tdo o codigo html. Use history p/direcionar do login para a pagina da ong
import heroesImg from '../../assets/heroes.png';
import logoImg from '../../assets/logo.svg';
import { FiLogIn } from 'react-icons/fi';//estou importando do feather icons um icone (FiLogIn)
import api from '../../services/api';

export default function Logon() {
    const [id, setId] = useState('');
    const history = useHistory();

    async function handleLogin(e){
        e.preventDefault();

        try{
            const response = await api.post('sessions' , { id });//vou pegar a resposta. Rota do login, e enviar um objeto dentro contendo o id da ong que quer logar na aplicacao 
            localStorage.setItem('ongId', id);//salvo as informações no storage do navegador para as informações ficarem salvas. No inspencionar dentro de application eu consigo ver isso
            localStorage.setItem('ongName', response.data.name);
            history.push('/profile');//to mandando pra rota profile depois que sair daqui

        } catch (err) {
            alert(`Falha no login, tente novamente.`); 
        }

    }

    return (
        <div className="logon-container">
            <section className="form">
                <img src={logoImg} alt="Be the hero" />

                <form onSubmit={handleLogin}>
                    <h1>Faça seu logon</h1>

                    <input
                        placeholder="Sua ID"
                        value={id}
                        onChange={e => setId(e.target.value)}
                    />
                    <button className='button' type="submit"> Entrar</button>{/* chama a class button q eu criei no global.css*/}
                    {/* Perceber que abaixo eu uso o Link to p/ acessar outra pagina, q nesse caso é a register, com a intenção de usar a tecnologia SPA */}
                    <Link className="back-link" to="/register">
                        <FiLogIn size={16} color="#E02041" />
                    Não tenho cadastro</Link>
                </form>
            </section>

            <img src={heroesImg} alt="Heroes" />
        </div>
    )
}
