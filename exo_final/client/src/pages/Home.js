import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";

const Home = () => {
    const [name, setName] = useState('');
    const [date, setDate] = useState('');
    const [res, setRes] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        name !== "" && date !== "" &&
       await axios.post('http://localhost:3030/user', { name })
        .then(res => {
            setRes(res.data);
            setName('');
            setDate('');
        })
        .catch(err => {
            console.log(err);
        })

    };

    return (
        <div className="home">
            {res !== "" && <p className="success">{res}</p>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                <label htmlFor="nom">Nom :</label>
                <input
                    type="text"
                    name="nom"
                    id="nom"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                />
                </div>
                <div className="form-group">
                <label htmlFor="date">Date :</label>
                <input
                    type="date"
                    name="date"
                    id="date"
                    value={date}
                    onChange={(event) => setDate(event.target.value)}
                />
                </div>
                <div className="btn-container">
                <button type="submit">Submit</button>
                </div>
            </form>
            <Link className="link" to="/users">Voir tous les Étudiants</Link>
        </div>
    );
};

export default Home;