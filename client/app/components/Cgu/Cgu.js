import React from "react";

const Cgu = () => {
  return (
    <div className="contact_section layout_padding">
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <h1 className="contact_taital">
              Conditions Générales d’Utilisation de Thé Tip Top
            </h1>
            <div className="bulit_icon mb-4">
              <img src="assets/images/bulit-icon.png" alt="Bullet Icon" />
            </div>

            <div className="accordion" id="accordionExample">
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingOne">
                  <button
                    className="accordion-button"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseOne"
                    aria-expanded="true"
                    aria-controls="collapseOne"
                  >
                    Article 1 – Objet du Jeu-Concours
                  </button>
                </h2>
                <div
                  id="collapseOne"
                  className="accordion-collapse collapse show"
                  aria-labelledby="headingOne"
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body">
                    Le jeu-concours organisé par Thé Tip Top a pour objectif de
                    promouvoir les produits de la marque et d'offrir aux
                    participants la possibilité de remporter différents lots.
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingTwo">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseTwo"
                    aria-expanded="false"
                    aria-controls="collapseTwo"
                  >
                    Article 2 – Conditions de Participation
                  </button>
                </h2>
                <div
                  id="collapseTwo"
                  className="accordion-collapse collapse"
                  aria-labelledby="headingTwo"
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body">
                    La participation est ouverte à toute personne majeure
                    résidant en France métropolitaine. Chaque participant peut
                    utiliser un seul code de participation par jour. Aucun achat
                    n'est nécessaire pour participer au jeu-concours.
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingThree">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseThree"
                    aria-expanded="false"
                    aria-controls="collapseThree"
                  >
                    Article 3 – Déroulement du Jeu-Concours
                  </button>
                </h2>
                <div
                  id="collapseThree"
                  className="accordion-collapse collapse"
                  aria-labelledby="headingThree"
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body">
                    Les participants doivent saisir leur code de participation
                    sur le site du jeu-concours pour découvrir instantanément
                    s'ils ont remporté l'un des lots. Les gains seront attribués
                    selon les pourcentages définis dans le règlement du
                    jeu-concours. Un tirage au sort sera effectué à la fin de la
                    période de jeu pour désigner le gagnant du gros lot.
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingFour">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseFour"
                    aria-expanded="false"
                    aria-controls="collapseFour"
                  >
                    Article 4 – Collecte et Utilisation des Données Personnelles
                  </button>
                </h2>
                <div
                  id="collapseFour"
                  className="accordion-collapse collapse"
                  aria-labelledby="headingFour"
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body">
                    Les données personnelles collectées dans le cadre du
                    jeu-concours seront traitées conformément à la politique de
                    confidentialité de Thé Tip Top. Les participants consentent
                    à la collecte et à l'utilisation de leurs données
                    personnelles aux fins de gestion du jeu-concours.
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingFive">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseFive"
                    aria-expanded="false"
                    aria-controls="collapseFive"
                  >
                    Article 5 – Propriété Intellectuelle
                  </button>
                </h2>
                <div
                  id="collapseFive"
                  className="accordion-collapse collapse"
                  aria-labelledby="headingFive"
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body">
                    Tous les éléments du site du jeu-concours, y compris les
                    textes, images, logos, et vidéos, sont la propriété
                    exclusive de Thé Tip Top ou de ses partenaires et sont
                    protégés par les lois sur la propriété intellectuelle. Toute
                    reproduction ou utilisation non autorisée de ces éléments
                    est strictement interdite.
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingSix">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseSix"
                    aria-expanded="false"
                    aria-controls="collapseSix"
                  >
                    Article 6 – Limitation de Responsabilité
                  </button>
                </h2>
                <div
                  id="collapseSix"
                  className="accordion-collapse collapse"
                  aria-labelledby="headingSix"
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body">
                    Thé Tip Top ne saurait être tenue responsable de tout
                    dommage direct ou indirect résultant de l'utilisation du
                    site du jeu-concours. Thé Tip Top se réserve le droit de
                    modifier, suspendre ou interrompre le jeu-concours à tout
                    moment, sans préavis ni obligation de justification.
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingSeven">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseSeven"
                    aria-expanded="false"
                    aria-controls="collapseSeven"
                  >
                    Article 7 – Modification des CGU
                  </button>
                </h2>
                <div
                  id="collapseSeven"
                  className="accordion-collapse collapse"
                  aria-labelledby="headingSeven"
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body">
                    Thé Tip Top se réserve le droit de modifier les présentes
                    CGU à tout moment. Les modifications seront publiées sur le
                    site du jeu-concours et prendront effet immédiatement après
                    leur publication. En participant au jeu-concours, vous
                    reconnaissez avoir lu, compris et accepté les présentes CGU.
                    Si vous avez des questions ou des préoccupations concernant
                    les CGU, veuillez nous contacter sur le site via la page
                    contact.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cgu;
