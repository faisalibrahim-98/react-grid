import React from "react";

type InfoPanelProps = {
  selectedCell?: { row: number; col: number };
  cellData?: { value: string; numericValue?: number };
};

export const InfoPanel: React.FC<InfoPanelProps> = React.memo(
  ({ selectedCell, cellData }) => {
    if (!selectedCell || !cellData) return null;

    return (
      <div className="bg-white p-4 rounded-lg shadow-sm border">
        <h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
          Cell Information
        </h3>
        <div className="space-y-2 text-sm">
          <div>
            <strong>Position:</strong> ({selectedCell.row}, {selectedCell.col})
          </div>
          <div>
            <strong>Value:</strong> {cellData.value}
          </div>
          {cellData.numericValue && (
            <div>
              <strong>Numeric Value:</strong> {cellData.numericValue.toFixed(2)}
            </div>
          )}
        </div>
      </div>
    );
  }
);
