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
    <>
      <div className="flex justify-center items-center">
        <div className="w-2/5">
          {record.imageUrl && (
            <div className="flex justify-center">
              <img
                src={record.imageUrl}
                alt={record.album}
                style={{
                  width: "200px",
                  height: "200px",
                  objectFit: "cover",
                  borderRadius: "4px",
                }}
              />
            </div>
          )}
        </div>
      </div>
      <div className="w-3/5 ml-8 flex flex-col items-start">
        {" "}
        <h1>{record.artist}</h1>
        <div>
          <strong>Artist:</strong> {record.artist}
        </div>
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
              className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2 hover:bg-blue-600"
            >
              <Link to={`/records/${record.id}/edit`}>Edit Record</Link>
            </button>
            <button
              type="button"
              className="bg-purple-500 text-yellow-500 px-4 py-2 rounded shadow-md"
              onClick={handleDelete}
            >
              Delete Record
            </button>
          </div>
        )}
      </div>
    </>
  );
};
