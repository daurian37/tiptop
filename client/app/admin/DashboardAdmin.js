import axios from "axios";
import React, { useEffect, useState } from "react";

const DashboardAdmin = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:8000/users")
            .then((response) => {
                setUsers(response.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);
    return (
        <div>
            <h3 className="text-center">Liste des utilisateurs</h3>
            <table className="rwd-table">
                <tbody>
                    <tr>
                        <th>Id</th>
                        <th>Nom</th>
                        <th>Prénom</th>
                        <th>Email</th>
                        <th>Action</th>
                    </tr>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td data-th="Id">{user.id}</td>
                            <td data-th="nom">{user.lastname}</td>
                            <td data-th="prenom">{user.firstname}</td>
                            <td data-th="Email">{user.email}</td>
                            <td data-th="Action">
                                <button className="btn btn-outline-danger" onClick={() => alert("bientot")}>
                                    Supprimer
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DashboardAdmin;
