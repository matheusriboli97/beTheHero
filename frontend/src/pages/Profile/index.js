import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import logoImg from '../../assets/logo.svg';
import { FiPower, FiTrash2 } from 'react-icons/fi';
import './styles.css';
import { useState, useEffect } from 'react';
import api from '../../services/api';

export default function Profile() {
    const [incidents, setIncidents] = useState([]);//começa como um array vazio pq estou buscando um conjunto de informacoes para preenche-lo
    const ongName = localStorage.getItem('ongName');//to pegando os dados que eu coloquei no storage do navegador no index do Logon
    const ongId = localStorage.getItem('ongId');
    const history = useHistory();

    useEffect(() => {
        api.get('profile', {//porque os incidentes estao na rota profile
            headers: {
                Authorization: ongId,//eu preciso do header para acessar os incidentes especificios da ong, e pego ele desse jeito uma vez que ele estava salvo no storage
            }
        }).then(response => {//o then serve para eu pegar os dados
            setIncidents(response.data);//gravo os dados da minha resposta no estado 
        })
    }, [ongId]);/* primeiro parâmetro: qual função eu quero que seja executada, segundo: quando essa função vai ser executada. Toda vez q o segundo parametro muda, o primeiro (A função) vai ser executada , então se eu deixar o segundo par. vazio o primeiro vai ser executado só uma vez */
    //se o id da ong mudasse os incidentes teriam que ser recalculados, por isso o [ongId]

    async function handleDeleteIncident(id) {
        try {
            await api.delete(`incidents/${id}`, {
                headers: {
                    Authorization: ongId, 
                }
            });

            setIncidents(incidents.filter( incident => incident.id !== id));
        } catch (err) {
            alert(`Erro ao deletar caso, tente novamente.`)
        }

    }

    function handleLogout(){
        localStorage.clear();
        history.push('/');
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be the hero" />
                <span>Bem vinda, {ongName}</span>
                <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>
                <button onClick= {handleLogout} type="button">
                    <FiPower size={18} color="#E02041" />{/*Esse size é do próprio icone, nao da caixinha q vai em volta */}
                </button>
            </header>
            <h1>Casos cadastrados</h1>
            <ul>
                {incidents.map(incident => (
                    <li key={incident.id}>
                        <strong>CASO: </strong>
                        <p>{incident.title}</p>

                        <strong>DESCRIÇÃO: </strong>
                        <p>{incident.description}</p>

                        <strong>VALOR: </strong>
                        <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'}).format(incident.value)}</p>

                        <button onClick= {() => handleDeleteIncident(incident.id) } type="button">
                            <FiTrash2 size={20} color="#a8a8b3" />
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}