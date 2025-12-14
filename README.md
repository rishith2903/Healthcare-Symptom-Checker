# Healthcare Symptom Checker

A modern, educational symptom analysis application built with React and Supabase. This tool provides AI-powered symptom analysis for educational purposes, helping users understand potential conditions and get recommendations while emphasizing the importance of professional medical consultation.

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
- **Backend**: Supabase (Database + Edge Functions)
- **Database**: PostgreSQL with Row Level Security
- **Icons**: Lucide React
- **Deployment**: Vite build system

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Supabase account and project

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

3. **Set up Supabase**
   - Create a new Supabase project at [supabase.com](https://supabase.com)
   - Deploy the edge function:
     ```bash
     cd backend/supabase
     supabase functions deploy analyze-symptoms
     ```

4. **Environment Configuration**
   Create a `.env` file in the `frontend/` directory:
   ```env
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

5. **Start the development server**
   ```bash
   cd frontend
   npm run dev
   ```

6. **Open your browser**
   Navigate to `http://localhost:5173`

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
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── eslint.config.js
├── backend/                        # Supabase Edge Functions
│   └── supabase/
│       └── functions/
│           └── analyze-symptoms/
│               └── index.js           # Edge function for symptom analysis
├── README.md
└── .gitignore
```

## 🔍 How It Works

1. **Symptom Input**: Users describe their symptoms in a detailed text field
2. **AI Analysis**: The Supabase Edge Function processes symptoms using pattern matching and generates educational insights
3. **Result Display**: Shows possible conditions, recommendations, and urgency level
4. **History Tracking**: Stores queries anonymously using session-based identification
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

### PastQueries
- Session-based query history
- Quick access to previous analyses
- Privacy-focused anonymous tracking

## 🗄️ Database Schema

The application uses a single table `symptom_queries` with the following structure:

- `id`: Unique identifier (UUID)
- `symptoms`: User-provided symptom description (text)
- `analysis_result`: AI-generated analysis (JSONB)
- `session_id`: Anonymous session identifier (text)
- `created_at`: Timestamp of query (timestamptz)

## 🔒 Security Features

- **Row Level Security (RLS)**: Database-level access control
- **Session-based Access**: Anonymous users can only access their own queries
- **CORS Protection**: Proper CORS headers in edge functions
- **Input Validation**: Server-side validation of all inputs

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Vercel/Netlify
1. Build the project
2. Deploy the `dist` folder to your hosting platform
3. Ensure environment variables are set in your hosting platform

### Deploy Edge Function
```bash
supabase functions deploy analyze-symptoms
```

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
