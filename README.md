# Short Story Generator

This is a Short Story Generator application built using **React**, **Vite**, and the **OpenAI API**. The app allows users to generate creative stories based on various genres, word counts, and languages.

## Features

- **Genre Selection**: Choose from multiple story genres (Adventure, Romance, Mystery, Fantasy, Horror).
- **Word Count Control**: Set the desired length of the story (between 100 and 500 words).
- **Language Support**: Generate stories in different languages (e.g., Indonesia, English).
- **Dark/Light Mode**: Toggle between dark and light themes for a better reading experience.
- **Story Copying**: Easily copy the generated story to your clipboard for sharing or saving.

## Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **Vite**: A fast build tool and development server for React projects.
- **OpenAI API**: Used to generate stories based on the user's inputs.

## Installation

Follow these steps to get your local copy of the project up and running:

1. Clone the repository:

   ```bash
   git clone https://github.com/lekreys/short-story-generator.git

2. Navigate to the project folder: Move into the project directory by running:

   cd short-story-generator

3. Install the project dependencies: This project uses npm to manage dependencies. Run the following command to install them:

   npm install

4. Set up your OpenAI API Key: Create a .env file in the root directory of the project (if not already present). Add your OpenAI API Key in the following format:

   VITE_OPENAI_API_KEY=your-openai-api-key-here

5. Run the development server: After the dependencies are installed and your API key is set up, start the Vite development server with the following command:

   npm run dev

This will start the app, and you can access it in your browser
