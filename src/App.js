import React, { useState } from "react";
import Accordion from "./components/Accordion";
import Search from "./components/Search";
import Dropdown from "./components/Dropdown";
import Translate from "./components/Translate";

const App = () => {
  //For Accordion
  const items = [
    {
      title: 'What is React?"',
      content: "React is a frontend JS framework",
    },
    {
      title: "How does React work?",
      content: "React uses components, props and state",
    },
    {
      title: "What is advanced React?",
      content: "Hooks, Redux and Router",
    },
  ];

  //For Dropdown
  const options = [
    { label: "Red Color", value: "red" },
    { label: "Blue Color", value: "blue" },
    { label: "Green Color", value: "green" },
  ];

  //state control for dropdown
  const [selected, setSelected] = useState(options[0]);
  //use to show why eventhandler needed to be cleaned up
  // const [showDropdown, setShowDropdown] = useState(true);

  //<Accordion items={items} />
  //<Search />;

  return <Translate />;

  /** restore full return method for dropdown 
  return (
    <div>
      
      <button onClick={() => setShowDropdown(!showDropdown)}>
        Toggle Dropdown
      </button>
      {showDropdown ? (
        <Dropdown
          selected={selected}
          onSelectedChange={setSelected}
          options={options}
        />
      ) : null}
    </div>
  );
*/
};

export default App;
