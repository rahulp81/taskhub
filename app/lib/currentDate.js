function getCurrentDate() {
  const options = { weekday: "short", day: "numeric", month: "short" };
  const currentDate = new Date().toLocaleDateString("en-GB", options);
  return currentDate.replace(/,/g, ""); // Remove commas
}

const formattedDate = getCurrentDate();

export default formattedDate;
