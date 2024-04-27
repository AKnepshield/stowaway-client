import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getRecord } from "../services/recordService.jsx";
import { getCurrentUser } from "../services/userService.jsx";
import { deleteRecord } from "../services/recordService.jsx";
// import { getCondition } from "../services/conditionService.jsx";

export const RecordDetails = () => {
  const [record, setRecord] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  //   const [condition, setCondition] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getRecord(id).then(setRecord);
  }, [id]);

  //   useEffect(() => {
  //     getCondition(id).then(setCondition);
  //   }, []);

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
        <div className="w-40%">
          {record.imageUrl && (
            <div className="flex justify-center">
              <img
                src={record.imageUrl}
                alt={record.album}
                className="max-w-full h-auto"
              />
            </div>
          )}
        </div>
        <div className="w-60% ml-8 text-left">
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
          {/* <div>
            <strong>Condition:</strong>
            <select
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
            >
              <option value="">Select condition</option>
              {condition &&
                condition.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
            </select>
          </div> */}
          {currentUser?.id === record.user?.id ? (
            <div className="mt-4">
              <button
                type="button"
                className="bg-green-500 text-yellow-500 px-4 py-2 rounded shadow-md mr-4"
                onClick={() => console.log("Edit clicked")}
              >
                Edit Record
              </button>
              <button
                type="button"
                className="bg-purple-500 text-yellow-500 px-4 py-2 rounded shadow-md"
                onClick={handleDelete}
              >
                Delete Record
              </button>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
};
