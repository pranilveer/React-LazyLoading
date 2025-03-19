import { lazy, Suspense, useState } from "react";
import "./App.css";
const Data = lazy(() => import("./components/Data"));

function App() {
  const [toggle, setToggle] = useState(false);

  const handleToggle = () => {
    setToggle((prev) => !prev);
  };

  return (
    <div className="app-container">
      <h1>Lazy Loading</h1>
      <button onClick={handleToggle}>
        {toggle ? "Hide Data" : "Show Data"}
      </button>
      {toggle ? (
        <Suspense fallback={<h3>Loading...</h3>}>
          <Data />
        </Suspense>
      ) : (
        <p>Click the button to load the data!</p>
      )}
    </div>
  );
}

export default App;