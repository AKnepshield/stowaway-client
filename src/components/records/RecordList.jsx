import { useEffect, useState } from "react";
import { getRecords, getRecordsByUserId } from "../services/recordService.jsx";
import { Link, useLocation } from "react-router-dom";
import { getCurrentUser } from "../services/userService.jsx";
import { likeRecord } from "../services/recordService.jsx";

export const Record = ({ record, currentUser }) => {
  // const isCurrentUserRecord = record.userId === currentUser.id;
  const [liked, setLiked] = useState(record.userLiked);

  const handleLike = async (recordId) => {
    try {
      likeRecord(recordId).then((data) => {
        console.log(data);
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

  // useEffect(() => {
  //   getCurrentUser().then((user) => {
  //     if (location.pathname === "/my-records") {
  //       getRecordsByUserId(user.id).then(setRecords);
  //     } else {
  //       getRecords().then(setRecords);
  //     }
  //   });
  // }, []);

  // const handleLike = (recordId, liked) => {
  //   const updatedRecords = records.map((record) => {
  //     if (record.id === recordId) {
  //       if (record.userId !== currentUser.id) {
  //         return { ...record, liked };
  //       }
  //     }
  //     return record;
  //   });
  //   setRecords(updatedRecords);
  // };
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
              <Record
                record={record}
                // liked={record.liked}
                currentUser={currentUser}
              />
            </li>
          ))}
        </ul>
      </section>
    </>
  );
};
// export const RecordList = ({ record }) => {
//   const [like, setLike] = useState([]);
//   return (
//     <div style={{ display: "flex", alignItems: "center" }}>
//       <Link
//         to={`/records/${record.id}`}
//         style={{ textDecoration: "none", color: "#ffffff" }}
//       >
//         <img
//           src={record.imageUrl}
//           alt={`${record.artist} - ${record.album}`}
//           style={{
//             width: "50px",
//             height: "50px",
//             marginRight: "10px",
//             borderRadius: "50%",
//           }}
//         />
//         <span>
//           {record.artist} - {record.album}
//           {like && (<div>this thing is likes</div> )}
//         </span>
//       </Link>
//     </div>
//   );
// };
// export const Record = () => {
//   const [records, setRecords] = useState([]);
//   const location = useLocation();

//   useEffect(() => {
//     getCurrentUser().then((user) => {
//       if (location.pathname === "/my-records") {
//         getRecordsByUserId(user.id).then(setRecords);
//       } else {
//         getRecords().then(setRecords);
//       }
//     });
//   }, []);

//   return (
//     <>
//       <section
//         style={{
//           backgroundColor: "#1a1a1a",
//           padding: "20px",
//           borderRadius: "10px",
//         }}
//       >
//         <ul style={{ listStyleType: "none", padding: 0 }}>
//           {records.map((record) => (
//             <li
//               key={record.id}
//               style={{ marginBottom: "20px", color: "#ffffff" }}
//             >
//               <div style={{ display: "flex", alignItems: "center" }}>
//                 <Link
//                   to={`/records/${record.id}`}
//                   style={{ textDecoration: "none", color: "#ffffff" }}
//                 >
//                   <img
//                     src={record.imageUrl}
//                     alt={`${record.artist} - ${record.album}`}
//                     style={{
//                       width: "50px",
//                       height: "50px",
//                       marginRight: "10px",
//                       borderRadius: "50%",
//                     }}
//                   />
//                   <span>
//                     {record.artist} - {record.album}
//                   </span>
//                 </Link>
//               </div>
//             </li>
//           ))}
//         </ul>
//       </section>
//     </>
//   );
// };
