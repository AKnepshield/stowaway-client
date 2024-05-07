import { useEffect, useState } from "react";
import { getRecords, getRecordsByUserId } from "../services/recordService.jsx";
import { Link, useLocation } from "react-router-dom";
import { getCurrentUser } from "../services/userService.jsx";

export const RecordList = () => {
  const [records, setRecords] = useState([]);
  const location = useLocation();

  useEffect(() => {
    getCurrentUser().then((user) => {
      if (location.pathname === "/my-records") {
        getRecordsByUserId(user.id).then(setRecords);
      } else {
        getRecords().then(setRecords);
      }
    });
  }, []);

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
              </div>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
};
