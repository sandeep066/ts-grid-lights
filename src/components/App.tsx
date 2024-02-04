import React from "react";
import "./App.css";
import Box from "./Box";
import { useBoxLogic } from "../hooks/useBoxLogic";
import { BoxItem } from "../interfaces/interfaces";

const initialBoxes: BoxItem[] = Array.from({ length: 9 }, (_, index) => ({
  id: (index + 1).toString(),
  isVisible: index !== 4 && index !== 5, // Hiding 5th and 6th boxes
  isGreen: false,
  clickOrder: 0,
}));

const App: React.FC = () => {
  const { boxes, setBoxes } = useBoxLogic(initialBoxes);

  const handleClick = (id: string) => {
    setBoxes((prevBoxes: BoxItem[]) =>
      prevBoxes.map((prevBox: BoxItem) =>
        prevBox.id === id && prevBox.isGreen !== true
          ? { ...prevBox, isGreen: true, clickOrder: Date.now() }
          : prevBox
      )
    );
  };

  return (
    <div className="box-container">
      {boxes.map((box: BoxItem) => (
        <Box
          key={box.id}
          id={box.id}
          isGreen={box.isGreen}
          onClick={() => handleClick(box.id)}
          isVisible={box.isVisible}
        />
      ))}
    </div>
  );
};

export default App;
