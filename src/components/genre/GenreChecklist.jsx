import { useEffect, useState } from "react";
import { getGenres } from "../services/genreService.jsx";

export const GenreChecklist = ({ formData, setFormData }) => {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    getGenres().then(setGenres);
  }, [formData]);

  const handleGenreChange = (genreId) => {
    const isSelected = formData.genres.includes(genreId);
    if (isSelected) {
      setFormData({
        ...formData,
        genres: formData.genres.filter((id) => id !== genreId),
      });
    }
    if (!formData.yearReleased) {
      alert("Please select a year released.");
      return;
    }
    if (!formData.condition) {
      alert("Please select a condition.");
      return;
    } else {
      setFormData({
        ...formData,
        genres: [...formData.genres, genreId],
      });
    }
  };

  return (
    <div>
      <label>Genres:</label>
      {genres.map((genre) => (
        <div key={genre.id}>
          <label>
            <input
              type="checkbox"
              checked={formData.genres.includes(genre.id)}
              onChange={() => handleGenreChange(genre.id)}
            />
            {genre.name}
          </label>
        </div>
      ))}
    </div>
  );
};
