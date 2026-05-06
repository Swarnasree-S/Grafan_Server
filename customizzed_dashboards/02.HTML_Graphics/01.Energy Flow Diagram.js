const fields = data.series[0].fields;

const spanMap = {
  'grid-export-value': 'GridExport',
  'grid-power-value': 'GridPower',
  'insolation-value': 'Insolation',
  'irradiance-value': 'Irradiance',
  'expected-energy-value': 'ExpectedEnergy',
  'expected-power-value': 'ExpectedPower',
  'grid-import-value': 'GridImport',
  'solar-power-value': 'solarpower',
  'solar-energy-value': 'solarenergy',
};

// Helper to get field value using field name
function getValue(fieldName) {

  const field = fields.find(f => f.name === fieldName);

  if (!field) return 0;

  return field.values.get(field.values.length - 1);
}

// Update HTML values
Object.entries(spanMap).forEach(([id, fieldName]) => {

  const el = htmlNode.getElementById(id);

  const field = fields.find(f => f.name === fieldName);

  if (el && field) {

    let val = field.values.get(field.values.length - 1);

    if (typeof val === "number") {

      // Convert negative values to 0
      if (
        [
          'irradiance-value',
          'expected-power-value',
          'solar-power-value',
          'grid-power-value',
          'expected-energy-value'
        ].includes(id) &&
        val < 0
      ) {
        val = 0;
      }

      // Formatting
      if (id === 'insolation-value') {
        val = val.toFixed(1);
      } else {
        val = Math.round(val);
      }

      val = Number(val).toLocaleString();
    }

    el.textContent = val;
  }
});

// Flow values
const irradiance = getValue('Irradiance');
const expectedPower = getValue('ExpectedPower');
const solarpower = getValue('solarpower');
const gridpower = getValue('GridPower');

// Control flow helper
function controlFlow(selector, value, color) {

  htmlNode.querySelectorAll(selector).forEach(p => {

    if (value <= 0) {

      p.style.animation = "none";
      p.style.stroke = "#999da0";

    } else {

      p.style.stroke = color;

      p.style.animation = "none";

      p.offsetHeight; // force reflow

      p.style.animation = "pathAnimation 5s linear infinite";
    }
  });
}

// Apply flows
controlFlow(".solar-flow", irradiance, "#FFA500");
controlFlow(".expected-flow", expectedPower, "#E6FF02");
controlFlow(".solarpower-flow-path", solarpower, "#32CD32");

// Grid import flow
if (gridpower >= 0) {

  controlFlow(".gridpower-flow-path", 0, "#999da0");

} else {

  controlFlow(".gridpower-flow-path", gridpower, "#FF4500");

  if (gridpower < 1) {
    controlFlow(".gridpower-flow-path", 1, "#FF0000");
  }
}

// Sun / Moon toggle
const sun = htmlNode.getElementById("sun-icon");
const moon = htmlNode.getElementById("moon-icon");

if (sun && moon) {

  const val = getValue('Irradiance');

  if (val > 0) {

    sun.style.display = "block";
    moon.style.display = "none";

  } else {

    sun.style.display = "none";
    moon.style.display = "block";
  }
}

// Grid import display
const gridImportEl = htmlNode.getElementById("grid-importpower-value");

if (gridImportEl) {

  if (gridpower < 0) {

    gridImportEl.textContent = Math.trunc(gridpower).toLocaleString();

  } else {

    gridImportEl.textContent = "0";
  }
}
