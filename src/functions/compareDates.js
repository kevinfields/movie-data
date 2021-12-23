export default function compareDates(date1, date2, prompt) {
  let firstArray = date1.split(" ");
  let secondArray = date2.split(" ");
  if (date1 === "" && date2 === "") {
    return -1;
  }
  if (date1 === "") {
    console.log("no first date");
    return -1;
  }
  if (date2 === "") {
    console.log("no second date");
    return -1;
  }
  let one = 1;
  let zero = 0;
  if (prompt === "y") {
    one = 0;
    zero = 1;
  }
  let monthArray = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  console.log("comparing date1: " + firstArray);
  console.log("comparing date2: " + secondArray);
  if (firstArray[2] !== secondArray[2]) {
    return firstArray[2] > secondArray[2] ? one : zero;
  }
  if (firstArray[1] !== secondArray[1]) {
    console.log("comparing months");
    for (let i = 0; i < 12; i++) {
      if (firstArray[1] === monthArray[i]) {
        return zero;
      }
      if (secondArray[1] === monthArray[i]) {
        return one;
      }
    }
  }
  if (firstArray[0] !== secondArray[0]) {
    return firstArray[2] > secondArray[2] ? one : zero;
  }

  console.log("same day");
  return -1;
}
