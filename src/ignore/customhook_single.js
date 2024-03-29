//"classnames": "2.5.1"
import React, { useState, useEffect } from "react";
import classNames from "classnames";
import "./styles.css";

// Initial grids setup
const initialGrids = Array.from({ length: 9 }, (_, index) => ({
  id: index,
  isGreen: false,
  isVisible: index === 4 || index === 5,
  order: 0,
}));

// Custom hook for grids logic
function useGrids(initial) {
  const [grids, setGrids] = useState(initial);

  useEffect(() => {
    const greenGrids = grids.filter((grid) => grid.isGreen);
    if (greenGrids.length === 7) {
      greenGrids
        .sort((a, b) => b.order - a.order)
        .forEach((grid, index) => {
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

  return [grids, handleClick];
}

function getGridItemClass(grid) {
  return classNames({
    "grid-item": true,
    hide: grid.isVisible,
    green: grid.isGreen,
  });
}

const GridLights = () => {
  const [grids, handleClick] = useGrids(initialGrids);

  return (
    <div className="grid-container">
      {grids.map((grid, index) => {
        return (
          <span
            key={index}
            className={getGridItemClass(grid)}
            onClick={() => handleClick(grid.id)}
          >
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
