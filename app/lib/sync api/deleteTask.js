const DeleteTask = async ({ taskId }) => {
  const response = await fetch("/api/app/task", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      taskId: taskId,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to delete Task : ");
  }

  try {
    return response; // Return the parsed data
  } catch (error) {
    throw new Error("Failed to parse response JSON");
  }
};

export default DeleteTask;
