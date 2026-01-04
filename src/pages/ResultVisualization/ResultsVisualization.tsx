import { useCallback, useEffect, useState } from "react";
import "./ResultsVisualization.css";
import { DynamicGrid } from "./_components/DynamicGrid";
import { ErrorBoundary } from "../../ErrorBoundry";
import { GridControls } from "./_components/GridControls";
import { Iteration } from "./types";

const ResultsVisualization: React.FC = () => {
  // Move API calls into a seperate file with proper eror handling.

  // Fetch initial grid data from API
  useEffect(() => {
    const fetchGridData = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/iterations");

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const { iterations } = (await response.json()) as {
          iterations: Iteration[];
        };
        setDatasets(iterations);
        setCurrentDataset(iterations[0] || null);
      } catch (error) {
        console.error("Error fetching grid data:", error);
      }
    };

    fetchGridData();
  }, []);

  // State management
  const [datasets, setDatasets] = useState<Iteration[] | null>(null);
  const [currentDataset, setCurrentDataset] = useState<Iteration | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [dataType, setDataType] = useState("temperature");
  const [cellSize, setCellSize] = useState(60);
  const [isAnimating, setIsAnimating] = useState(false);
  const [error] = useState<string | null>(null);

  // Current dataset
  const totalSteps = datasets?.length || 1;

  // Event handlers

  const handleDataTypeChange = useCallback((newType: string) => {
    setDataType(newType);
  }, []);

  const handleAnimationToggle = useCallback(() => {
    setIsAnimating((prev) => !prev);
  }, []);

  const handleReset = useCallback(() => {
    setCurrentStep(0);
    setIsAnimating(false);
  }, []);

  const handleCellSizeChange = useCallback((newSize: number) => {
    setCellSize(newSize);
  }, []);

  const handleCellClick = useCallback(() => {}, []);

  // Get current cell data for info panel
  // const selectedCellData = useMemo(() => {
  //   if (!selectedCell) return null;

  //   const row = currentDataset?.values[dataType][selectedCell.row];
  //   if (!row) return null;

  //   const value = row[selectedCell.col];
  //   if (value === undefined) return null;

  //   return {
  //     value: formatValue1(value, dataType),
  //     numericValue:
  //       typeof value === "number"
  //         ? value
  //         : dataType === "temperature"
  //         ? parseTemperature(value)
  //         : dataType === "kelvin"
  //         ? parseKelvin(value)
  //         : parseFloat(value),
  //   };
  // }, [selectedCell, currentDataset, dataType]);

  if (error) {
    return (
      <div className="p-4 bg-red-100 border border-red-400 rounded-lg">
        <h3 className="text-red-800 font-semibold">Error</h3>
        <p className="text-red-600 text-sm mt-2">{error}</p>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className="bg-gray-50 w-[100vw] h-[100vh] p-4">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Dynamic 2D Grid Visualization
          </h1>
        </div>

        <GridControls
          dataType={dataType}
          onDataTypeChange={handleDataTypeChange}
          cellSize={cellSize}
          onCellSizeChange={handleCellSizeChange}
          isAnimating={isAnimating}
          onAnimationToggle={handleAnimationToggle}
          onReset={handleReset}
          currentStep={currentStep}
          totalSteps={totalSteps}
        />

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <DynamicGrid
              data={currentDataset}
              cellSize={cellSize}
              dataType={dataType}
              onCellClick={handleCellClick}
            />
          </div>

          <div className="space-y-4">
            {/* <InfoPanel
              selectedCell={selectedCell}
              cellData={selectedCellData}
            /> */}

            <div className="bg-white p-4 rounded-lg shadow-sm border">
              <h3 className="font-semibold text-gray-800 mb-2">Legend</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-blue-500 rounded"></div>
                  <span>Cold/Low values</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-red-500 rounded"></div>
                  <span>Hot/High values</span>
                </div>
                <p className="text-gray-600 mt-2">
                  Click on any cell to see detailed information
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default ResultsVisualization;
