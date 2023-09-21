export default function formatDate(inputDate) {
  const options = {
    day: "numeric",
    month: "long",
    weekday: "long",
    year: "numeric",
  };
  const formattedDate = inputDate.toLocaleDateString("en-GB", options);

  const [rest,dayMonth] = formattedDate.split(",");

  return `${dayMonth} ‧ ${rest.trim()}`;
}
