export default function promptSwitcher(prev) {
  console.log("switching from " + prev);
  const promptArray = [
    "OLDER",
    "NEWER",
    "LONGER",
    "SHORTER",
    "RATED HIGHER ON IMDB",
    "RATED LOWER ON IMDB",
  ];

  let incorrectVariable = promptArray.indexOf(prev);
  promptArray.splice(incorrectVariable, 1);
  console.log("new prompt array: " + promptArray);
  return promptArray[Math.floor(Math.random() * promptArray.length)];
}
