// Element selectors
const btnOxygen = document.querySelector(".btnOxygen");
const btnEat = document.querySelector(".btnEat");
const btnDrink = document.querySelector(".btnDrink");
const btnExercise = document.querySelector(".btnExercise");
const btnSleep = document.querySelector(".btnSleep");
const btnRestart = document.querySelector(".btnRestart");
const btnSelectAaron = document.querySelector(".btnSelectAaron");
const btnSelectConstantin = document.querySelector(".btnSelectConstantin");
const btnSelectReuben = document.querySelector(".btnSelectReuben");
const gameoverScreen = document.querySelector(".gameoverScreenContainer");
const gameScreen = document.querySelector(".gameScreenContainer");
const characterScreen = document.querySelector(".characterSelectContainer");
const survivalTime = document.querySelector(".survivalTime");
const characterName = document.querySelector(".characterName");

// Constructing the character class
class Character {
    constructor(mood) {
        this.mood = mood;

        // Stats
        this.stats = {
            health: 100,
            oxygen: 100,
            hunger: 100,
            thirst: 100,
            energy: 100,
            boredom: 100,
        };
    }

    // Methods for the character class
    // (refill oxygen, eat, drink, exercise, sleep)
    // TODO: Will adjust numbers later
    refillOxygen() {
        if (this.stats.oxygen >= 50) {
            return (this.stats.oxygen = 100);
        }

        if (this.stats.energy <= 10) {
            return (this.stats.energy = 0);
        }

        this.stats.oxygen += 50;
        this.stats.energy -= 10;
        this.stats.health += 20;
    }

    eat() {
        if (this.stats.hunger >= 75) {
            return (this.stats.hunger = 100);
        }

        if (this.stats.energy <= 4) {
            return (this.stats.energy = 0);
        }

        if (this.stats.thirst <= 10) {
            return (this.stats.thirst = 0);
        }

        this.stats.hunger += 25;
        this.stats.health += 20;
        this.stats.thirst -= 10;
        this.stats.energy -= 4;
    }

    drink() {
        if (this.stats.thirst >= 75) {
            return (this.stats.thirst = 100);
        }

        if (this.stats.energy <= 6) {
            return (this.stats.energy = 0);
        }

        if (this.stats.hunger <= 6) {
            return (this.stats.hunger = 0);
        }

        this.stats.thirst += 25;
        this.stats.health += 20;
        this.stats.hunger -= 6;
        this.stats.energy -= 6;
    }

    exercise() {
        if (this.stats.energy <= 20) {
            return (this.stats.energy = 0);
        }

        if (this.stats.hunger <= 10) {
            return (this.stats.hunger = 0);
        }

        if (this.stats.thirst <= 10) {
            return (this.stats.thirst = 0);
        }

        if (this.stats.boredom >= 75) {
            return (this.stats.boredom = 100);
        }

        this.stats.energy -= 20;
        this.stats.hunger -= 10;
        this.stats.thirst -= 10;
        this.stats.boredom += 25;
        this.stats.health += 10;
    }

    sleep() {
        if (this.stats.energy >= 50) {
            this.stats.energy = 100;
        }

        if (this.stats.hunger <= 25) {
            this.stats.hunger = 0;
        }

        if (this.stats.thirst <= 25) {
            this.stats.thirst = 0;
        }

        if (this.stats.boredom <= 25) {
            this.stats.boredom = 0;
        }

        this.stats.energy += 50;
        this.stats.health += 10;
        this.stats.hunger -= 10;
        this.stats.thirst -= 10;
        this.stats.boredom -= 10;
    }

    changeMood(mood) {
        this.mood = mood;
    }
}

// Constructing the 3 different playable characters
class Aaron extends Character {
    constructor(mood) {
        super(mood);
    }

    // Unique methods?
}

class Constantin extends Character {
    constructor(mood) {
        super(mood);
    }

    // Unique methods?
}

class Reuben extends Character {
    constructor(mood) {
        super(mood);
    }

    // Unique methods?
}

/////////////////////////// MAIN GAME CODE BELOW ////////////////////////////

// Variables
let character; // Character variable
let isPlaying = false; // Game is not playing by default
let tickRate = 1000; // 1 second. (1000 milliseconds)
let survivedTime = 0; // Time survived in seconds

// Game loop
const gameLoop = () => {
    const loop = setInterval(() => {
        // If game is not playing, stop the loop
        if (!isPlaying) {
            return clearInterval(loop);
        }

        // Update character stats every game tick
        survivedTime += tickRate / 1000;
        updateStats();
    }, tickRate);
};

const startGame = () => {
    isPlaying = true;
    gameLoop();
};

const gameOver = () => {
    gameoverScreen.style.display = "flex";
    gameScreen.style.display = "none";
    survivalTime.textContent = `You survived for ${Math.floor(survivedTime)} seconds`;

    // disable all buttons
    btnOxygen.disabled = true;
    btnEat.disabled = true;
    btnDrink.disabled = true;
    btnExercise.disabled = true;
    btnSleep.disabled = true;
};

// Update character stats function
const updateStats = () => {
    console.table(character.stats); // TODO: Remove this later (for testing purposes)

    // Select the character stats elements
    const health = document.querySelector(".health");
    const oxygen = document.querySelector(".oxygen");
    const hunger = document.querySelector(".hunger");
    const thirst = document.querySelector(".thirst");
    const energy = document.querySelector(".energy");
    const boredom = document.querySelector(".boredom");

    // Update the character stats elements
    health.textContent = character.stats.health <= 0 ? 0 : character.stats.health > 100 ? 100 : character.stats.health;
    oxygen.textContent = character.stats.oxygen <= 0 ? 0 : character.stats.oxygen > 100 ? 100 : character.stats.oxygen;
    hunger.textContent = character.stats.hunger <= 0 ? 0 : character.stats.hunger > 100 ? 100 : character.stats.hunger;
    thirst.textContent = character.stats.thirst <= 0 ? 0 : character.stats.thirst > 100 ? 100 : character.stats.thirst;
    energy.textContent = character.stats.energy <= 0 ? 0 : character.stats.energy > 100 ? 100 : character.stats.energy;
    boredom.textContent =
        character.stats.boredom <= 0 ? 0 : character.stats.boredom > 100 ? 100 : character.stats.boredom;

    // Stat bars styling
    health.style.background = `linear-gradient(to right, #ff3838 ${character.stats.health}%, #ffffff ${character.stats.health}%)`;
    oxygen.style.background = `linear-gradient(to right, #00d1df ${character.stats.oxygen}%, #ffffff ${character.stats.oxygen}%)`;
    hunger.style.background = `linear-gradient(to right, #ff8900 ${character.stats.hunger}%, #ffffff ${character.stats.hunger}%)`;
    thirst.style.background = `linear-gradient(to right, #0064f8 ${character.stats.thirst}%, #ffffff ${character.stats.thirst}%)`;
    energy.style.background = `linear-gradient(to right, #03c371 ${character.stats.energy}%, #ffffff ${character.stats.energy}%)`;
    boredom.style.background = `linear-gradient(to right, #6615cd ${character.stats.boredom}%, #ffffff ${character.stats.boredom}%)`;

    // When characters health reaches 0, game over.
    if (character.stats.health <= 0) {
        character.stats.health = 0;
        isPlaying = false;

        // Disable all buttons
        btnOxygen.disabled = true;
        btnEat.disabled = true;
        btnDrink.disabled = true;
        btnExercise.disabled = true;
        btnSleep.disabled = true;

        console.log("Game over!", isPlaying); // TODO: Remove this later (for testing purposes)

        // TODO: Add function to display game over screen
        gameOver();
    }

    // Remove warning flashing animation and speech buble when stat is above 50
    if (character.stats.health > 50) {
        document.querySelector(".health").style.animation = "none";
        document.querySelector(".speechOxygen").style.display = "none";
    }

    if (character.stats.hunger > 50) {
        document.querySelector(".hunger").style.animation = "none";
        document.querySelector(".speechHunger").style.display = "none";
    }

    if (character.stats.thirst > 50) {
        document.querySelector(".thirst").style.animation = "none";
        document.querySelector(".speechThirst").style.display = "none";
    }

    if (character.stats.energy > 50) {
        document.querySelector(".energy").style.animation = "none";
        document.querySelector(".speechEnergy").style.display = "none";
    }

    if (character.stats.boredom > 50) {
        document.querySelector(".boredom").style.animation = "none";
        document.querySelector(".speechBoredom").style.display = "none";
    }

    // Character mood changes
    if (character.stats.health <= 50) {
        character.changeMood("sad");
        document.querySelector(".health").style.animation = "warning 0.5s infinite";
        document.querySelector(".speechOxygen").style.display = "block";
    }

    if (character.stats.hunger <= 50) {
        character.changeMood("hungry");
        document.querySelector(".hunger").style.animation = "warning 0.5s infinite";
        document.querySelector(".speechHunger").style.display = "block";
    }

    if (character.stats.thirst <= 50) {
        character.changeMood("thirsty");
        document.querySelector(".thirst").style.animation = "warning 0.5s infinite";
        document.querySelector(".speechThirst").style.display = "block";
    }

    if (character.stats.energy <= 50) {
        character.changeMood("tired");
        document.querySelector(".energy").style.animation = "warning 0.5s infinite";
        document.querySelector(".speechEnergy").style.display = "block";
    }

    if (character.stats.boredom <= 50) {
        character.changeMood("bored");
        document.querySelector(".boredom").style.animation = "warning 0.5s infinite";
        document.querySelector(".speechBoredom").style.display = "block";
    }

    // Character stats deduction
    // Base stat deduction. (Mood = "happy")
    if (character.mood === "happy") {
        character.stats.health -= 1;
        character.stats.oxygen -= 1;
        character.stats.hunger -= 1;
        character.stats.thirst -= 1;
        character.stats.energy -= 1;
        character.stats.boredom -= 1;
    }

    if (character.mood === "sad") {
        character.stats.health -= 2;
        character.stats.oxygen -= 2;
        character.stats.hunger -= 2;
        character.stats.thirst -= 2;
        character.stats.energy -= 2;
        character.stats.boredom -= 2;
    }

    // Tired stat deduction. (Mood = "tired")
    if (character.mood === "tired") {
        character.stats.health -= 4;
        character.stats.oxygen -= 2;
        character.stats.hunger -= 1;
        character.stats.thirst -= 2;
        character.stats.energy -= 4;
        character.stats.boredom -= 1;
    }

    // Hungry stat deduction. (Mood = "hungry")
    if (character.mood === "hungry") {
        character.stats.health -= 4;
        character.stats.oxygen -= 1;
        character.stats.hunger -= 4;
        character.stats.thirst -= 1;
        character.stats.energy -= 2;
        character.stats.boredom -= 1;
    }

    // Thirsty stat deduction. (Mood = "thirsty")
    if (character.mood === "thirsty") {
        character.stats.health -= 4;
        character.stats.oxygen -= 1;
        character.stats.hunger -= 1;
        character.stats.thirst -= 4;
        character.stats.energy -= 2;
        character.stats.boredom -= 1;
    }

    // Bored stat deduction. (Mood = "bored")
    if (character.mood === "bored") {
        character.stats.health -= 4;
        character.stats.oxygen -= 1;
        character.stats.hunger -= 1;
        character.stats.thirst -= 1;
        character.stats.energy -= 1;
        character.stats.boredom -= 4;
    }
};

// Close modal
const closeModal = () => {
    document.querySelector(".modalBackground").style.display = "none";
};

// Select characters
btnSelectAaron.addEventListener("click", () => {
    character = new Aaron("happy"); // Create new character
    characterName.textContent = "Aaron";

    // Start game
    characterScreen.classList.add("hidden");
    gameScreen.classList.remove("hidden");

    startGame();
});

btnSelectReuben.addEventListener("click", () => {
    character = new Reuben("tired"); // Create new character
    characterName.textContent = "Reuben";

    // Start game
    characterScreen.classList.add("hidden");
    gameScreen.classList.remove("hidden");

    startGame();
});

btnSelectConstantin.addEventListener("click", () => {
    character = new Constantin("bored"); // Create new character
    characterName.textContent = "Constantin";

    // Start game
    characterScreen.classList.add("hidden");
    gameScreen.classList.remove("hidden");

    startGame();
});

// Refill Oxygen
btnOxygen.addEventListener("click", () => {
    btnOxygen.textContent = "Refilling...";

    // Disable button for 0.5 seconds
    btnOxygen.disabled = true;
    setTimeout(() => {
        character.refillOxygen();
        btnOxygen.textContent = "Refill Oxygen";
        btnOxygen.disabled = false;
    }, 3000);
});

// Eat
btnEat.addEventListener("click", () => {
    btnEat.textContent = "Eating...";

    // Disable button for 0.5 seconds
    btnEat.disabled = true;
    setTimeout(() => {
        character.eat();
        btnEat.textContent = "Eat Food";
        btnEat.disabled = false;
    }, 500);
});

// Drink
btnDrink.addEventListener("click", () => {
    btnDrink.textContent = "Drinking...";

    // Disable button for 0.5 seconds
    btnDrink.disabled = true;
    setTimeout(() => {
        character.drink();
        btnDrink.textContent = "Drink Water";
        btnDrink.disabled = false;
    }, 500);
});

// Exercise
btnExercise.addEventListener("click", () => {
    btnExercise.textContent = "Exercising...";

    // Disable button for 0.5 seconds
    btnExercise.disabled = true;
    setTimeout(() => {
        character.exercise();
        btnExercise.textContent = "Exercise";
        btnExercise.disabled = false;
    }, 500);
});

// Sleep
btnSleep.addEventListener("click", () => {
    btnSleep.textContent = "Sleeping...";

    // Disable button for 0.5 seconds
    btnSleep.disabled = true;
    setTimeout(() => {
        character.sleep();
        btnSleep.textContent = "Sleep";
        btnSleep.disabled = false;
    }, 500);
});

// Restart game
btnRestart.addEventListener("click", () => {
    window.location.reload();
});