import React, { useCallback } from "react";

type GridCellProps = {
  value: number | string;
  color: string;
  cellSize: number;
  onClick?: (
    coordinates: { row: number; col: number },
    value: number | string
  ) => void;
  isSelected?: boolean;
  coordinates: { row: number; col: number };
};

export const GridCell = React.memo(
  ({
    value,
    color,
    cellSize,
    onClick,
    isSelected,
    coordinates,
  }: GridCellProps) => {
    const handleClick = useCallback(() => {
      onClick?.(coordinates, value);
    }, [onClick, coordinates, value]);

    return (
      <div
        className={`
        border border-gray-300 flex items-center justify-center text-xs font-medium
        transition-all duration-200 cursor-pointer hover:scale-105 hover:z-10 relative
        ${isSelected ? "ring-2 ring-blue-500 ring-offset-1" : ""}
      `}
        style={{
          backgroundColor: color,
          width: `${cellSize}px`,
          height: `${cellSize}px`,
          color: "#fff",
          textShadow: "1px 1px 1px rgba(0,0,0,0.7)",
        }}
        onClick={handleClick}
        title={`Position: (${coordinates.row}, ${coordinates.col})\nValue: ${value}`}
      >
        {value}
      </div>
    );
  }
);
