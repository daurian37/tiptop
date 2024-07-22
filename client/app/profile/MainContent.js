import React from "react";
import Dashboard from "./Dashboard";
import Orders from "./Orders";
import AccountDetails from "./AccountDetails";
import Logout from "./Logout";

const MainContent = ({ currentSection }) => {
  const renderSection = () => {
    switch (currentSection) {
      case "dashboard":
        return <Dashboard />;
      case "orders":
        return <Orders />;
      case "accountDetails":
        return <AccountDetails />;
      case "logout":
        return <Logout />;
      default:
        return <Dashboard />;
    }
  };

  return <main className="main-content flex-grow-1">{renderSection()}</main>;
};

export default MainContent;
