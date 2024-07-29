import React from "react";
import "../../../public/assets/css/politiqueConf.css";

const PolitiqueConf = () => {
  return (
      <div className="contact_section layout_padding">
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <h1 className="contact_taital">
                {" "}
                Politique de Confidentialité de Thé Tip Top{" "}
              </h1>
              <div className="bulit_icon mb-4">
                <img src="assets/images/bulit-icon.png" />
              </div>
              <h2>
                Bonjour et bienvenue chez Thé Tip Top !
              </h2>
              <p>
              Nous sommes ravis de vous avoir parmi nous, que vous soyez passionné de thé, professionnel du secteur, VDI (Vendeur à Domicile Indépendant) ou franchisé. Nous prenons la protection de vos données personnelles très au sérieux.
              </p>
              
              <h2>Collecte des Informations</h2>
              <p>
                Nous recueillons diverses informations vous concernant lorsque vous utilisez notre site, passez une commande, vous inscrivez à notre newsletter ou interagissez avec nos services. Cela peut inclure :
              </p>
              <ul>
                <li>Vos coordonnées (nom, adresse, email, téléphone)</li>
                <li>Vos informations de paiement</li>
                <li>Vos préférences de navigation et historiques d’achat</li>
              </ul>

              <h2>Utilisation des Informations</h2>
              <p>
                Les informations collectées sont utilisées pour :
              </p>
              <ul>
                <li>Traiter et expédier vos commandes</li>
                <li>Améliorer votre expérience sur notre site</li>
                <li>Vous tenir informé des nouveautés, offres spéciales et actualités de Thé Tip Top</li>
                <li>Faciliter la gestion de nos relations avec les VDI et les franchisés</li>
              </ul>

              <h2>Partage des Informations</h2>
              <p>
                Nous ne partageons vos informations personnelles qu'avec des tiers de confiance, et uniquement dans les cas suivants :
              </p>
              <ul>
                <li>Pour le traitement des paiements et la livraison de vos commandes</li>
                <li>Avec nos partenaires commerciaux pour la gestion des relations VDI et franchisés</li>
                <li>Si requis par la loi</li>
              </ul>

              <h2>Sécurité des Données</h2>
              <p>
                Nous mettons en œuvre des mesures de sécurité robustes pour protéger vos données contre tout accès non autorisé, toute altération, divulgation ou destruction. Vos informations de paiement sont traitées de manière sécurisée et ne sont jamais stockées sur nos serveurs.
              </p>

              <h2>Vos Droits</h2>
              <p>
                Vous disposez des droits suivants :
              </p>
              <ul>
                <li>Accéder à vos informations personnelles</li>
                <li>Demander la rectification de données incorrectes ou incomplètes</li>
                <li>Demander la suppression de vos données</li>
                <li>Vous opposer au traitement de vos données à des fins de marketing</li>
              </ul>
              <p>
                Pour exercer vos droits ou poser des questions sur notre politique de confidentialité, n’hésitez pas à nous contacter à <a href="mailto:contact@thetiptop.com">contact@thetiptop.com</a>.
              </p>

              <h2>Cookies</h2>
              <p>
                Notre site utilise des cookies pour améliorer votre expérience en ligne. Ces cookies nous aident à comprendre vos préférences et à vous proposer un contenu adapté. En continuant à naviguer sur notre site, vous acceptez l’utilisation de cookies conformément à notre <a href="/politique-de-cookies">Politique de Cookies</a>.
              </p>

              <h2>Modification de la Politique de Confidentialité</h2>
              <p>
                Thé Tip Top se réserve le droit de modifier cette politique de confidentialité à tout moment. Nous vous encourageons à consulter régulièrement cette page pour être informé de tout changement.
              </p>

              <h2>Contact</h2>
              <p>
                Si vous avez des questions ou des préoccupations concernant notre politique de confidentialité, veuillez nous contacter à :
              </p>
              <p>
                Email : <a href="mailto:contact@thetiptop.com">contact@thetiptop.com</a>
              </p>
              <p>
                Merci pour votre confiance et votre fidélité. Bonne dégustation avec Thé Tip Top !
              </p>
            </div>
          </div>
        </div>
      </div>
  );
};

export default PolitiqueConf;
