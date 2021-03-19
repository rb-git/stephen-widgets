import React, { useState } from "react";

const Accordion = ({ items }) => {
  //state setting in function components
  //null is only initial value
  const [activeIndex, setActiveIndex] = useState(null);

  //helper function - check how it is invoked as an arrow function
  const onTitleClick = (index) => {
    //component will rerender after this
    setActiveIndex(index);
  };

  //Note: index is available when using map
  const renderedItems = items.map((item, index) => {
    //for styling accordion
    const active = index === activeIndex ? "active" : "";

    return (
      <React.Fragment key={item.title}>
        <div className={`title ${active}`} onClick={() => onTitleClick(index)}>
          <i className="dropdown icon"></i>
          {item.title}
        </div>
        <div className={`content ${active}`}>
          <p>{item.content}</p>
        </div>
      </React.Fragment>
    );
  });

  return <div className="ui styled accordion">{renderedItems}</div>;
};

export default Accordion;
