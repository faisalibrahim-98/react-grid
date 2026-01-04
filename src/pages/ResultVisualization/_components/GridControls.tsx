import React from "react";

type GridControlsProps = {
  dataType: string;
  onDataTypeChange: (value: string) => void;
  cellSize: number;
  onCellSizeChange: (value: number) => void;
  isAnimating: boolean;
  onAnimationToggle: () => void;
  onReset: () => void;
  currentStep: number;
  totalSteps: number;
};

export const GridControls = React.memo(
  ({
    dataType,
    onDataTypeChange,
    cellSize,
    onCellSizeChange,
    isAnimating,
    onAnimationToggle,
    onReset,
    currentStep,
    totalSteps,
  }: GridControlsProps) => {
    return (
      <div className="bg-white p-4 rounded-lg shadow-sm border space-y-4">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <label className="text-sm text-black">Data Type:</label>
            <select
              value={dataType}
              onChange={(e) => onDataTypeChange(e.target.value)}
              className="px-3 py-1 border border-black rounded-md text-sm text-black"
            >
              <option className="text-black" value="temperature">
                Temperature
              </option>
              <option className="text-black" value="pressure">
                Pressure
              </option>
              <option className="text-black" value="kelvin">
                Kelvin
              </option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-sm font-medium">Cell Size:</label>
            <input
              type="range"
              min="30"
              max="80"
              value={cellSize}
              onChange={(e) => onCellSizeChange(Number(e.target.value))}
              className="w-24"
            />
            <span className="text-sm text-gray-600">{cellSize}px</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onAnimationToggle}
              className="flex items-center gap-1 px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
            >
              {isAnimating ? "Pause" : "Play"}
            </button>

            <button
              onClick={onReset}
              className="flex items-center gap-1 px-3 py-1 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
            >
              Reset
            </button>
          </div>
        </div>

        <div className="text-sm text-gray-600">
          Step: {currentStep + 1} / {totalSteps}
        </div>
      </div>
    );
  }
);
