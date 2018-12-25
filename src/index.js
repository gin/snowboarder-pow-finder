import React from "react";
import ReactDOM from "react-dom";
//import { unstable_createResource as createResource } from "react-cache";

function ResortListItem({className, component: Component = "li", ...props}) {
  return (
    <Component
      className={["resort-list-item", className].join(" ")}
      {...props}
    />
  );
}

//function ResortList(props) {
//  return (
//    <div>
//    <li {...props} >resort</li>
//    <li>1</li>
//  </div>
//  );
//}

let resortData = [
  { name: "Mammoth", zipcode: 93546, state: "CA" },
  { name: "Squaw Valley", zipcode: 96146, state: "CA" },
  { name: "Alpine Meadows", zipcode: 96146, state: "CA" },
  { name: "Jackson Hole", zipcode: 83025, state: "WY" },
  { name: "Big Sky", zipcode: 59716, state: "MT" },
  { name: "Snowbird", zipcode: 84092, state: "UT" },
];

function App() {
  return (
    <div>
      <h1>POW finder</h1>
      <h2>Pass</h2>
      <ul>
        <li>Ikon</li>
        <li>Mountain Collective</li>
      </ul>
      <h2>Resort</h2>
      <ul>
        {resortData.map(resort => (
          <ResortListItem key={resort.name} className="resort">
            {resort.name}, {resort.state}
          </ResortListItem>
        ))}
      </ul>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
