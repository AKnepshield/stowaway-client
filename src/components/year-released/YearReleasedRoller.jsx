import { useEffect, useState } from "react";

export const YearReleasedRoller = ({ formData, handleChange }) => {
  const [currentValue, setCurrentValue] = useState(formData.yearReleased);
  const currentYear = new Date().getFullYear();
  useEffect(() => {
    const roller = document.getElementById("roller");
    const handleWheel = (event) => {
      event.preventDefault();
      const delta = Math.sign(event.deltaY);
      const currentValue = parseInt(roller.value);
      const minValue = parseInt(roller.min);
      const maxValue = parseInt(roller.max);
      let newValue = currentValue;

      if (delta > 0 && currentValue < maxValue) {
        newValue = currentValue + 1;
      } else if (delta < 0 && currentValue > minValue) {
        newValue = currentValue - 1;
      }

      handleChange({
        target: {
          name: "yearReleased",
          value: String(newValue),
        },
      });

      setCurrentValue(newValue);
    };

    roller.addEventListener("wheel", handleWheel);

    return () => {
      roller.removeEventListener("wheel", handleWheel);
    };
  }, [currentValue, handleChange]);

  return (
    <div style={{ marginBottom: "15px" }}>
      <label htmlFor="roller">Year Released:</label>
      <input
        type="number"
        id="roller"
        min="1950"
        max={currentYear}
        step="1"
        value={currentValue}
        onChange={(e) => setCurrentValue(parseInt(e.target.value))}
        style={{
          display: "block",
          width: "100%",
          padding: "8px",
          borderRadius: "5px",
          border: "none",
          backgroundColor: "#333333",
          color: "#ffffff",
        }}
      />
    </div>
  );
};
