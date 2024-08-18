import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";

const AccountDetails = () => {
    const [message, setMessage] = useState("");
    const [errors, setErrors] = useState("");
    const [isEditable, setIsEditable] = useState(false);
    const [showMessage, setShowMessage] = useState(false);
    const [showErrors, setShowErrors] = useState(false);

    const [userValue, setUserValue] = useState({
        firstName: "",
        lastName: "",
        email: "",
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("token");
        axios
            .get("https://tiptop-snowy.vercel.app/profile", {
                headers: {
                    Authorization: token,
                },
            })
            .then((response) => {
                const userData = response.data;
                setUserValue({
                    firstName: userData.firstname,
                    lastName: userData.lastname,
                    email: userData.email,
                    currentPassword: "",
                    newPassword: "",
                    confirmPassword: "",
                });
            })
            .catch((err) => {
                if (err.response.status === 403 || err.response.status === 401) {
                    router.push("/login");
                }
            });
    }, []);

    const handleChange = (e) => {
        setUserValue({ ...userValue, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        if (userValue.newPassword !== userValue.confirmPassword) {
            setErrors("Les mots de passe ne correspondent pas");

            setShowErrors(true);
            setTimeout(() => {
                setShowErrors(false);
            }, 2000);
        }

        const data = {
            firstname: userValue.firstName,
            lastname: userValue.lastName,
            email: userValue.email,
            newPassword: userValue.newPassword,
        };

        axios
            .put("https://tiptop-snowy.vercel.app/profile", data, {
                headers: {
                    Authorization: token,
                },
            })
            .then((response) => {
                setMessage("Informations mises à jour avec succès");
                setShowMessage(true);
                setTimeout(() => {
                    setShowMessage(false);
                }, 2000);
            })
            .catch((err) => {
                if (err.request.status === 400) {
                    setErrors(err.response.data.message);
                    setShowErrors(true);
                }
            });
    };

    const toggleEditMode = () => {
        setIsEditable(!isEditable);
    };

    return (
        <div>
            <div className="d-flex justify-content-end align-items-center mb-3">
                <span onClick={toggleEditMode} style={{ cursor: "pointer", fontSize: "1em" }}>
                    <FontAwesomeIcon className="mx-2" icon={faPencilAlt} />
                    modifier mes informations
                </span>
            </div>
            {!isEditable && (
                <form>
                    <div className="row px-2">
                        <div className="col-md-4 mb-3">
                            <label htmlFor="lastName" className="form-label">
                                Nom *
                            </label>
                            <input type="text" className="form-control" id="lastName" name="lastName" value={userValue.lastName} disabled={!isEditable} readOnly={!isEditable} />
                        </div>
                        <div className="col-md-4 mb-3">
                            <label htmlFor="firstName" className="form-label">
                                Prénom *
                            </label>
                            <input type="text" className="form-control" id="firstName" name="firstName" value={userValue.firstName} disabled={!isEditable} readOnly={!isEditable} />
                        </div>
                        <div className="col-md-8 mb-3">
                            <label htmlFor="email" className="form-label">
                                E-mail *
                            </label>
                            <input type="email" className="form-control" id="email" name="email" value={userValue.email} disabled={!isEditable} readOnly={!isEditable} />
                        </div>
                    </div>
                </form>
            )}
            {isEditable && (
                <form onSubmit={handleSubmit}>
                    <div className="row px-2">
                        <div className="col-md-4 mb-3">
                            <label htmlFor="lastName" className="form-label">
                                Nom *
                            </label>
                            <input type="text" className="form-control" id="lastName" onChange={handleChange} name="lastName" value={userValue.lastName} readOnly={!isEditable} />
                        </div>
                        <div className="col-md-4 mb-3">
                            <label htmlFor="firstName" className="form-label">
                                Prénom *
                            </label>
                            <input type="text" className="form-control" id="firstName" onChange={handleChange} name="firstName" value={userValue.firstName} readOnly={!isEditable} />
                        </div>
                        <div className="col-md-8 mb-3">
                            <label htmlFor="email" className="form-label">
                                E-mail *
                            </label>
                            <input type="email" className="form-control" id="email" onChange={handleChange} name="email" value={userValue.email} readOnly={!isEditable} />
                        </div>
                        <>
                            <div className="col-md-8 mb-3">
                                <label htmlFor="newPassword" className="form-label">
                                    Nouveau mot de passe
                                </label>
                                <input type="password" className="form-control" id="newPassword" onChange={handleChange} name="newPassword" value={userValue.newPassword} />
                            </div>
                            <div className="col-md-8 mb-3">
                                <label htmlFor="confirmPassword" className="form-label">
                                    Confirmation
                                </label>
                                <input type="password" className="form-control" id="confirmPassword" onChange={handleChange} name="confirmPassword" value={userValue.confirmPassword} />
                            </div>
                        </>
                        <div className="mx-auto mb-3">
                            <button type="submit" className="btn btn-outline-success" disabled={!isEditable}>
                                Modifier
                            </button>
                            {showMessage && <div className="my-3 text-success">{message}</div>}
                            {showErrors && <div className="my-3 text-danger">{errors}</div>}
                        </div>
                    </div>
                </form>
            )}
        </div>
    );
};

export default AccountDetails;
