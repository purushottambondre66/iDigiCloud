import { LayoutContext } from "./context/LayoutContext";
import { menuItems } from "./constants/menuItems";
import { useState } from "react";
import { Application } from "./components/Application";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [language, setLanguage] = useState("en");
  return (
    <LayoutContext.Provider
      value={{ menuItems, isLoggedIn, setIsLoggedIn, language, setLanguage }}
    >
      <Application />
    </LayoutContext.Provider>
  );
};

export default App;
