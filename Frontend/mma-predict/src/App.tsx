import React, { useState, useEffect } from "react";
import AsyncSelect from "react-select/async";
import { csv } from "d3";
import { Button, CircularProgress } from "@mui/material";

interface Fighter {
  id: string;
  name: string;
  image: string;
}

const App: React.FC = () => {
  const [fighters, setFighters] = useState<Fighter[]>([]);
  const [fighter1, setFighter1] = useState<Fighter | null>(null);
  const [fighter2, setFighter2] = useState<Fighter | null>(null);
  const [prediction, setPrediction] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Fetch fighters from CSV
  useEffect(() => {
    const fetchFighters = async () => {
      const fighters = await csv("Data/ufc_fighter_details.csv"); // Adjust the path as needed
      const parsedFighters = fighters.map((fighter: any) => ({
        id: fighter.id || `${fighter.FIRST}_${fighter.LAST}`, // Use FIRST and LAST for a unique id if needed
        name: `${fighter.FIRST} ${fighter.LAST}`, // Concatenate FIRST and LAST to create the name
        image: `/images/${fighter.FIRST}_${fighter.LAST}.png`, // Match your image filenames
      }));
      setFighters(parsedFighters);
    };

    fetchFighters();
  }, []);

  const loadOptions = async (inputValue: string) => {
    const filteredFighters = fighters
      .filter((fighter) =>
        fighter.name.toLowerCase().includes(inputValue.toLowerCase())
      )
      .slice(0, 10); // Limit for not slowing down the render
    return filteredFighters.map((fighter) => ({
      value: fighter.id,
      label: fighter.name,
    }));
  };

  // Handle Prediction
  const handlePredict = async () => {
    if (!fighter1 || !fighter2) return;

    setLoading(true);
    try {
      const response = await fetch("https://example.com/api/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fighter1: fighter1.name,
          fighter2: fighter2.name,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch prediction");
      }

      const data = await response.json();
      setPrediction(
        `Winner: ${data.winner} with a probability of ${data.probability}%`
      );
    } catch (error) {
      console.error("Error fetching prediction:", error);
      setPrediction("Error calculating prediction");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>UFC Fight predictor</h1>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "40px",
        }}
      >
        {/* Fighter 1 */}
        <div style={{ textAlign: "center", width: "45%" }}>
          <img
            src={fighter1?.image || "https://via.placeholder.com/200"}
            alt={fighter1?.name || "Fighter"}
            style={{
              width: "200px",
              height: "300px",
            }}
          />
          <h2>{fighter1?.name || "Select a Fighter"}</h2>
          <AsyncSelect
            loadOptions={loadOptions} // Async search
            defaultOptions={fighters
              .slice(0, 10)
              .map((fighter) => ({ value: fighter.id, label: fighter.name }))} // Initial top 10 fighters
            onChange={(option: any) =>
              setFighter1(fighters.find((f) => f.id === option?.value) || null)
            }
            placeholder="Select Fighter 1..."
            isClearable
          />
        </div>

        <h2>VS</h2>

        {/* Fighter 2 */}
        <div style={{ textAlign: "center", width: "45%" }}>
          <img
            src={fighter2?.image || "https://via.placeholder.com/200"}
            alt={fighter2?.name || "Fighter"}
            style={{
              width: "200px",
              height: "300px",
            }}
          />
          <h2>{fighter2?.name || "Select a Fighter"}</h2>
          <AsyncSelect
            loadOptions={loadOptions} // Async search
            defaultOptions={fighters
              .slice(0, 10)
              .map((fighter) => ({ value: fighter.id, label: fighter.name }))} // Initial top 10 fighters
            onChange={(option: any) =>
              setFighter2(fighters.find((f) => f.id === option?.value) || null)
            }
            placeholder="Select Fighter 2..."
            isClearable
          />
        </div>
      </div>

      {/* Prediction */}
      {fighter1 && fighter2 && (
        <div style={{ marginTop: "40px" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handlePredict}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : "Calculate Winner"}
          </Button>
          <p>
            Fight between <strong>{fighter1.name}</strong> and{" "}
            <strong>{fighter2.name}</strong>.
          </p>
          {prediction && <p>{prediction}</p>}
        </div>
      )}
    </div>
  );
};

export default App;
