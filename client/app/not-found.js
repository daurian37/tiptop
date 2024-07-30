import React from "react";

const NotFound = () => {
    return (
        <div className="container notfound">
            <div className="row">
                <div className="col-l2">
                    <h1>Page non trouvé</h1>
                    <h1>404</h1>
                    <a href="/" className="btn btn-outline-primary">
                        Retourner à l'accueil
                    </a>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
