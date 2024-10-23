import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import GithubUserSearch from "./components/GithubUserSearch";
function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const toggleColor = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };
  return (
    <>
      <div>
        <GithubUserSearch isDarkMode={isDarkMode} toggleColor={toggleColor} />
      </div>
    </>
  );
}

export default App;
