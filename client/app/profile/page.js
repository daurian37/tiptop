import "./styles.css";
import Nav from "./Nav";


const Page = () => {
  return (
    <div className="page-container">
      <h1 className="about_taital mb-4">Profile utilisateur</h1>
      <div className="bulit_icon mb-4">
        <img src="assets/images/bulit-icon.png" />
      </div>
      <Nav />
    </div>
  );
};

export default Page;
