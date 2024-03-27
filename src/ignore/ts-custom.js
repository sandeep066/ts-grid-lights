import React, { useState, useEffect } from "react";
import classNames from "classnames";
import "./styles.css";

// Defining the type for a single grid item
interface GridItem {
  id: number;
  isGreen: boolean;
  isVisible: boolean;
  order: number;
}

// Initial grids setup with a detailed type
const initialGrids: GridItem[] = Array.from({ length: 9 }, (_, index) => ({
  id: index,
  isGreen: false,
  isVisible: index === 4 || index === 5,
  order: 0,
}));

// Custom hook for grids logic with a detailed type
function useGrids(initial: GridItem[]): [GridItem[], (id: number) => void] {
  const [grids, setGrids] = useState<GridItem[]>(initial);

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

  const handleClick = (id: number): void => {
    setGrids((currentGrids) => {
      const newGrids = [...currentGrids];
      newGrids[id] = { ...newGrids[id], isGreen: true, order: Date.now() };
      return newGrids;
    });
  };

  return [grids, handleClick];
}

// Define a function to get the CSS class names with a type for the parameter
function getGridItemClass(grid: GridItem): string {
  return classNames({
    "grid-item": true,
    hide: !grid.isVisible,
    green: grid.isGreen,
  });
}

const GridLights: React.FC = () => {
  const [grids, handleClick] = useGrids(initialGrids);

  return (
    <div className="grid-container">
      {grids.map((grid, index) => (
        <span
          key={index}
          className={getGridItemClass(grid)}
          onClick={() => handleClick(grid.id)}
        >
          {index}
        </span>
      ))}
    </div>
  );
};

export default function App(): JSX.Element {
  return (
    <div className="App">
      <GridLights />
    </div>
  );
}
