import { useEffect, useState } from "react";
import { getGenres } from "../services/categoryService.jsx";

export const CategoryCheckbox = ({ formData, setFormData }) => {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    getGenres().then(setGenres);
  }, [formData]);

  //   const handleGenreChange = (genreId) => {
  //     const isSelected = formData.genres.includes(genreId);
  //   };

  const handleGenreChange = (genreId) => {
    const isSelected = formData.categories.includes(genreId);
    if (isSelected) {
      setFormData({
        ...formData,
        categories: formData.categories.filter((id) => id !== genreId),
      });
    } else {
      setFormData({
        ...formData,
        categories: [...formData.categories, genreId],
      });
    }
  };

  return (
    <div>
      <label>Categories:</label>
      {genres.map((genre) => (
        <div key={genre.id}>
          <label>
            <input
              type="checkbox"
              checked={formData.categories.includes(genre.id)}
              onChange={() => handleGenreChange(genre.id)}
            />
            {genre.label}
          </label>
        </div>
      ))}
    </div>
  );
};
