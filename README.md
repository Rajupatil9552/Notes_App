# Create README.md file
echo "# Notes App - Full Stack

A Google Keep style notes application built with React frontend and Express.js backend with MongoDB.

## 🚀 Features

### Frontend
- 📝 Create, edit, and delete notes
- 🎨 Modern Google Keep-like UI
- 💾 Local storage persistence
- 🔄 Real-time updates
- 📱 Responsive design

### Backend
- 🗃️ MongoDB database integration
- 🔄 CRUD operations for notes
- 🗑️ Soft delete functionality
- 🌐 CORS enabled
- ⚡ RESTful API

## 🛠️ Tech Stack

### Frontend
- React 19
- Tailwind CSS
- Vite
- Axios/Fetch for API calls

### Backend
- Express.js 5
- MongoDB with Mongoose
- CORS
- Environment variables with dotenv

## 📁 Project Structure

\`\`\`
notes-app-fullstack/
├── Client/                 # React frontend
│   └── Notes_APP/
│       ├── src/
│       │   ├── components/ # React components
│       │   ├── api/       # API services
│       │   └── App.jsx
│       ├── package.json
│       └── vite.config.js
├── Server/                # Express backend
│   ├── controllers/       # Route controllers
│   ├── models/           # MongoDB models
│   ├── routes/           # API routes
│   ├── config/           # Database config
│   ├── package.json
│   └── server.js
└── README.md
\`\`\`

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- Git

### Installation

1. **Clone the repository**
   \`\`\`bash
   git clone https://github.com/YOUR_USERNAME/notes-app-fullstack.git
   cd notes-app-fullstack
   \`\`\`

2. **Setup Backend**
   \`\`\`bash
   cd Server
   npm install
   
   # Create .env file
   echo \"Mongo_URL=your_mongodb_connection_string\" > .env
   echo \"Port=3000\" >> .env
   
   # Start backend server
   npm run dev
   \`\`\`

3. **Setup Frontend**
   \`\`\`bash
   cd ../Client/Notes_APP
   npm install
   
   # Start frontend development server
   npm run dev
   \`\`\`

4. **Access the Application**
   - Frontend: http://localhost:5174
   - Backend API: http://localhost:3000

## 📚 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | \`/note/get-all-note\` | Get all active notes |
| POST | \`/note/create-note\` | Create new note |
| PATCH | \`/note/update-note\` | Update existing note |
| DELETE | \`/note/delete-note\` | Soft delete note |
| GET | \`/note/get-deleted-note\` | Get deleted notes |

## 🔧 Environment Variables

### Backend (.env)
\`\`\`env
Mongo_URL=your_mongodb_connection_string
Port=3000
\`\`\`

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (\`git checkout -b feature/AmazingFeature\`)
3. Commit your changes (\`git commit -m 'Add some AmazingFeature'\`)
4. Push to the branch (\`git push origin feature/AmazingFeature\`)
5. Open a Pull Request
" > README.md