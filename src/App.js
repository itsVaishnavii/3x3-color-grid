import React, { useState } from "react";
import "./App.css";

const Matrix = () => {
  const gridSize = 3; // 3x3 grid
  const [grid, setGrid] = useState(
    Array(gridSize * gridSize).fill("white") // Initial color: white
  );
  const [clickOrder, setClickOrder] = useState([]); // Store click order

  const handleClick = (index) => {
    if (grid[index] === "white") {
      setGrid((prevGrid) => {
        const newGrid = [...prevGrid];
        newGrid[index] = "green";
        return newGrid;
      });

      setClickOrder((prevOrder) => {
        const newOrder = [...prevOrder, index];
        
        // If it's the last box clicked, start orange color sequence
        if (newOrder.length === gridSize * gridSize) {
          setTimeout(() => changeToOrange(0, newOrder), 500);
        }
        return newOrder;
      });
    }
  };

  const changeToOrange = (i, order) => {
    if (i < order.length) {
      setTimeout(() => {
        setGrid((prevGrid) => {
          const newGrid = [...prevGrid];
          newGrid[order[i]] = "orange";
          return newGrid;
        });
        changeToOrange(i + 1, order);
      }, 500); // Delay for sequence effect
    }
  };

  return (
    <div className="matrix">
      {grid.map((color, index) => (
        <div
          key={index}
          className="box"
          style={{ backgroundColor: color }}
          onClick={() => handleClick(index)}
        ></div>
      ))}
    </div>
  );
};

export default function App() {
  return (
    <div className="App">
      <h1>Color Changing Matrix</h1>
      <Matrix />
    </div>
  );
}
