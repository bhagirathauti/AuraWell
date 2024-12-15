# Mood Analysis and Trends Tracker

## Overview
The Journal Entry and Mood Trends Tracker is an AI-powered journaling application that helps users analyze their daily moods through journal entries. By leveraging natural language processing, the app identifies user moods, provides actionable tips, and displays mood trends over time. This project is designed to encourage self-awareness and promote mental well-being.

## Features

### AI-Powered Mood Analysis
- Analyzes user journal entries to determine moods.
- Supported moods: **Happy**, **Sad**, **Angry**, **Anxious**, **Motivated**, **Stressed**, **Neutral**, **Exhausted**, **Relaxed**.
- Provides 2-3 actionable tips tailored to the detected mood.

### Mood Trends Dashboard
- Visual representation of mood trends:
  - **Daily trends**
  - **Weekly trends**
  - **Monthly trends**
  - **Overall distribution**
- Charts:
  - **Line Chart** for tracking mood trends over time.
  - **Pie Chart** for overall mood distribution.

### Personalized Recommendations
- AI-generated tips for self-care and stress management.


## Tech Stack

### Frontend
- **Angular** for structure, styling and dynamic interactivity.
- **Chart.js** for visualizations.
- **Angular Material UI** for design components.

### Backend
- **Node.js** for server-side logic.
- **Express.js** for routing and API endpoints.
- **Google Generative AI** for natural language processing.

### Database
- **MongoDB** for storing journal entries and mood data.

## Installation

### Prerequisites
- **Node.js** installed
- **MongoDB** instance running

### Steps
1. Clone the repository:
2. Install dependencies simulataneously for frontend and backend both:
   ```bash
   cd aurawell-client
   npm install

   cd aurawell-server
   npm install
   ```
3. Configure the Google Generative AI API:
   - Create a `.env` file and add your API key:
     ```
     APIKEY=your-google-api-key
     ```
4. Start the server:
   ```bash
   // For frontend
   ng serve

   // For Backend
   npm start
   ```
5. Open the application in your browser at `http://localhost:4200`.

## Usage

1. Enter a journal entry (50-200 words) in the text box.
2. Submit the entry to get:
   - A single-word mood analysis.
   - 2-3 actionable tips.
3. View mood trends in the **Trends Dashboard**:
   - Select the interval: Daily, Weekly, Monthly, or Overall.
   - Analyze visualized trends through line and pie charts.
4. Reflect on the insights and apply tips to improve mental well-being.


## Contributing

We welcome contributions! To contribute:
1. Fork the repository.
2. Create a feature branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes and push to the branch.
4. Create a pull request.

## License

This project is licensed under the MIT License.

## Contact

For queries or feedback, please contact **[your-email@example.com](mailto:your-email@example.com)**.

