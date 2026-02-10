import readline from "readline/promises";
import { randomAutomation } from "./mikro-backend.js";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// ================= MAIN MENU =================

async function mainMenu() {
  console.log("\n=== GUESS NUMBER CLI ===");
  console.log("1. Play");
  console.log("2. Exit");

  const choice = await rl.question("Select menu: ");

  if (choice === "1") {
    await difficultyMenu();
  } else if (choice === "2") {
    console.log("Exiting game. Goodbye 👋");
    rl.close();
  } else {
    console.log("Invalid option!");
    await mainMenu();
  }
}

// ================= DIFFICULTY MENU =================

async function difficultyMenu() {
  console.log("\n=== Select Difficulty ===");
  console.log("1. Easy (1-10)");
  console.log("2. Medium (1-20)");
  console.log("3. Hard (1-30)");
  console.log("4. Back");

  const choice = await rl.question("Choose difficulty: ");

  if (choice === "1") {
    await startGame("easy");
  } else if (choice === "2") {
    await startGame("medium");
  } else if (choice === "3") {
    await startGame("hard");
  } else if (choice === "4") {
    await mainMenu();
  } else {
    console.log("Invalid option!");
    await difficultyMenu();
  }
}

// ================= GAME LOGIC =================

async function guessScreen() {
  console.log("\nThe random number has been generated. Try to guess it!");
  const answer = await rl.question("Your guess: ");
  return parseInt(answer);
}

async function startGame(difficulty) {
  let lives = 3;
  let numberRange = 0;
  const number = randomAutomation(difficulty);

  if (difficulty === "easy") numberRange = 10;
  if (difficulty === "medium") numberRange = 20;
  if (difficulty === "hard") numberRange = 30;

  console.log(`\n🎮 Guess a number between 1 and ${numberRange}`);
  console.log("❤️ Lives:", lives);

  while (lives > 0) {
    const guess = await guessScreen();

    if (isNaN(guess)) {
      console.log("Please enter a valid number.");
      continue;
    }

    if (guess === number) {
      console.log("🔥 CORRECT!");
      console.log("The number was:", number);
      return mainMenu();
    }

    // 🔼 Direction Feedback
    if (guess < number) {
      console.log("⬆ Too low! Try a higher number.");
    } else {
      console.log("⬇ Too high! Try a lower number.");
    }

    // 📏 Distance Feedback
    const diff = Math.abs(guess - number);
    let message;

    if (diff < 10) {
      message = "🔥 You are getting closer!";
    } else if (diff < 20) {
      message = "😐 You're still quite far.";
    } else {
      message = "🥶 You're very far away.";
    }

    console.log(message);

    lives--;
    console.log("❤️ Remaining lives:", lives);
  }

  console.log("\n💀 Game Over!");
  console.log("The correct number was:", number);

  await mainMenu();
}

// ================= START PROGRAM =================

mainMenu();
