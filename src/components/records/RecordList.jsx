import { useEffect, useState } from "react";
import { getRecords } from "../services/recordService.jsx";
import { Link } from "react-router-dom";

export const RecordList = () => {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    getRecords().then(setRecords);
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
