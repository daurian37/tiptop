import axios from "axios";
import React, { useEffect, useState } from "react";
import ResponsivePagination from "react-responsive-pagination";

const GameAdmin = () => {
    const [pageNumber] = useState(15);
    const [jeux, setJeu] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [isEdit, setIsEdit] = useState(null);
    const [editedJeu, setEditedJeu] = useState({ idJeu: null, title: "" });

    useEffect(() => {
        axios
            .get("https://tiptop-snowy.vercel.app/jeu")
            .then((response) => {
                const jeuList = response.data;
                setJeu(jeuList);

                // Calculer le nombre total de pages
                const pages = Math.ceil(jeuList.length / pageNumber);
                setTotalPages(pages);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [pageNumber]);

    const indexOfLastJeu = currentPage * pageNumber;
    const indexOfFirstJeu = indexOfLastJeu - pageNumber;
    const currentJeux = jeux.slice(indexOfFirstJeu, indexOfLastJeu);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleEditJeu = (jeu) => {
        setIsEdit(jeu.idJeu);
        setEditedJeu({ idJeu: jeu.idJeu, title: jeu.title });
    };

    const handleCancelJeu = () => {
        setIsEdit(null);
    };

    const handleChangeJeu = (e) => {
        setEditedJeu({ ...editedJeu, title: e.target.value });
    };

    const handleSaveJeu = (idJeu) => {
        axios
            .put(`https://tiptop-snowy.vercel.app/api/jeu/${idJeu}`, { title: editedJeu.title })
            .then((response) => {
                const updatedJeu = response.data;
                const updatedJeux = jeux.map((jeu) => (jeu.idJeu === updatedJeu.idJeu ? updatedJeu : jeu));
                setJeu(updatedJeux);
                setIsEdit(null);
                window.location.reload();
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div>
            <h3 className="text-center">Liste des jeux</h3>
            <table className="rwd-table">
                <tbody>
                    <tr>
                        <th className="text-center">Titre</th>
                    </tr>
                    {currentJeux.map((jeu) => (
                        <tr key={jeu.idJeu}>
                            <td className="text-center" data-th="titre">
                                <input type="text" name="title" value={isEdit === jeu.idJeu ? editedJeu.title : jeu.title} onChange={handleChangeJeu} className={`form-control border bgeditjeu ${isEdit === jeu.idJeu ? "editjeu" : ""}`} disabled={isEdit !== jeu.idJeu} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="container justify-content-center">
                <ResponsivePagination total={totalPages} current={currentPage} onPageChange={handlePageChange} />
            </div>
        </div>
    );
};

export default GameAdmin;
