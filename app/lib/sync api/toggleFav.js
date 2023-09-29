const toggleFav = async ({isFavorite,type,name}) => {
  const response = await fetch(`/api/app/favorite`, {
    method:  isFavorite ? "DELETE"  :  "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      type: type,
      name: name,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to toggle favorite");
  }

  try {
    return response;
  } catch (error) {
    throw new Error("Failed to parse response JSON");
  }
};

export default toggleFav;