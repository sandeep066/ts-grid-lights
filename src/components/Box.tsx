// Box.js
import React from "react";

interface BoxProps {
  id: string;
  isGreen: boolean;
  onClick: () => void;
  isVisible: boolean;
}

const Box: React.FC<BoxProps> = ({ id, isGreen, onClick, isVisible }) => (
  <div
    className={`box ${isGreen ? "green" : ""} ${isVisible ? "" : "hide"}`}
    onClick={onClick}
  >
    {id}
  </div>
);

export default Box;
