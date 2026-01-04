export type Unit = "pressure" | "kelvin" | "temperature";
export function formatValue(value: number, type: Unit) {
  if (type === "pressure") {
    return value;
  }

  if (type === "temperature") {
    return `${value} °C`;
  }

  if (type === "kelvin") {
    return `${value} K`;
  }
}

// Temporary utility functions for parsing values
export const parseTemperature = (temp: string): number => {
  return parseFloat(temp.replace("°C", ""));
};

export const parseKelvin = (kelvin: string): number => {
  return parseFloat(kelvin.replace("K", ""));
};

export const getColorForValue = (
  value: number,
  min: number,
  max: number,
  colorScheme: string
): string => {
  if (max === min) return "hsl(200, 50%, 50%)";

  const normalized = (value - min) / (max - min);

  switch (colorScheme) {
    case "temperature": {
      const hue = (1 - normalized) * 240;
      return `hsl(${hue}, 70%, 50%)`;
    }
    case "pressure": {
      const greenSat = 50 + normalized * 40;
      return `hsl(120, ${greenSat}%, ${30 + normalized * 30}%)`;
    }
    case "kelvin": {
      const purpleSat = 40 + normalized * 50;
      return `hsl(280, ${purpleSat}%, ${25 + normalized * 35}%)`;
    }
    default:
      return "hsl(200, 50%, 50%)";
  }
};

export const formatValue1 = (
  value: number | string | undefined,
  type: string
): string => {
  if (typeof value === "string") return value;
  if (value === undefined || value === null) return "null";

  switch (type) {
    case "temperature":
      return `${value.toFixed(1)}°C`;
    case "pressure":
      return value.toString();
    case "kelvin":
      return `${value.toFixed(2)}K`;
    default:
      return value.toString();
  }
};
