import "./styles.css";
import React, { useState, useEffect } from "react";
const initialgrids = Array.from({ length: 9 }, (_, index) => ({
  id: index,
  isGreen: false,
  isVisible: index !== 4 && index !== 5,
  clickedOrder: 0,
}));

const Gridlight = () => {
  const [grids, setGrids] = useState(initialgrids);

  useEffect(() => {
    if (grids.filter((grid) => grid.isGreen).length === 7) {
      const clickedGridsReversed = grids
        .filter((grid) => grid.isGreen)
        .sort((a, b) => b.clickedOrder - a.clickedOrder);

      clickedGridsReversed.forEach((grid, index) => {
        setTimeout(() => {
          setGrids((prevGrids) =>
            prevGrids.map((prevGrid) =>
              prevGrid.id === grid.id
                ? { ...prevGrid, isGreen: false }
                : prevGrid
            )
          );
        }, index * 1000);
      });
    }
  }, [grids]);

  const handleClick = (index: number) => {
    const newGrids = [...grids];
    newGrids[index] = {
      ...newGrids[index],
      isGreen: true,
      clickedOrder: Date.now(),
    };

    console.log(newGrids[index]);
    setGrids(newGrids);
  };
  return (
    <>
      <h1>Hello Gridlight</h1>
      <div className="grid-container">
        {grids.map((grid) => {
          return (
            <span
              key={grid.id}
              className={`grid-item ${
                grid.id === 4 || grid.id === 5 ? "hide" : null
              } ${grid.isGreen ? "green" : ""}`}
              onClick={() => handleClick(grid.id)}
            >
              {grid.id}
            </span>
          );
        })}
      </div>
    </>
  );
};
export default function App() {
  return (
    <div className="App">
      <Gridlight />
    </div>
  );
}
