import test from "node:test";
import assert from "node:assert/strict";

import {
  COMMERCIAL,
  RESIDENTIAL,
  calculateCommercialEstimate,
  calculateResidentialEstimate,
} from "./quotation-rates.ts";

test("residential matrix matches the handwritten sheet exactly", () => {
  assert.deepEqual(
    RESIDENTIAL.map((plot) => ({
      label: plot.label,
      plotAreaMin: plot.plotAreaMin,
      plotAreaMax: plot.plotAreaMax,
      groundFloorAreaMin: plot.groundFloorAreaMin,
      groundFloorAreaMax: plot.groundFloorAreaMax,
      grey: plot.grey,
      finishing: plot.finishing,
      mep: plot.mep,
      furnishing: plot.furnishing,
    })),
    [
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
    ],
  );
});

test("commercial matrix matches the handwritten sheet exactly", () => {
  assert.deepEqual(
    COMMERCIAL.map((plot) => ({
      label: plot.label,
      area: plot.area,
      grey: plot.grey,
      finishing: plot.finishing,
    })),
    [
      { label: "3.5 Marla", area: 1430, grey: 2800, finishing: 3500 },
      { label: "5 Marla", area: 1900, grey: 2800, finishing: 3500 },
      { label: "7 Marla", area: 2450, grey: 2850, finishing: 3500 },
      { label: "10 Marla", area: 2900, grey: 2900, finishing: 3800 },
      { label: "12 Marla", area: 3500, grey: 2800, finishing: 3700 },
      { label: "1 Kanal", area: 5000, grey: 2750, finishing: 3300 },
      { label: "2 Kanal", area: 7800, grey: 2750, finishing: 3300 },
    ],
  );
});

test("residential totals use the selected covered area multiplied by the active scope rate with no commercial bleed-through", () => {
  const plot = RESIDENTIAL[3];
  const estimate = calculateResidentialEstimate(plot, 2000, ["grey", "finishing", "mep"]);

  assert.equal(plot.grey, 5800);
  assert.equal(plot.finishing, 7300);
  assert.equal(plot.mep, 4800);
  assert.equal(plot.furnishing, 4000);
  assert.equal(estimate.totalArea, 2000);
  assert.equal(estimate.total, 2000 * (5800 + 7300 + 4800));
  assert.deepEqual(
    estimate.lines.map((line) => ({ label: line.label, rate: line.rate, amount: line.amount })),
    [
      { label: "Grey Structure", rate: 5800, amount: 11600000 },
      { label: "Finishing", rate: 7300, amount: 14600000 },
      { label: "MEP / HVAC", rate: 4800, amount: 9600000 },
    ],
  );
});

test("commercial totals multiply the floor area by floors and isolate the commercial rate table", () => {
  const plot = COMMERCIAL[3];
  const estimate = calculateCommercialEstimate(plot, 2900, 2, ["grey", "finishing"]);

  assert.equal(plot.grey, 2900);
  assert.equal(plot.finishing, 3800);
  assert.equal(estimate.totalArea, 5800);
  assert.equal(estimate.total, 5800 * 2900 + 5800 * 3800);
  assert.deepEqual(
    estimate.lines.map((line) => ({ label: line.label, rate: line.rate, amount: line.amount })),
    [
      { label: "Grey Structure", rate: 2900, amount: 16820000 },
      { label: "Finishing", rate: 3800, amount: 22040000 },
    ],
  );
});
