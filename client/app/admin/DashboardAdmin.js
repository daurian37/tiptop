import axios from "axios";
import React, { useEffect, useState } from "react";
import ResponsivePagination from "react-responsive-pagination";

const DashboardAdmin = () => {
    const [pageNumber] = useState(15);
    const [users, setUsers] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        axios
            .get("http://localhost:8000/users")
            .then((response) => {
                const userList = response.data;
                setUsers(userList);

                // Calculer le nombre total de pages
                const pages = Math.ceil(userList.length / pageNumber);
                setTotalPages(pages);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [pageNumber]);

    const indexOfLastUser = currentPage * pageNumber;
    const indexOfFirstUser = indexOfLastUser - pageNumber;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div>
            <h3 className="text-center">Liste des utilisateurs</h3>
            <table className="rwd-table">
                <tbody>
                    <tr>
                        <th>Nom</th>
                        <th>Prénom</th>
                        <th>Email</th>
                        <th>Action</th>
                    </tr>
                    {currentUsers.map((user) => (
                        <tr key={user.id}>
                            <td data-th="nom">{user.lastname}</td>
                            <td data-th="prenom">{user.firstname}</td>
                            <td data-th="Email">{user.email}</td>
                            <td className="text-center" data-th="Action">
                                <div className="d-flex justify-content-around" style={{ cursor: "pointer" }}>
                                    <i class="fa fa-trash text-danger" aria-hidden="true" onClick={() => alert("bientot")}></i>
                                    <i class="fa fa-pencil-square-o" aria-hidden="true" onClick={() => alert("bientot")}></i>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="container justify-content-center">
                <ResponsivePagination total={totalPages} current={currentPage} onPageChange={(page) => handlePageChange(page)} />
            </div>
        </div>
    );
};

export default DashboardAdmin;
