# CMS Grafana Dashboards (specially designed for plants with string inverters and WMS)

> A curated collection of Grafana dashboard JSONs and related scripts for CMS Fleet monitoring — 
---

## 💡 Project Summary

This repository showcases my work in **Grafana dashboard standardization and monitoring automation** for solar CMS (Central Monitoring System) platforms.  
I developed and optimized dashboards for **multi-plant O&M, inverter performance, alert analytics, and energy reports**, ensuring consistent UI/UX, improved query efficiency, and API-based migration support between Grafana instances.

---

## 🛠️ Tech Stack & Tools Used

- **Grafana** – Dashboard visualization and monitoring  
- **Python** – Automation scripts for dashboard import and normalization  
- **InfluxDB / MySQL** – Data sources for plant measurements  
- **APIs / JSON** – Programmatic dashboard migration and configuration  
- **Git & GitHub** – Version control and portfolio showcase

---

## 🏷️ Versions / Dependencies

- **Grafana:** v9.0.7  
- **InfluxDB:** 2.x (InfluxQL)  
- **Python:** 3.10+  
- **Git:** 2.41+  
- **OS Tested:** Windows 10 

> 💡 Note: Scripts are compatible with the above versions; using different versions may require minor adjustments.

---

## 🧭 Key Dashboards / Modules

1. CMS Fleet – Plant Overview  
2. CMS Fleet – Inverter & String Overview  
3. CMS – Multi-Plant O&M Overview  
4. One Shot Park Overview  
5. CMS – Solar Park Wise Comparison  
6. CMS Fleet – Availability  
7. CMS Fleet – Inverter Master Table  
8. CMS – Losses Summary  
9. Data Explorer – Graphical View  
10. WMS – Parameters  
11. Alerts Explorer View  
12. Monthly & Yearly Generation Reports  
13. Fleet-Wise – Downloadable Reports  
14. Plant-Wise Generation Report (15-Min Interval)  
15. Slotwise Report Sample

---


## 📂 Repository Structure

README.md
LICENSE

CMS_Dashboards_json/ # CMS JSON scripts
├─ export_dashboards.py # Export dashboards scripts
├─ normalize_json.py # Normalize UIDs, folder names, and mappings
└─ import_dashboards.py # Import dashboards scripts

assets/
└─ CMS_Dashboards_screenshots/ # Dashboard screenshots for README or documentation

docs/
└─ migration_guide.md # Documentation for migration process



   
⚙️ How to Add Dashboard JSONs

1.Place the exported dashboard JSON into the correct folder (e.g., dashboards/plant/).

2.Use consistent filenames:
  plant-<plantid>_<dashboard-name>_v<version>.json
    Example: plant-023_plant-overview_v1.0.0.json
3.(Optional) Run normalization script before committing:
    python3 scripts/normalize_json.py dashboards/plant/plant-023_plant-overview_v1.0.0.json
4.Commit and push:
  git checkout -b feat/add-dashboards-plant-023
git add dashboards/plant/plant-023_plant-overview_v1.0.0.json
git commit -m "feat(dashboards): add Plant 023 — Plant Overview dashboard"
git push origin feat/add-dashboards-plant-023


🚀 Import Dashboards into Grafana

You can import JSONs directly from Grafana UI (Dashboards → Import)
or programmatically using the API:

GRAFANA_URL="https://grafana.example.com"
API_KEY="Bearer eyJ..."
curl -s -H "Content-Type: application/json" -H "Authorization: $API_KEY" \
  -X POST $GRAFANA_URL/api/dashboards/db \
  -d @dashboards/plant/plant-023_plant-overview_v1.0.0.json

🧩 Best Practices

Use separate environments (dev, staging, prod) for safer imports.

Avoid hard-coded datasource UIDs — use UID mapping scripts.

Commit small changes — one dashboard per commit.

Document assumptions — expected measurement names, tags, etc.

Version dashboards using semantic versioning (v1.0.0, v1.1.0, etc.)
🤝 Contribution

1.Fork this repository.

2.Create a new branch for your feature or dashboard.

3.Add your JSONs or script updates.

4.Open a pull request with clear import notes and dashboard purpose.

📜 License

This project is licensed under the MIT License — see LICENSE for details.

📬 Contact

S. Swarnasree
📧 saiswarnasree@gmail.com

💬 Reach out for Grafana demo setup, import assistance, or dashboard collaboration.

👀 Notes for Recruiters / Demo Viewers

Each JSON includes metadata (title, folder, and export timestamp).

You can preview dashboards via Grafana Import or by running the provided API script.

Screenshots are available in assets/screenshots/ for a quick visual reference.
