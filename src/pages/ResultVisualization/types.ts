export interface DataPoint {
  temperature: string;
  pressure: number;
  kelvin: string;
}

export interface GridData {
  temperature: string[][];
  pressure: number[][];
  kelvin: string[][];
}

export interface Iteration {
  step: number;
  values: Values;
}

export type Values = [number, number, DataPoint][];

export interface DataSet {
  iterations: Iteration[];
  grid: GridData;
}
