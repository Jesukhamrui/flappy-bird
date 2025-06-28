# Flappy Bird

A React Vite implementation of the classic Flappy Bird game, built with Phaser.js for game mechanics, Tailwind CSS for styling, and FontAwesome for social icons.

## Features
- Navigate a bird through a series of pillars by clicking/tapping to flap.
- Score points by passing pillars.
- Game over screen with retry option.
- Responsive design for desktop and mobile.
- Social media links with hover tooltips.

## Prerequisites
- Node.js (v16 or higher)
- npm (v8 or higher)

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/flappy-bird.git
   cd flappy-bird
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Ensure assets are in the `public/assets` directory with the following structure:
   ```
   public/assets/
   ├── GameObjects/
   │   ├── background-day.png
   │   ├── yellowbird-midflap.png
   │   ├── yellowbird-downflap.png
   │   ├── yellowbird-upflap.png
   │   ├── yellowbird-fall.png
   │   ├── pipe-green.png
   │   ├── base.png
   │   ├── gameover.png
   │   ├── score.png
   │   ├── retry.png
   │   ├── message.png
   ├── SoundEffects/
   │   ├── point.wav
   │   ├── hit.wav
   │   ├── wing.wav
   │   ├── die.wav
   ```

## Running the Project
1. Start the development server:
   ```bash
   npm run dev
   ```

2. Open your browser and navigate to `http://localhost:5173/flappy-bird/`.

## Building for Production
1. Build the project:
   ```bash
   npm run build
   ```

2. Preview the production build:
   ```bash
   npm run preview
   ```

## Project Structure
- `public/assets/`: Game assets (images and audio).
- `src/`: React components and styles.
  - `App.jsx`: Main component with header and game.
  - `Game.jsx`: Phaser game logic.
  - `SocialIcons.jsx`: Social media icons with tooltips.
  - `index.css`: Tailwind CSS and custom styles.
  - `main.jsx`: React entry point.
- `index.html`: HTML entry point.
- `vite.config.js`: Vite configuration.

## Dependencies
- React: UI library.
- Phaser: Game framework.
- Tailwind CSS: Styling.
- FontAwesome: Social media icons.

## Author
Jesu Khamrui

## License
MIT