const createLabel = async ({ name, isFavorite }) => {
  const response = await fetch("/api/app/label", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      isFavorite,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to create label");
  }

  try {
    return response; // Return the parsed data
  } catch (error) {
    throw new Error("Failed to parse response JSON");
  }
};

export default createLabel;
