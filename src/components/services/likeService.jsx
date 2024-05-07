export const likeRecord = async (recordId) => {
  try {
    const response = await fetch(`/api/records/${recordId}/like`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Failed to like record");
    }

    return response.json();
  } catch (error) {
    console.error("Error liking record:", error);
    throw error;
  }
};
