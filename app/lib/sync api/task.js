const Task = async ({ action, taskDetail }) => {
  const response = await fetch("/api/app/task", {
    method: action,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      taskDetail: taskDetail,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to create project : ");
  }

  try {
    return response; // Return the parsed data
  } catch (error) {
    throw new Error("Failed to parse response JSON");
  }
};

export default Task;
