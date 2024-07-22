import React from "react";

const Dashboard = () => (
  <div className="alert alert-success" role="alert">
    <p>
      Bonjour et bienvenu <strong>toto</strong> (vous n'êtes pas <strong>toto</strong>
      &nbsp;?{" "}
      <a href="/" role="link">
        Déconnexion
      </a>
      )
    </p>
  </div>
);

export default Dashboard;
