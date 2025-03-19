import { lazy, Suspense, useState } from "react";
import "./App.css";
const Data = lazy(() => import("./components/Data"));

function App() {
  const [toggle, setToggle] = useState(false);

  return (
    <>
      <h1>Lazy Loading</h1>
      <button onClick={() => setToggle(true)}>Click me</button>
      {toggle ? (
        <Suspense fallback={<h3>Loading...</h3>}>
          <Data />
        </Suspense>
      ) : null}
    </>
  );
}

export default App;
