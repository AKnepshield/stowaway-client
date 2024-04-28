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
      <section>
        <ul>
          {records.map((record) => (
            <li key={record.id}>
              <Link to={`/records/${record.id}`}>
                {record.artist} - {record.album}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
};
