# Grafana Backup Script

## Overview

This Python script automates the backup of **Grafana dashboards** and **InfluxDB datasources** for all organizations in a Grafana instance.  
It retrieves dashboards from the **General folder** and any other folders, saves them as **JSON files**, and generates **ZIP archives** per organization and datasource.

---

## Features

- Backups for **all Grafana organizations** (multi-org support).
- Supports **InfluxDB datasources** only.
- Creates **JSON backups** for datasources and dashboards.
- Saves dashboards from **General folder** and other folders.
- Generates **ZIP files** for easy storage or migration.
- Automatically **cleans up** intermediate backup folders after zipping.

---

## Requirements

- Python 3.8+
- Python packages:
  - `requests`
- Grafana **Admin credentials**.
- Local folder to save backups.

---

## Installation

1. Clone the repository:

```bash
git clone <repository_url>
cd grafana-backup
