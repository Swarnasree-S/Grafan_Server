// =====================
// 🛡️ SAFETY
// =====================
if (!data || !data.series || !data.series[0]?.fields) {
  return { series: [] };
}

const fields = data.series[0].fields;
const dataFields = fields.slice(1);

const toInt = (v) => Math.round(Number(v ?? 0));

// =====================
// CONFIG
// =====================
const STRINGS_PER_INV = 32;
const TOTAL_INVERTERS = 20;
const TOTAL_STRING_VALUES = STRINGS_PER_INV * TOTAL_INVERTERS;

// =====================
// STORAGE
// =====================
const inverterStringMap = {};
const inverterPowerMap = {};

// =====================
// KPI VALUES
// =====================
let totalPower = 0;
let totalEnergy = 0;
let expEnergy = 0;
let expPower = 0;

// =====================
// STRINGS
// =====================
dataFields.slice(0, TOTAL_STRING_VALUES).forEach((f, index) => {

  const val = toInt(f.values?.toArray?.()[0]);

  const invNo = Math.floor(index / STRINGS_PER_INV) + 1;
  const strNo = (index % STRINGS_PER_INV) + 1;

  if (!inverterStringMap[invNo]) {
    inverterStringMap[invNo] = [];
  }

  inverterStringMap[invNo].push({
    name: `S${String(strNo).padStart(2, "0")}`,
    value: val
  });
});

// =====================
// LABEL BASED VALUES
// =====================
dataFields.slice(TOTAL_STRING_VALUES).forEach(f => {

  const name = (f.name || "").toLowerCase().trim();
  const val = toInt(f.values?.toArray?.()[0]);

  if (name === "power") totalPower = val;
  else if (name === "energy") totalEnergy = val;
  else if (name === "expenergy") expEnergy = val;
  else if (name === "exppower") expPower = val;

  const match = name.match(/invpower(\d+)/i);
  if (match) {
    inverterPowerMap[parseInt(match[1])] = val;
  }
});

// =====================
function getStrings(invNo) {
  return inverterStringMap[invNo] || [];
}

// =====================
// OUTER RING DATA
// =====================
const inverterData = [];

for (let i = 1; i <= TOTAL_INVERTERS; i++) {
  inverterData.push({
    name: `Inverter${String(i).padStart(2, "0")}`,
    value: inverterPowerMap[i] ?? 0
  });
}

// =====================
// COLOR FUNCTION (OUTER RING)
// =====================
function getColor(val) {
  if (val == null || val === 0) return "red";
  if (val > 250) return "#29e918";
  if (val > 150) return "#ffa500";
  if (val > 100) return "#fff200";
  return "#2196f3";
}

// =====================
// OPTION
// =====================
const option = {
  tooltip: {
    trigger: "item",
    position: (p) => [p[0] + 10, p[1] - 10],

    formatter: function (params) {

      if (params.name?.includes("Inverter")) {

        const invNo = parseInt(params.name.replace("Inverter", ""));
        const list = getStrings(invNo);

        if (!list.length) return `No data`;

        let html = `
        <div style="
          font-family: Arial;
          font-size: 18px;
          background: #0b0f19;
          color: #fff;
          padding: 8px;
          border-radius: 6px;
          width: 220px;
        ">
          <div style="
            font-size: 22px;
            font-weight: bold;
            color: #00e5ff;
            text-align:center;
            margin-bottom:6px;
          ">
            Inv ${invNo}
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:3px;">
        `;

        list.forEach(s => {
          const color = s.value > 0 ? "#00ff9c" : "#ff4d4d";

          html += `
            <div style="
              display:flex;
              justify-content:space-between;
              padding:3px 5px;
              background:#111827;
              border-radius:4px;
              font-size:13px;
            ">
              <span style="color:#aaa;">${s.name}</span>
              <b style="color:${color};">${s.value}</b>
            </div>
          `;
        });

        html += `</div></div>`;
        return html;
      }

      return `${params.name}: ${params.value}`;
    },

    confine: true
  },

  legend: { show: false },

  series: [

    // =====================
    // INNER RING (FIXED COLOR)
    // =====================
    {
      type: "pie",
      radius: ["0%", "30%"],
      silent: true,

      label: {
        show: true,
        position: "inside",
        fontSize: 20,
        formatter: (p) => {

          const map = {
            Power: totalPower,
            Energy: totalEnergy,
            "EXP ENG": expEnergy,
            "EXP PWR": expPower
          };

          return `${p.name}\n${toInt(map[p.name] ?? 0)}`;
        }
      },

      itemStyle: {
        color: function (params) {

          const map = {
            Power: totalPower,
            Energy: totalEnergy,
            "EXP ENG": expEnergy,
            "EXP PWR": expPower
          };

          const val = map[params.name] ?? 0;

          return val > 0 ? "#29e918" : "#ff4d4d";
        },

        borderColor: "#fff",
        borderWidth: 3
      },

      data: [
        { name: "Power", value: 1 },
        { name: "Energy", value: 1 },
        { name: "EXP ENG", value: 1 },
        { name: "EXP PWR", value: 1 }
      ]
    },

    // =====================
    // OUTER RING (MULTICOLOR)
    // =====================
    {
      type: "pie",
      radius: ["40%", "75%"],
      data: inverterData,

      itemStyle: {
        color: function (params) {
          return getColor(params.value);
        },
        borderColor: "#fff",
        borderWidth: 1
      },

      label: {
        show: true,
        formatter: "{b}: {c}",
        fontSize: 28,
        fontWeight: "bold"
      },

      emphasis: {
        scale: true,
        label: {
          fontSize: 34,
          fontWeight: "bold"
        },
        itemStyle: {
          shadowBlur: 20,
          shadowColor: "rgba(0,255,255,0.6)"
        }
      }
    }
  ]
};

return option;
