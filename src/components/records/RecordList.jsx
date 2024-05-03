import { useEffect, useState } from "react";
import {
  getRecords,
  getRecordsByUserId,
  likeRecord,
} from "../services/recordService.jsx";
import { Link, useLocation } from "react-router-dom";
import { getCurrentUser } from "../services/userService.jsx";

export const RecordList = () => {
  const [records, setRecords] = useState([]);
  const [likes, setLikes] = useState({});
  const location = useLocation();

  useEffect(() => {
    getCurrentUser()
      .then((user) => {
        if (location.pathname === "/my-records") {
          getRecordsByUserId(user.id)
            .then((records) => {
              setRecords(records);
              const likesData = {};
              records.forEach((record) => {
                likesData[record.id] = record.likes.length;
              });
              setLikes(likesData);
            })
            .catch((error) => {
              console.error("Error fetching records:", error);
            });
        } else {
          getRecords()
            .then((records) => {
              setRecords(records);
              const likesData = {};
              records.forEach((record) => {
                likesData[record.id] = record.likes.length;
              });
              setLikes(likesData);
            })
            .catch((error) => {
              console.error("Error fetching records:", error);
            });
        }
      })
      .catch((error) => {
        console.error("Error getting current user:", error);
      });
  }, [location.pathname]);

  return (
    <>
      <section>
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {records.map((record) => (
            <li key={record.id} style={{ marginBottom: "20px" }}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <Link to={`/records/${record.id}`}>
                  <img
                    src={record.imageUrl}
                    alt={`${record.artist} - ${record.album}`}
                    style={{
                      width: "50px",
                      height: "50px",
                      marginRight: "10px",
                    }}
                  />
                  {record.artist} - {record.album}
                </Link>
                <button onClick={() => handleLike(record.id)}>👍 Like</button>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
};
