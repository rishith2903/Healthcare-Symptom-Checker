# Healthcare Symptom Checker

[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen)](https://healthcare-symptom-checker-psi.vercel.app/)

A modern, educational symptom analysis application built with **React** (frontend) and **Node.js Express** (backend). This tool provides symptom analysis for educational purposes, helping users understand potential conditions and get recommendations.

🔗 **Live Demo:** https://healthcare-symptom-checker-psi.vercel.app/  
🔗 **API Backend:** https://healthcare-symptom-checker-8pol.onrender.com

## ⚠️ Important Disclaimer

**This application is for educational purposes only.** It should never be used as a substitute for professional medical advice, diagnosis, or treatment. Always consult with qualified healthcare professionals for proper medical care.

## 🚀 Features

- **Intelligent Symptom Analysis**: AI-powered analysis of user-described symptoms
- **Educational Insights**: Provides possible conditions with probability assessments
- **Personalized Recommendations**: Actionable suggestions based on symptom analysis
- **Urgency Assessment**: Categorizes symptoms by urgency level (Emergency/Urgent/Routine/Monitor)
- **Session History**: Tracks previous queries for anonymous users
- **Responsive Design**: Modern, mobile-friendly interface
- **Sample Prompts**: Built-in examples to help users describe their symptoms effectively

## 🛠️ Tech Stack

- **Frontend**: React 18 + Vite
- **Styling**: Tailwind CSS
- **Backend**: Node.js + Express
- **Icons**: Lucide React
- **Deployment**: Vite build (frontend) + Node.js (backend)

## � Project Statistics

| Metric | Count |
|--------|-------|
| 🔌 API Endpoints | 2 |
| ⚛️ React Components | 2 |
| 🏥 Conditions Mapped | 7+ |
| 🚨 Urgency Levels | 4 |
| 🔑 Emergency Keywords | 12 |
| ⚠️ Urgent Keywords | 7 |
| 📁 Core Source Files | 10+ |

## �📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn

## 🔧 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd healthcare-symptom-checker
   ```

2. **Install frontend dependencies**
   ```bash
   cd frontend
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

4. **Environment Configuration**
   
   Frontend (create `frontend/.env`):
   ```env
   VITE_API_URL=http://localhost:3001
   ```
   
   Backend (create `backend/.env`):
   ```env
   PORT=3001
   NODE_ENV=development
   ```

5. **Start the backend server**
   ```bash
   cd backend
   npm run dev
   ```

6. **Start the frontend (in a new terminal)**
   ```bash
   cd frontend
   npm run dev
   ```

7. **Open your browser**
   - Frontend: `http://localhost:5173`
   - Backend API: `http://localhost:3001`

## 📁 Project Structure

```
├── frontend/                       # React + Vite Frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── SymptomInputForm.jsx    # Main symptom input form
│   │   │   └── ResultDisplay.jsx       # Analysis results display
│   │   ├── utils/
│   │   │   └── sessionId.js           # Session management utilities
│   │   ├── types/
│   │   │   └── symptom.js             # Type definitions
│   │   ├── App.jsx                    # Main application component
│   │   ├── main.jsx                   # Application entry point
│   │   └── index.css                  # Global styles
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── backend/                         # Node.js Express Backend
│   ├── src/
│   │   ├── index.js                    # Express server entry point
│   │   ├── routes/
│   │   │   └── symptoms.js             # API routes for symptom analysis
│   │   └── services/
│   │       └── symptomAnalyzer.js      # Core analysis logic
│   └── package.json
├── README.md
└── .gitignore
```

## 🔍 How It Works

1. **Symptom Input**: Users describe their symptoms in a detailed text field
2. **API Request**: Frontend sends symptoms to Node.js Express backend
3. **Analysis**: Backend processes symptoms using pattern matching and generates insights
4. **Result Display**: Shows possible conditions, recommendations, and urgency level
5. **Educational Focus**: Emphasizes consultation with healthcare professionals

## 🎨 Key Components

### SymptomInputForm
- Text area for symptom description
- Sample prompts to guide users
- Form validation and error handling
- Loading states during analysis

### ResultDisplay
- Condition probability assessments
- Personalized recommendations
- Urgency level indicators
- Clear medical disclaimers

## 🔒 Security Features

- **CORS Protection**: Proper CORS headers in Express
- **Input Validation**: Server-side validation of all inputs
- **Session-based Tracking**: Anonymous session identification

## 🚀 Deployment

### Backend (Render)
1. Create a new **Web Service** on [Render](https://render.com)
2. Connect your GitHub repository
3. Configure:
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
4. Deploy!

### Frontend (Vercel/Netlify)
1. Build the frontend:
   ```bash
   cd frontend
   npm run build
   ```
2. Deploy the `dist` folder
3. Set environment variable: `VITE_API_URL=https://your-backend-url.onrender.com`

## 🧪 Development Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Rishith Kumar**
- Personalized and refactored from a Bolt-generated starter
- Added custom styling, improved error handling, and enhanced functionality

## 🙏 Acknowledgments

- Built with modern web technologies and best practices
- Inspired by the need for accessible health education tools
- Emphasizes responsible use of AI in healthcare contexts

## 📞 Support

For support, questions, or suggestions, please open an issue on GitHub.

---

**Remember**: This tool is for educational purposes only. Always consult with qualified healthcare professionals for medical advice, diagnosis, and treatment.#
