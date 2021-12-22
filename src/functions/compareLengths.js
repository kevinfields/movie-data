export default function compareLengths(l1, l2, prompt) {
  let first = l1.slice(1, 4);
  let second = l2.slice(1, 4);

  console.log("first: " + first);
  console.log("second: " + second);
  if (first !== second) {
    if (prompt === "l") {
      return Number(first) > Number(second) ? 0 : 1;
    } else {
      return Number(second) > Number(first) ? 0 : 1;
    }
  }

  return 0;
}
