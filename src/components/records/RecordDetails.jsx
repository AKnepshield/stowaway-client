import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getRecord } from "../services/recordService.jsx";
import { getCurrentUser } from "../services/userService.jsx";
import { deleteRecord } from "../services/recordService.jsx";
import { Link } from "react-router-dom";

export const RecordDetails = () => {
  const [record, setRecord] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getRecord(id).then(setRecord);
  }, [id]);

  useEffect(() => {
    getCurrentUser().then(setCurrentUser);
  }, []);

  const handleDelete = () => {
    deleteRecord(id).then(() => {
      navigate("/records");
    });
  };

  return (
    <div className="flex items-center">
      <div className="w-1/2 mr-8">
        {record.imageUrl && (
          <div className="flex justify-center">
            <img
              src={record.imageUrl}
              alt={record.album}
              style={{
                width: "200px",
                height: "auto",
                objectFit: "cover",
                borderRadius: "4px",
                border: "2px solid black", // Add black border
              }}
            />
          </div>
        )}
      </div>
      <div className="w-1/2 flex flex-col items-start">
        <h1>{record.artist}</h1>

        <div>
          <strong>Album:</strong> {record.album}
        </div>
        <div>
          <strong>Year Released:</strong> {record.yearReleased}
        </div>
        <div>
          <strong>Condition:</strong> {record.condition?.label}
        </div>
        <div>
          <strong>Genres:</strong>
          <ul>
            {record.genres &&
              record.genres.map((genre) => (
                <li key={genre.id}>{genre.name}</li>
              ))}
          </ul>
        </div>
        {currentUser?.id === record.user?.id && (
          <div className="mt-4 flex">
            <button
              type="button"
              style={{
                backgroundColor: "#333",
                color: "#fff",
                border: "none",
                padding: "10px 20px",
                fontSize: "16px",
                borderRadius: "5px",
                cursor: "pointer",
                transition: "background-color 0.3s, box-shadow 0.3s",
                marginRight: "5px",
              }}
            >
              <Link
                to={`/records/${record.id}/edit`}
                style={{ textDecoration: "none", color: "#fff" }}
              >
                Edit Record
              </Link>
            </button>
            <button
              type="button"
              style={{
                backgroundColor: "#333",
                color: "#fff",
                border: "none",
                padding: "10px 20px",
                fontSize: "16px",
                borderRadius: "5px",
                cursor: "pointer",
                transition: "background-color 0.3s, box-shadow 0.3s",
              }}
              onClick={handleDelete}
            >
              Delete Record
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
