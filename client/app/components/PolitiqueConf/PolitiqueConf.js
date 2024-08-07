import React from "react";

const PolitiqueConf = () => {
  return (
    <div className="contact_section layout_padding">
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <h1 className="contact_taital">
              Politique de Confidentialité de Thé Tip Top
            </h1>
            <div className="bulit_icon mb-4">
              <img src="assets/images/bulit-icon.png" alt="Bullet Icon" />
            </div>
            <h2>Bonjour et bienvenue chez Thé Tip Top !</h2>
            <p>
              Nous sommes ravis de vous avoir parmi nous, que vous soyez
              passionné de thé, professionnel du secteur, VDI (Vendeur à
              Domicile Indépendant) ou franchisé. Nous prenons la protection de
              vos données personnelles très au sérieux.
            </p>

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
                    Collecte des Informations
                  </button>
                </h2>
                <div
                  id="collapseOne"
                  className="accordion-collapse collapse show"
                  aria-labelledby="headingOne"
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body">
                    <p>
                      Nous recueillons diverses informations vous concernant
                      lorsque vous utilisez notre site, passez une commande,
                      vous inscrivez à notre newsletter ou interagissez avec nos
                      services. Cela peut inclure :
                    </p>
                    <ul>
                      <li>Vos coordonnées (nom, adresse, email, téléphone)</li>
                      <li>Vos informations de paiement</li>
                      <li>
                        Vos préférences de navigation et historiques d’achat
                      </li>
                    </ul>
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
                    Utilisation des Informations
                  </button>
                </h2>
                <div
                  id="collapseTwo"
                  className="accordion-collapse collapse"
                  aria-labelledby="headingTwo"
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body">
                    <p>Les informations collectées sont utilisées pour :</p>
                    <ul>
                      <li>Traiter et expédier vos commandes</li>
                      <li>Améliorer votre expérience sur notre site</li>
                      <li>
                        Vous tenir informé des nouveautés, offres spéciales et
                        actualités de Thé Tip Top
                      </li>
                      <li>
                        Faciliter la gestion de nos relations avec les VDI et
                        les franchisés
                      </li>
                    </ul>
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
                    Partage des Informations
                  </button>
                </h2>
                <div
                  id="collapseThree"
                  className="accordion-collapse collapse"
                  aria-labelledby="headingThree"
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body">
                    <p>
                      Nous ne partageons vos informations personnelles qu'avec
                      des tiers de confiance, et uniquement dans les cas
                      suivants :
                    </p>
                    <ul>
                      <li>
                        Pour le traitement des paiements et la livraison de vos
                        commandes
                      </li>
                      <li>
                        Avec nos partenaires commerciaux pour la gestion des
                        relations VDI et franchisés
                      </li>
                      <li>Si requis par la loi</li>
                    </ul>
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
                    Sécurité des Données
                  </button>
                </h2>
                <div
                  id="collapseFour"
                  className="accordion-collapse collapse"
                  aria-labelledby="headingFour"
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body">
                    <p>
                      Nous mettons en œuvre des mesures de sécurité robustes
                      pour protéger vos données contre tout accès non autorisé,
                      toute altération, divulgation ou destruction. Vos
                      informations de paiement sont traitées de manière
                      sécurisée et ne sont jamais stockées sur nos serveurs.
                    </p>
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
                    Vos Droits
                  </button>
                </h2>
                <div
                  id="collapseFive"
                  className="accordion-collapse collapse"
                  aria-labelledby="headingFive"
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body">
                    <p>Vous disposez des droits suivants :</p>
                    <ul>
                      <li>Accéder à vos informations personnelles</li>
                      <li>
                        Demander la rectification de données incorrectes ou
                        incomplètes
                      </li>
                      <li>Demander la suppression de vos données</li>
                      <li>
                        Vous opposer au traitement de vos données à des fins de
                        marketing
                      </li>
                    </ul>
                    <p>
                      Pour exercer vos droits ou poser des questions sur notre
                      politique de confidentialité, n’hésitez pas à nous
                      contacter à{" "}
                      <a href="mailto:contact@thetiptop.com">
                        contact@thetiptop.com
                      </a>
                      .
                    </p>
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
                    Cookies
                  </button>
                </h2>
                <div
                  id="collapseSix"
                  className="accordion-collapse collapse"
                  aria-labelledby="headingSix"
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body">
                    <p>
                      Notre site utilise des cookies pour améliorer votre
                      expérience en ligne. Ces cookies nous aident à comprendre
                      vos préférences et à vous proposer un contenu adapté. En
                      continuant à naviguer sur notre site, vous acceptez
                      l’utilisation de cookies conformément à notre{" "}
                      <a href="/politique-de-cookies">Politique de Cookies</a>.
                    </p>
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
                    Modification de la Politique de Confidentialité
                  </button>
                </h2>
                <div
                  id="collapseSeven"
                  className="accordion-collapse collapse"
                  aria-labelledby="headingSeven"
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body">
                    <p>
                      Thé Tip Top se réserve le droit de modifier cette
                      politique de confidentialité à tout moment. Nous vous
                      encourageons à consulter régulièrement cette page pour
                      être informé de tout changement.
                    </p>
                  </div>
                </div>
              </div>

              <div className="accordion-item">
                <h2 className="accordion-header" id="headingEight">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseEight"
                    aria-expanded="false"
                    aria-controls="collapseEight"
                  >
                    Contact
                  </button>
                </h2>
                <div
                  id="collapseEight"
                  className="accordion-collapse collapse"
                  aria-labelledby="headingEight"
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body">
                    <p>
                      Si vous avez des questions ou des préoccupations
                      concernant notre politique de confidentialité, veuillez
                      nous contacter à :
                    </p>
                    <p>
                      Email :{" "}
                      <a href="mailto:contact@thetiptop.com">
                        contact@thetiptop.com
                      </a>
                    </p>
                    <p>
                      Merci pour votre confiance et votre fidélité. Bonne
                      dégustation avec Thé Tip Top !
                    </p>
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

export default PolitiqueConf;
