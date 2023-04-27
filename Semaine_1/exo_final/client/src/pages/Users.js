import React, {useEffect, useState} from 'react';
import dayjs from 'dayjs';
import axios from 'axios';
import {Link} from "react-router-dom";

const Users = () => {
    const [students, setStudents] = useState([]);
    const [res, setRes] = useState('');

    // useeffect avec axios
    useEffect(() => {
        axios.get('http://localhost:3030/users')
        .then(res => {
            setStudents(res.data);
        })
        .catch(err => {
            console.log(err);
        })
    }, [students]);

    const handleDelete = (id) => {
        return () => {
            axios.delete(`http://localhost:3030/user/${id}`)
            .then(res => {
                setRes(res.data);
                console.log(res.data);
            })
            .catch(err => {
                console.log(err);
            })
        }
    }

    return (
        <div className="users-container">
            <Link className="link" to="/">Ajouter un étudiant</Link>
            {
                res !== "" && <p className="success">{res}</p>
            }
            <div className="users">
                {
                    students.map((student) => {
                        return (
                            <div className="user" key={student.id}>
                                <div className="username">
                                <h2>{student.name}</h2>
                                <p>{dayjs(student.date).format('DD/MM/YYYY')}</p>
                                </div>
                                <button className="delete-btn" onClick={handleDelete(student.id)}>Supprimer</button>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
};

export default Users;