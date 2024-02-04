import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [boxes, setBoxes] = useState([
    { id: "1", isBox: true, isVisible: true, isGreen: false, clickOrder: 0 },
    { id: "2", isBox: true, isVisible: true, isGreen: false, clickOrder: 0 },
    { id: "3", isBox: true, isVisible: true, isGreen: false, clickOrder: 0 },
    { id: "4", isBox: true, isVisible: true, isGreen: false, clickOrder: 0 },
    { id: "5", isBox: true, isVisible: true, isGreen: false, clickOrder: 0 },
    { id: "6", isBox: true, isVisible: true, isGreen: false, clickOrder: 0 },
    { id: "7", isBox: true, isVisible: true, isGreen: false, clickOrder: 0 },
    { id: "8", isBox: true, isVisible: true, isGreen: false, clickOrder: 0 },
    { id: "9", isBox: true, isVisible: true, isGreen: false, clickOrder: 0 },
  ]);

  useEffect(() => {
    if (boxes.filter((box) => box.isGreen).length === 7) {
      //alert("useffect 7");

      const clickedBoxesReversed = boxes
        .filter((box) => box.isGreen)
        .sort((a, b) => b.clickOrder - a.clickOrder);

      // console.log(Array.isArray(clickedBoxesReversed)); //

      // for (let clicked of clickedBoxesReversed) {
      //   // alert(`clicked: ${clicked}`);
      //   alert(`clickOrder: ${clicked.clickOrder}`);
      //   // for (let key in clicked) {
      //   //   alert(`Key: ${key}, Value: ${(clicked as any)[key]}`);
      //   // }
      // }

      // Iterate over each green box
      clickedBoxesReversed.forEach((box, index) => {
        if (box.isGreen) {
          setTimeout(() => {
            setBoxes((prevBoxes) =>
              prevBoxes.map((prevBox) =>
                prevBox.id === box.id ? { ...prevBox, isGreen: false } : prevBox
              )
            );
          }, index * 1000); // Delay each iteration by 1 second
        }
      });
    }
  }, [boxes]);

  const handleClick = (id: string) => {
    setBoxes((prevBoxes) => {
      return prevBoxes.map((prevBox) => {
        return prevBox.id === id
          ? (() => {
              //setClickedOrder([...clickedOrder, id]);
              return { ...prevBox, isGreen: true, clickOrder: Date.now() };
            })()
          : prevBox;
      });
    });
  };

  /*const handleClick = (id: string) => {
    setBoxes((prevBoxes) =>
      prevBoxes.map((prevBox) =>
        prevBox.id === id
          ? (() => {
              setClickedOrder([...clickedOrder, id]);
              return { ...prevBox, isGreen: true };
            })()
          : prevBox
      )
    );
  };*/

  /* function handleClick(id) {
    const newBoxes = boxes.map((box) =>
      box.id === id ? { ...box, isGreen: true } : box
    );
    setBoxes(newBoxes);
    setClickedOrder([...clickedOrder, id]);
  }*/

  /* implicit return
  const handleClick = (id: string) => {
    setBoxes((prevBoxes) =>
      prevBoxes.map((prevBox) =>
        prevBox.id === id ? { ...prevBox, isGreen: true } : prevBox
      )
    );
  }*/

  return (
    <div className="box-container">
      {boxes.map((box) => {
        return (
          <div
            id={box.id}
            className={`box ${
              box.id === "5" || box.id === "6" ? "hide" : null
            } ${box?.isGreen ? "green" : null}`}
            onClick={() => handleClick(box.id)}
          >
            1
          </div>
        );
      })}
    </div>
  );
}

export default App;
