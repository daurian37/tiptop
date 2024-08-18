"use client";
import "./styles.css";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import ResponsivePagination from "react-responsive-pagination";

const page = () => {
    const [pageNumber] = useState(15);
    const [lots, setLots] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isEmployee, setIsEmployee] = useState(false);

    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            const user = jwtDecode(token);
            if (user && user.category === 3) {
                setIsLoggedIn(true);
                setIsEmployee(true);
            } else {
                router.push("/profile");
            }
        } else {
            router.push("/login");
        }
    }, [router]);

    useEffect(() => {
        axios
            .get("http://localhost:8000/lots/users")
            .then((response) => {
                const lotList = response.data;
                setLots(lotList);

                // Calculer le nombre total de pages
                const pages = Math.ceil(lotList.length / pageNumber);
                setTotalPages(pages);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [pageNumber]);

    const indexOfLastLot = currentPage * pageNumber;
    const indexOfFirstLot = indexOfLastLot - pageNumber;
    const currentLots = lots.slice(indexOfFirstLot, indexOfLastLot);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div>
            <h3 className="text-center">Liste des gains</h3>
            <table className="rwd-table">
                <tbody>
                    <tr>
                        <th className="text-center">Nom</th>
                        <th className="text-center">Prénom</th>
                        <th className="text-center">Titre</th>
                        <th className="text-center">Ticket</th>
                    </tr>
                    {currentLots.map((lot) => (
                        <tr key={lot.id}>
                            <td className="text-center" data-th="titre">
                                {lot.lastname}
                            </td>
                            <td className="text-center" data-th="titre">
                                {lot.firstname}
                            </td>
                            <td className="text-center" data-th="titre">
                                {lot.lotTitle}
                            </td>
                            <td className="text-center" data-th="ticket">
                                {lot.ticketTitle}
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

export default page;
