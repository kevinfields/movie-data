export default function compareRatings(r1, r2, prompt) {
  let first = r1.slice(1, 4);
  let second = r2.slice(1, 4);

  if (r1 === "") {
    console.log("no first rating");
    first = 0.0;
  }
  if (r2 === "") {
    console.log("no second rating");
    second = 0.0;
  }

  console.log("first: " + first);
  console.log("second: " + second);
  if (first !== second) {
    if (prompt === "h") {
      return Number(first) > Number(second) ? 0 : 1;
    } else {
      return Number(second) > Number(first) ? 0 : 1;
    }
  }

  console.log("same rating");
  return -1;
}
