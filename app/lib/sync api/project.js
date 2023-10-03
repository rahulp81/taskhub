const Project = async ({ action, name, isFavorite }) => {
  const response = await fetch("/api/app/project", {
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
    throw new Error("Failed to create project : ", name);
  }

  try {
    return response; // Return the parsed data
  } catch (error) {
    throw new Error("Failed to parse response JSON");
  }
};

export default Project;
