import React from "react";
import ReactDOM from "react-dom";

function App() {
  return (
    <div>
      <h1>
        POW finder
      </h1>
      <ul>
        <li>Ikon pass</li>
      </ul>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
