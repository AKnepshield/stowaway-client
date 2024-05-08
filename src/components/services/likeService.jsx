// export const likeRecord = async (recordId) => {
//   try {
//     const response = await fetch(`/api/records/${recordId}/like`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       credentials: "include",
//     });

//     if (!response.ok) {
//       throw new Error("Failed to like record");
//     }

//     return response.json();
//   } catch (error) {
//     console.error("Error liking record:", error);
//     throw error;
//   }
// };
// import { fetchWithResponse, fetchWithoutResponse } from "./fetcher";

// export function getLikeByRecordId(recordId) {
//   return fetchWithResponse(`records/${recordId}/like`, {
//     headers: {
//       Authorization: `Token ${localStorage.getItem("token")}`,
//     },
//   });
// }

// export function getLikedRecords() {
//   return fetchWithResponse("records/liked", {
//     headers: {
//       Authorization: `Token ${localStorage.getItem("token")}`,
//     },
//   });
// }

// export function likeRecord(recordId) {
//   return fetchWithoutResponse(`records/${recordId}/like`, {
//     method: "POST",
//     headers: {
//       Authorization: `Token ${localStorage.getItem("token")}`,
//       "Content-Type": "application/json",
//     },
//   });
// }

// export function unLikeRecord(recordId) {
//   return fetchWithoutResponse(`records/${recordId}/like`, {
//     method: "DELETE",
//     headers: {
//       Authorization: `Token ${localStorage.getItem("token")}`,
//       "Content-Type": "application/json",
//     },
//   });
// }
