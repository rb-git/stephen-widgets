import React, { useState, useEffect, useRef } from "react";

const Dropdown = ({ label, options, selected, onSelectedChange }) => {
  //to track if dropdown is open
  const [open, setOpen] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const onBodyClick = (event) => {
      //if a sub item is clicked do not trigger setOpen
      if (ref.current && ref.current.contains(event.target)) {
        return;
      }
      //console.log(event.target);
      //console.log("BODY CLICKED");
      setOpen(false);
    };

    document.body.addEventListener("click", onBodyClick, { capture: true });

    return () => {
      document.body.removeEventListener("click", onBodyClick);
    };
  }, []);

  const renderedOptions = options.map((option) => {
    //do not show selected value twice on sceen [on top and in list]
    if (option.value === selected.value) {
      return null; //null return will cause no render
    }

    return (
      <div
        key={option.value}
        className="item"
        onClick={() => {
          //console.log("ITEM CLICKED");
          onSelectedChange(option);
        }}
      >
        {option.label}
      </div>
    );
  });

  //console.log(ref.current);

  return (
    /**this is how to use the ref hook**/
    <div ref={ref} className="ui form">
      <div className="field">
        <label className="label">{label}</label>
        <div
          onClick={() => {
            //console.log("DROPDOWN CLICKED");
            setOpen(!open);
          }}
          className={`ui selection dropdown ${open ? "visible active" : ""}`}
        >
          <i className="dropdown icon"></i>
          <div className="text">{selected.label}</div>
          <div className={`menu ${open ? "visible transition" : ""}`}>
            {renderedOptions}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
