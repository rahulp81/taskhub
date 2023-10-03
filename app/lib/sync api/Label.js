const Label = async ({ action,name, isFavorite }) => {
  const response = await fetch("/api/app/label", {
    method: action,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
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

export default Label;
