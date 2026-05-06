# Apache ECharts Solar Performance Wheel

An advanced Apache ECharts based Solar Performance Wheel Dashboard designed for Grafana integration.

This visualization displays:

- Inverter power
- String status
- Total power
- Total energy
- Expected energy
- Expected power

using a multi-layer circular wheel.

---

# Features

- Dual ring performance wheel visualization
- Inner KPI ring
- Outer inverter performance ring
- Dynamic inverter color indication
- String-level tooltip visualization
- Grafana Apache ECharts plugin compatible
- Real-time JSON rendering
- Automatic inverter/string mapping
- Responsive tooltip layout
- Supports:
  - 20 Inverters
  - 32 Strings per inverter
  - Total 640 string values

---

# Use Cases

- Solar SCADA Monitoring
- Inverter Health Monitoring
- String Monitoring
- Utility Scale Solar Plants
- Real-Time Energy Dashboards
- Expected vs Actual Generation Analysis

---

# Technologies Used

- Apache ECharts
- Grafana Apache ECharts Plugin
- JavaScript
- Grafana Time Series JSON

---

# Project Structure

```bash
project/
│
├── performance-wheel.js
└── README.md




Architecture Overview
--------------
Grafana Query
      ↓
Grafana Time Series JSON
      ↓
Apache ECharts Script
      ↓
Performance Wheel Rendering


Data Handling
---------------

The script reads Grafana JSON data directly:

const fields = data.series[0].fields;

Data is dynamically mapped into:
-----------------------------

Inverter Power
String Values
Total Power
Total Energy
Expected Energy
Expected Power


Safety Validation
--------------------

The script validates Grafana data before rendering:

if (!data || !data.series || !data.series[0]?.fields) {
  return { series: [] };
}



System Configuration:
----------------------
const STRINGS_PER_INV = 32;
const TOTAL_INVERTERS = 20;

Supports:

20 Inverters
32 Strings per inverter
640 Total string values


Inner Ring KPIs
--------------------

The inner wheel displays:

Power
Energy
EXP ENG
EXP PWR

Each KPI changes color dynamically based on value availability.


Outer Ring Visualization
---------------------

The outer ring represents inverter power values.

Each inverter segment is dynamically colored based on power level.

Color Logic----------
Power Range	Color
0	Red
> 250	Green
> 150	Orange
> 100	Yellow
Below Threshold	Blue
function getColor(val) {
  if (val == null || val === 0) return "red";
  if (val > 250) return "#29e918";
  if (val > 150) return "#ffa500";
  if (val > 100) return "#fff200";
  return "#2196f3";
}


function getColor(val) {
  if (val == null || val === 0) return "red";
  if (val > 250) return "#29e918";
  if (val > 150) return "#ffa500";
  if (val > 100) return "#fff200";
  return "#2196f3";
}

Tooltip Features
----------

Hovering over an inverter displays:

String-wise values
Healthy/Fault indication
Grid layout tooltip
Real-time values

Example:

Inv 01
S01  12
S02  13
S03  0
...


Grafana Compatibility:
----------------------

Compatible with:

Grafana Apache ECharts Plugin
Grafana Time Series Panels
Grafana JSON field mapping

Performance Optimization
--------------------------

Recommendations:

Use field slicing carefully
Avoid excessive tooltip rendering
Limit unnecessary animations
Use Grafana query optimizations

Future Improvements
Alarm indication
Real-time blinking alerts
Multi-layer wheel support
Dark/light theme support
Drill-down inverter navigation
MQTT live updates



License
-----------

MIT License

Author
-----------

Apache ECharts Solar Performance Wheel Dashboard for Grafana Monitoring.
