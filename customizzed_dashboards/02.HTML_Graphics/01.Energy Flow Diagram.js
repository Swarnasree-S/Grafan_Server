const fields = data.series[0].fields;

const spanMap = {
  'grid-export-value': 1,
  'grid-power-value': 2,
  'insolation-value': 3,
  'irradiance-value': 4,
  'expected-energy-value': 5,
  'expected-power-value': 6,
  'grid-import-value': 7,
  'solar-power-value': 8,
  'solar-energy-value': 9,
};

// Update HTML values
Object.entries(spanMap).forEach(([id, idx]) => {
  const el = htmlNode.getElementById(id);
  if (el && fields[idx]) {
    let val = fields[idx].values.get(fields[idx].values.length - 1);

    if (typeof val === "number") {
      if (
        ['irradiance-value','expected-power-value','solar-power-value','grid-power-value','expected-energy-value'].includes(id) &&
        val < 0
      ) {
        val = 0;
      }

      if (id === 'insolation-value') {
        val = val.toFixed(1);
      } else {
        val = Math.round(val);
      }
      val = Number(val).toLocaleString()
    }

    el.textContent = val;
  }
});

// Helper to get value
function getValue(idx) {
  if (!fields[idx]) return 0;
  return fields[idx].values.get(fields[idx].values.length - 1);
}

// Flow values
const irradiance = getValue(4);
const expectedPower = getValue(6);
const solarpower = getValue(8); // 
const gridpower = getValue(2);

// Control flow helper
function controlFlow(selector, value, color) {
  htmlNode.querySelectorAll(selector).forEach(p => {
    if (value <= 0) {
      p.style.animation = "none";
      p.style.stroke = "#999da0"; // static grey
    } else {
      p.style.stroke = color;
      p.style.animation = "none";
      p.offsetHeight; // force reflow
      p.style.animation = "pathAnimation 5s linear infinite";
    }
  });
}

// Apply flows
controlFlow(".solar-flow", irradiance, "#FFA500");       // orange
controlFlow(".expected-flow", expectedPower, "#E6FF02"); // dark orange
controlFlow(".solarpower-flow-path", solarpower, "#32CD32"); // lime green

// Grid import flow
if (gridpower >= 0) {
  controlFlow(".gridpower-flow-path", 0, "#999da0"); // grey
} else {
  controlFlow(".gridpower-flow-path", gridpower, "#FF4500"); // red-orange

  // Special case: if grid import < 1, show grid power arrows as well
  if (gridpower < 1) {
    controlFlow(".gridpower-flow-path", 1, "#FF0000"); // choose color for grid power arrows
  }
}

const sun = htmlNode.getElementById("sun-icon");
const moon = htmlNode.getElementById("moon-icon");

if (sun && moon) {
  let val = getValue(spanMap['irradiance-value']);

  if (val > 0) {
    sun.style.display = "block";
    moon.style.display = "none";
  } else {
    sun.style.display = "none";
    moon.style.display = "block";
  }
}
const gridImportEl = htmlNode.getElementById("grid-importpower-value");

if (gridImportEl) {
  if (gridpower < 0) {
    gridImportEl.textContent = Math.trunc(gridpower).toLocaleString();
  } else {
    gridImportEl.textContent = "0 "; // or ""
  }
}
