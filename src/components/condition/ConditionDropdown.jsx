import { useEffect, useState } from "react";
import { getConditions } from "../services/conditionService.jsx";

export const ConditionDropdown = ({ formData, setFormData }) => {
  const [conditions, setConditions] = useState([]);

  useEffect(() => {
    getConditions().then(setConditions);
  }, [formData]);

  const handleConditionChange = (e) => {
    const selectedValue = e.target.value;

    if (!selectedValue) {
      alert("Please select a condition");
      return;
    }

    setFormData({
      ...formData,
      condition: parseInt(e.target.value),
    });
  };

  return (
    <div>
      <label htmlFor="condition">Condition:</label>
      <select
        id="condition"
        name="condition"
        value={formData.condition || ""}
        onChange={handleConditionChange}
      >
        <option value="">Select condition</option>
        {conditions.map((condition, index) => (
          <option key={index} value={condition.id}>
            {condition.label}
          </option>
        ))}
      </select>
    </div>
  );
};
