import React from "react";

const Orders = () => (
  <div
    className="alert alert-success d-flex justify-content-between align-items-center"
    role="alert"
  >
    <div>Aucune commande actuellement disponible.</div>
    <button className="btn btn-primary">Parcourir les produits</button>
  </div>
);

export default Orders;
