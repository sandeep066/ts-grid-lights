// useBoxLogic.js
import { useState, useEffect } from "react";
import { BoxItem } from "../interfaces/interfaces";
export const useBoxLogic = (initialBoxes: BoxItem[]) => {
  const [boxes, setBoxes] = useState(initialBoxes);

  useEffect(() => {
    const greenCount = boxes.filter((box) => box?.isGreen).length;

    if (greenCount === 7) {
      console.log("7 green numbers reached!");

      const clickedBoxesReversed = boxes
        .filter((box) => box.isGreen)
        .sort((a, b) => b.clickOrder - a.clickOrder);

      clickedBoxesReversed.forEach((box, index) => {
        if (box.isGreen) {
          setTimeout(() => {
            setBoxes((prevBoxes: BoxItem[]) =>
              prevBoxes.map((prevBox: BoxItem) =>
                prevBox.id === box.id ? { ...prevBox, isGreen: false } : prevBox
              )
            );
          }, index * 1000);
        }
      });
    }
  }, [boxes]);

  return { boxes, setBoxes };
};
