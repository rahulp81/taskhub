const createLabel = async ({ name, isFavorite,command }) => {
  const response = await fetch("/api/sync", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      command,
      isFavorite,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to create label : ",name);
  }

  try {
    return response; // Return the parsed data
  } catch (error) {
    throw new Error("Failed to parse response JSON");
  }
};

export default createLabel;