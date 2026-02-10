export function randomAutomation(difficulty) {
  if (difficulty === "easy") {
    let number = Math.floor(Math.random() * 10);
    return number;
  } else if (difficulty === "medium") {
    let number = Math.floor(Math.random() * 20);
    return number;
  } else if (difficulty === "hard") {
    let number = Math.floor(Math.random() * 30);
    return number;
  } else {
    return "incompatible input";
  }
}
