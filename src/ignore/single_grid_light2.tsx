import "./styles.css";
import React, { useState, useEffect } from "react";
import classNames from "classnames";

const initialGrids = Array.from({ length: 9 }, (_, index) => ({
  id: index,
  isGreen: false,
  isVisible: index === 4 || index === 5,
  order: 0,
}));

const GridLights = () => {
  const [grids, setGrids] = useState(initialGrids);

  useEffect(() => {
    if (grids.filter((grid) => grid.isGreen).length === 7) {
      const descGreenGrids = grids
        .filter((grid) => grid.isGreen)
        .sort((a, b) => b.order - a.order);

      descGreenGrids.forEach((grid, index) => {
        setTimeout(() => {
          setGrids((currentGrids) => {
            const newGrids = [...currentGrids];
            newGrids[grid.id] = {
              ...newGrids[grid.id],
              isGreen: false,
              order: 0,
            };
            return newGrids;
          });
        }, (index + 1) * 1000);
      });
    }
  }, [grids]);

  const handleClick = (id) => {
    setGrids((currentGrids) => {
      const newGrids = [...currentGrids];
      newGrids[id] = { ...newGrids[id], isGreen: true, order: Date.now() };
      return newGrids;
    });
  };

  return (
    <div className="grid-container">
      {grids.map((grid, index) => {
        const gridItemClass = classNames({
          "grid-item": true,
          hide: grid.id === 4 || grid.id === 5,
          green: grid.isGreen,
        });
        return (
          <span className={gridItemClass} onClick={() => handleClick(grid.id)}>
            {index}
          </span>
        );
      })}
    </div>
  );
};
export default function App() {
  return (
    <div className="App">
      <GridLights />
    </div>
  );
}
