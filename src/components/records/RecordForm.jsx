import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  createRecord,
  getRecord,
  updateRecord,
} from "../services/recordService.jsx";
import { ConditionDropdown } from "../condition/ConditionDropdown.jsx";

export const RecordForm = () => {
  // const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    artist: "",
    album: "",
    year_released: "",
    condition: null,
    image_url: "",
    genres: [],
  });

  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    if (id) {
      getRecord(id).then((record) => {
        delete record.user;
        delete record.id;
        record.genre = record.genre.map((genre) => genre.id);

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
      createRecord(formData);
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
          name="year_released"
          value={formData.year_released}
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
      <div>
        <label htmlFor="image_url">Image URL:</label>
        <input
          type="text"
          id="image_url"
          name="image_url"
          value={formData.image_url}
          onChange={handleChange}
        />
      </div>
      <button type="button" onClick={handleSubmit}>
        Save Record
      </button>
    </div>
  );
};
