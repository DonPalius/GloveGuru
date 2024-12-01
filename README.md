# GloveGuru

GloveGuru is a machine learning project designed to predict the probability of victory in a fight between two UFC fighters. The application consists of a **frontend** built with **React** and **TypeScript**, and a **backend** implemented in **Python** using **FastAPI**. The machine learning model is currently a **TODO** and will be developed to provide accurate predictions based on fighter statistics.

---

## Features

- **Frontend:**
  - Developed in **React** with **TypeScript**.
  - Interactive fighter selection with real-time search functionality using `react-select`.
  - Displays detailed fighter statistics dynamically.
  - Displays the probability of each fighter winning the fight.


- **Backend:**
  - Built with **FastAPI**, a high-performance Python web framework.
  - Exposes an API endpoint to calculate predictions.
  - Plans to integrate a machine learning model for accurate predictions (TODO).

---

## Project Structure

```plaintext
MMA-Predict/
├── frontend/             # React frontend
│   ├── public/           # Static assets
│   ├── src/              # React components and logic
│   │   ├── components/   # Shared components like FighterStats
│   │   ├── styles/       # CSS and styling
│   │   └── App.tsx       # Main React application
├── backend/              # FastAPI backend
│   ├── main.py           # FastAPI entry point
│   ├── models/           # TODO: ML model logic
│   ├── data/             # Fighter data and preprocessing scripts
│   └── requirements.txt  # Python dependencies
├── README.md             # Project documentation
└── .gitignore            # Ignored files and directories
```