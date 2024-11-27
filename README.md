# Herdsman Game

## Description
`Herdsman Game` is a game built with [Pixi.js](https://pixijs.com/), where the player controls a character tasked with gathering animals and guiding them to a safe "yard."

## Key Features
- Control the main character using mouse clicks.
- Dynamic animal behavior as they move across the game field.
- Ability to collect animals into a group and guide them to the "yard."
- Score tracking for successfully delivering animals to the yard.

## Installation
Follow these steps to set up and run the project:

1. Ensure you have [Node.js](https://nodejs.org/) installed.
2. Clone the repository:
   ```bash
   git clone https://github.com/gta2578/herdsman-game.git
3. Navigate to the project directory:
   cd herdsman-game
4. Install dependencies:
    npm install
    
    
Running the Project
To run the project in development mode:

npm start

This will start the project in your default browser (typically at http://localhost:1234 or another port defined by the build tool).

Scripts
npm start — Starts the project in development mode.
npm run build — Builds the project for production.

Project Structure
src/
├── herdsmanGameClasses/
│   ├── Animal.ts   # Animal behavior logic
│   ├── Game.ts     # Game behavior logic
├── main.ts         # Entry point
├── index.html      # HTML file for the game



Technologies
Pixi.js: Rendering and graphic management.
TypeScript: For type safety and modern JavaScript features.
Parcel: For project bundling.



