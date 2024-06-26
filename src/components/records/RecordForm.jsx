import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  createRecord,
  getRecord,
  updateRecord,
} from "../services/recordService.jsx";
import { ConditionDropdown } from "../condition/ConditionDropdown.jsx";
import { GenreChecklist } from "../genre/GenreChecklist.jsx";

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
        record.condition = record.condition.id;
        record.genres = record.genres.map((genre) => genre.id);
        setFormData(record);
      });
    }
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
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
    <div>
      <div>
        <label htmlFor="artist">Artist:</label>
        <input
          type="text"
          id="artist"
          name="artist"
          value={formData.artist}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="album">Album:</label>
        <input
          type="text"
          id="album"
          name="album"
          value={formData.album}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="year_released">Year Released:</label>
        <select
          id="year_released"
          name="yearReleased"
          value={formData.yearReleased}
          onChange={handleChange}
        >
          <option value="">Select year</option>
          {Array.from(
            { length: new Date().getFullYear() - 1899 },
            (_, index) => {
              const year = new Date().getFullYear() - index;
              return (
                <option key={year} value={year}>
                  {year}
                </option>
              );
            }
          )}
        </select>
      </div>

      <ConditionDropdown formData={formData} setFormData={setFormData} />
      <GenreChecklist formData={formData} setFormData={setFormData} />
      <div>
        <label htmlFor="image_url">Image URL:</label>
        <input
          type="text"
          id="image_url"
          name="imageUrl"
          value={formData.imageUrl}
          onChange={handleChange}
        />
      </div>
      <button type="button" onClick={handleSubmit}>
        Save Record
      </button>
    </div>
  );
};
