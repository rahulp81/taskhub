const completedTask = async ({ completedTaskItem , taskId}) => {
  const response = await fetch("/api/app/completedTask", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      completedTaskItem,
      taskId
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

export default completedTask;
