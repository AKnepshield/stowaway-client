import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  createRecord,
  getRecord,
  updateRecord,
} from "../services/recordService.jsx";
import { ConditionDropdown } from "../condition/ConditionDropdown.jsx";
import { GenreChecklist } from "../genre/GenreChecklist.jsx";
import { RecordImageUpload } from "./RecordImageUpload.jsx";
import DateOptions from "../year-released/DateOptions.jsx";

export const RecordForm = () => {
  const [formData, setFormData] = useState({
    artist: "",
    album: "",
    yearReleased: "",
    condition: null,
    imageUrl: "",
    genres: [],
  });

  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    if (id) {
      getRecord(id).then((record) => {
        delete record.user;
        delete record.id;
        record.condition = record.condition?.id;
        record.genres = record.genres.map((genre) => genre.id);
        console.log(formData, "Effect");
        setFormData(record);
      });
    }
  }, [id]);

  const handleChange = (e) => {
    console.log(formData);
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.artist || !formData.album || !formData.yearReleased) {
      alert("All fields must be filled out before saving.");
      return;
    }

    if (!formData.condition) {
      alert("Please select a condition");
      return;
    }

    if (id) {
      updateRecord(id, formData).then(() => {
        navigate(`/records/${id}`);
      });
    } else {
      createRecord(formData)
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error(`Failed to create record: ${response.statusText}`);
          }
        })
        .then((data) => {
          navigate(`/records/${data.id}`);
        });
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#1a1a1a",
        padding: "20px",
        borderRadius: "10px",
        color: "#ffffff",
      }}
    >
      <div style={{ marginBottom: "15px" }}>
        <label htmlFor="artist">Artist:</label>
        <input
          type="text"
          id="artist"
          name="artist"
          value={formData.artist}
          onChange={handleChange}
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
      <div style={{ marginBottom: "15px" }}>
        <label htmlFor="album">Album:</label>
        <input
          type="text"
          id="album"
          name="album"
          value={formData.album}
          onChange={handleChange}
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
      <DateOptions formData={formData} setFormData={setFormData} />
      <ConditionDropdown formData={formData} setFormData={setFormData} />
      <GenreChecklist formData={formData} setFormData={setFormData} />
      <RecordImageUpload formData={formData} setFormData={setFormData} />
      <button
        type="button"
        onClick={handleSubmit}
        style={{
          width: "100%",
          padding: "12px",
          backgroundColor: "#333333",
          color: "#ffffff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Save Record
      </button>
    </div>
  );
};
