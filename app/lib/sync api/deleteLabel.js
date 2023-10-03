const deleteLabel = async ({ name ,isFavorite }) => {
  const response = await fetch("/api/sync", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      command : 'label_remove',
      isFavorite : isFavorite
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to delete label");
  }

  try {
    return response; // Return the parsed data
  } catch (error) {
    throw new Error("Failed to parse response JSON");
  }
};

export default deleteLabel;
