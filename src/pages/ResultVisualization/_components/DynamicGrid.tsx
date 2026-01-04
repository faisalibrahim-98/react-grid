import React, { useMemo } from "react";
import {
  formatValue1,
  getColorForValue,
  parseKelvin,
  parseTemperature,
} from "../../../utils/formating";
import { GridCell } from "./GridCell";
import { DataPoint, Iteration } from "../types";

type DynamicGridProps = {
  data: Iteration | null;
  cellSize: number;
  dataType: string;
  onCellClick: (coordinates: { row: number; col: number }) => void;
  selectedCell?: { row: number; col: number };
};

export const DynamicGrid = React.memo(
  ({
    data,
    cellSize,
    dataType,
    onCellClick,
    selectedCell,
  }: DynamicGridProps) => {
    const gridData = useMemo(() => {
      try {
        if (!data) return [];

        const rawData = data.values;
        const flatValues = rawData.flat();

        // Calculate min/max for color scaling
        const numericValues: number[] = [];
        flatValues.filter((val: number | DataPoint) => {
          if (typeof val !== "number") {
            if (dataType === "temperature") {
              return numericValues.push(parseTemperature(val.temperature));
            } else if (dataType === "kelvin") {
              return numericValues.push(parseKelvin(val.kelvin));
            } else {
              return numericValues.push(parseFloat(val.pressure.toString()));
            }
          }
        });

        console.log("Numeric values:", numericValues);

        const min = Math.min(...numericValues);
        const max = Math.max(...numericValues);

        return rawData.map((row, rowIndex) =>
          row.map((_, colIndex) => {
            const numericValue =
              numericValues[rowIndex * row.length + colIndex];
            const color = getColorForValue(numericValue, min, max, dataType);
            const displayValue = formatValue1(numericValue, dataType);

            return {
              value: displayValue,
              color,
              coordinates: { row: rowIndex, col: colIndex },
              numericValue,
            };
          })
        );
      } catch (error) {
        console.error("Error processing grid data:", error);
        return [];
      }
    }, [data, dataType]);

    if (!gridData.length) {
      return (
        <div className="flex items-center justify-center h-64 bg-gray-100 rounded-lg">
          <p className="text-gray-500">No data available</p>
        </div>
      );
    }

    return (
      <div
        className="grid gap-1 p-4 bg-white rounded-lg shadow-sm border"
        style={{
          gridTemplateColumns: `repeat(${gridData[0]?.length || 1}, 1fr)`,
          maxWidth: `${(gridData[0]?.length || 1) * (cellSize + 4)}px`,
        }}
      >
        {gridData.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <GridCell
              key={`${rowIndex}-${colIndex}`}
              value={cell.value}
              color={cell.color}
              cellSize={cellSize}
              onClick={onCellClick}
              isSelected={
                selectedCell?.row === rowIndex && selectedCell?.col === colIndex
              }
              coordinates={cell.coordinates}
            />
          ))
        )}
      </div>
    );
  }
);
