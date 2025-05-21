
 1. Project Overview
# Todo Summary Assistant with Slack & LLM Integration
This project enables users to generate natural language summaries of incomplete todos using OpenAI's LLM and posts them directly to a Slack channel.
It includes:
- React frontend for UI
- Node.js/Express backend for logic and API communication
- Integration with OpenAI API for summarization
- Slack API for posting summaries
 2. Setup Instructions
➤ Clone the Repository
git clone https://github.com/your-username/todo-summary-assistant.git
cd todo-summary-assistant
➤ Folder Structure
todo-summary-assistant/
├── backend/
│   ├── index.js
│   ├── routes/
│   │   ├── todos.js
│   │   └── summarize.js
│   ├── services/
│   │   ├── openaiService.js
│   │   └── slackService.js
│   ├── supabaseClient.js
│   ├── .env.example
│   └── package.json
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── TodoList.jsx
    │   │   ├── TodoForm.jsx
    │   │   └── SummaryButton.jsx
    │   ├── App.jsx
    │   └── api.js
    ├── .env.example
    ├── tailwind.config.js
    └── vite.config.js

3. Frontend Setup (React)
cd client
npm install
npm start
This starts the frontend on http://localhost:3000

4. Backend Setup (Node.js + Express)
cd server
npm install
Create a .env file using the .env.example file:
 .env.example .env
Add your actual credentials in .env, like:
env
OPENAI_API_KEY=your_openai_api_key
SLACK_BOT_TOKEN=your_slack_bot_token
SLACK_CHANNEL_ID=your_channel_id
PORT=4000
Then start the backend:
sql
npm start
The backend will run on http://localhost:4000
 5. .env.example File (Place this in both client and server folders)
ini
# .env.example (for server)

OPENAI_API_KEY=your_openai_key_here
SLACK_BOT_TOKEN=your_slack_bot_token
SLACK_CHANNEL_ID=your_channel_id
PORT=4000

 6. Slack and LLM Setup Guidance
 OpenAI Setup
Create an account at https://platform.openai.com
Go to API Keys → Create new secret key
Paste that key in your .env as OPENAI_API_KEY
💬 Slack Bot Setup
 # Go to:
 https://api.slack.com/apps
Click "Create New App" → Choose "From scratch"
Give it a name (e.g., Todo Summary Assistant) and select your Slack workspace
Once created, go to "Incoming Webhooks" in the left sidebar.
Toggle "Activate Incoming Webhooks" → Set it to ON
 Scroll down and click “Add New Webhook to Workspace”
Select the channel you want (e.g., #general)
 Click “Allow”

7. Design / Architecture Decisions
Layer
Technology
Reason
Frontend
React.js
Easy componentization & fast updates
Backend
Express.js
Lightweight, easy to integrate APIs
AI
OpenAI GPT
Best summarization tool
Messaging
Slack Bot API
Immediate team communication

# Application Flow
User adds todos in frontend
Frontend calls backend with todo data
Backend generates summary using OpenAI API
Summary sent to Slack via bot

8. Deployment
Frontend URL (Vercel/Netlify):
https://vercel.com/sujathas-projects-d17c9410/todo-frontend

