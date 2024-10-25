import { useEffect, useState } from "react";
import {
  deleteLike,
  getRecords,
  getRecordsByUserId,
} from "../services/recordService.jsx";
import { Link, useLocation } from "react-router-dom";
import { getCurrentUser } from "../services/userService.jsx";
import { likeRecord } from "../services/recordService.jsx";

export const Record = ({ record, currentUser }) => {
  const [liked, setLiked] = useState(record.userLiked);

  const handleLike = async (recordId, liked) => {
    try {
      if (liked) {
        return likeRecord(recordId).then(() => {
          setLiked(liked);
        });
      }
      deleteLike(recordId).then(() => {
        setLiked(liked);
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <Link
        to={`/records/${record.id}`}
        style={{ textDecoration: "none", color: "#ffffff" }}
      >
        <img
          src={record.imageUrl}
          alt={`${record.artist} - ${record.album}`}
          style={{
            width: "50px",
            height: "50px",
            marginRight: "10px",
            borderRadius: "50%",
          }}
        />
        <span>
          {record.artist} - {record.album}
        </span>
      </Link>
      {record.userId === currentUser.id ? (
        <span>
          {record.artist} - {record.album}
        </span>
      ) : (
        <button
          className="text-white bg-transparent outline-none"
          onClick={() => handleLike(record.id, !liked)}
        >
          {liked ? "❤️" : "♡"}
        </button>
      )}
    </div>
  );
};

export const RecordList = () => {
  const [records, setRecords] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const location = useLocation();

  useEffect(() => {
    getCurrentUser().then((data) => {
      setCurrentUser(data);
    });
  }, []);

  useEffect(() => {
    if (location.pathname === "/my-records") {
      getRecordsByUserId(currentUser.id).then((data) => {
        setRecords(data);
      });
    } else {
      getRecords().then((data) => {
        setRecords(data);
      });
    }
  }, [currentUser, location.pathname]);

  return (
    <>
      <section
        style={{
          backgroundColor: "#1a1a1a",
          padding: "20px",
          borderRadius: "10px",
        }}
      >
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {records.map((record) => (
            <li
              key={record.id}
              style={{ marginBottom: "20px", color: "#ffffff" }}
            >
              <Record record={record} currentUser={currentUser} />
            </li>
          ))}
        </ul>
      </section>
    </>
  );
};
