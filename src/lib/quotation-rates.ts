export type ResidentialScope = "grey" | "finishing" | "mep" | "furnishing";
export type CommercialScope = "grey" | "finishing";

export type ResidentialPlot = {
  label: string;
  plotAreaMin: number;
  plotAreaMax: number;
  groundFloorAreaMin: number;
  groundFloorAreaMax: number;
  grey: number;
  finishing: number;
  mep: number;
  furnishing: number;
};

export type CommercialPlot = {
  label: string;
  area: number;
  grey: number;
  finishing: number;
};

export const RES_SCOPES = [
  { id: "grey", label: "Grey Structure" },
  { id: "finishing", label: "Finishing" },
  { id: "mep", label: "MEP / HVAC" },
  { id: "furnishing", label: "Furnishing" },
] as const;

export const COM_SCOPES = [
  { id: "grey", label: "Grey Structure" },
  { id: "finishing", label: "Finishing" },
] as const;

export const RESIDENTIAL: ResidentialPlot[] = [
  {
    label: "3 Marla",
    plotAreaMin: 675,
    plotAreaMax: 816,
    groundFloorAreaMin: 575,
    groundFloorAreaMax: 735,
    grey: 5000,
    finishing: 6500,
    mep: 4500,
    furnishing: 4000,
  },
  {
    label: "5 Marla",
    plotAreaMin: 1125,
    plotAreaMax: 1360,
    groundFloorAreaMin: 900,
    groundFloorAreaMax: 1150,
    grey: 5000,
    finishing: 6500,
    mep: 4500,
    furnishing: 4000,
  },
  {
    label: "7 Marla",
    plotAreaMin: 1575,
    plotAreaMax: 1900,
    groundFloorAreaMin: 1180,
    groundFloorAreaMax: 1520,
    grey: 5500,
    finishing: 7000,
    mep: 4800,
    furnishing: 4000,
  },
  {
    label: "10 Marla",
    plotAreaMin: 2250,
    plotAreaMax: 2722,
    groundFloorAreaMin: 1575,
    groundFloorAreaMax: 2040,
    grey: 5800,
    finishing: 7300,
    mep: 4800,
    furnishing: 4000,
  },
  {
    label: "1 Kanal",
    plotAreaMin: 4500,
    plotAreaMax: 5445,
    groundFloorAreaMin: 2925,
    groundFloorAreaMax: 3800,
    grey: 6000,
    finishing: 7800,
    mep: 4800,
    furnishing: 4500,
  },
  {
    label: "2 Kanal",
    plotAreaMin: 9000,
    plotAreaMax: 10800,
    groundFloorAreaMin: 4950,
    groundFloorAreaMax: 6500,
    grey: 6000,
    finishing: 7800,
    mep: 4800,
    furnishing: 4500,
  },
];

export const COMMERCIAL: CommercialPlot[] = [
  { label: "3.5 Marla", area: 1430, grey: 2800, finishing: 3500 },
  { label: "5 Marla", area: 1900, grey: 2800, finishing: 3500 },
  { label: "7 Marla", area: 2450, grey: 2850, finishing: 3500 },
  { label: "10 Marla", area: 2900, grey: 2900, finishing: 3800 },
  { label: "12 Marla", area: 3500, grey: 2800, finishing: 3700 },
  { label: "1 Kanal", area: 5000, grey: 2750, finishing: 3300 },
  { label: "2 Kanal", area: 7800, grey: 2750, finishing: 3300 },
];

export function calculateResidentialEstimate(
  plot: ResidentialPlot,
  area: number,
  scopes: ResidentialScope[],
) {
  const totalArea = Math.max(area, 0);
  const lines = RES_SCOPES.filter((scope) => scopes.includes(scope.id as ResidentialScope)).map(
    (scope) => {
      const rate = plot[scope.id as ResidentialScope];
      return {
        label: scope.label,
        rate,
        area: totalArea,
        amount: totalArea * rate,
      };
    },
  );

  return {
    lines,
    total: lines.reduce((sum, line) => sum + line.amount, 0),
    totalArea,
  };
}

export function calculateCommercialEstimate(
  plot: CommercialPlot,
  areaPerFloor: number,
  floors: number,
  scopes: CommercialScope[],
) {
  const safeFloors = Math.max(1, Math.round(floors || 1));
  const totalArea = Math.max(areaPerFloor, 0) * safeFloors;
  const lines = COM_SCOPES.filter((scope) => scopes.includes(scope.id as CommercialScope)).map(
    (scope) => {
      const rate = plot[scope.id as CommercialScope];
      return {
        label: scope.label,
        rate,
        area: totalArea,
        amount: totalArea * rate,
      };
    },
  );

  return {
    lines,
    total: lines.reduce((sum, line) => sum + line.amount, 0),
    totalArea,
  };
}
