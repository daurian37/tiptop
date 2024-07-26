const Dashboard = () => {
    return (
        <div className="col-md-8 mx-auto">
            <div className="alert alert-success" role="alert">
                <p>
                    Bonjour <strong>toto</strong> (vous n’êtes pas <strong>toto</strong>
                    &nbsp;?{" "}
                    <a href="/" role="link">
                        Déconnexion
                    </a>
                    )
                </p>
            </div>
        </div>
    );
};

export default Dashboard;
