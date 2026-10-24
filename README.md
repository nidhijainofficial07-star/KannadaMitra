# KannadaMitra 🇮🇳

### Learn Kannada. Practice real conversations. Build confidence.

**KannadaMitra** is a beginner-friendly web application designed to help people learn practical Kannada through interactive lessons, everyday phrases, conversation practice, quizzes, and progress tracking.

Built for the **Kannada Digital Innovation Hackathon 2026** under the selected problem statement **“Kannada for Everyone.”**

---

## 🔗 Project Links

- **Live Demo:** https://kannada-mitra.vercel.app 
- **GitHub Repository:** https://github.com/nidhijainofficial07-star/KannadaMitra
- **Presentation:** https://drive.google.com/file/d/1TGy5sn0c9vq6R51J31gZxtA5gRz6gl7m/view?usp=sharing
- **Demo Video:** https://drive.google.com/file/d/1ACAPzN2fheglNG6F8lsTHxXqiRNLKanI/view?usp=sharing

## 🎯 Problem Statement

**Kannada for Everyone**

Learning a new language involves more than memorizing vocabulary. Beginners also need to understand how words are written, connect written phrases with pronunciation, and practice using the language in everyday situations.

Traditional learning materials may not always provide an engaging, interactive way to rehearse practical conversations.

KannadaMitra aims to bridge this gap by bringing useful Kannada phrases, guided learning activities, conversation scenarios, quizzes, and progress tracking together in one accessible web application.

## 💡 Our Solution

KannadaMitra provides a practical learning experience that encourages users to learn useful expressions, practice them in context, check their understanding, and continue improving.

The application is designed around three goals:

- **Learn:** Understand useful Kannada phrases and their transliterations.
- **Practice:** Apply what you learn through conversation scenarios and quizzes.
- **Progress:** Review learning activities and track progress through the app's progress and XP features.

## ✨ Features

### 📚 Interactive Kannada Lessons

Learn Kannada through structured lessons and useful phrases.

### 🔤 Kannada Script and Transliteration

View Kannada text alongside Latin-script transliteration to help beginners connect written Kannada with familiar letters.

### 🔊 Audio Support

Listen to supported phrases using the application's speech functionality. Audio availability and pronunciation depend on browser and device support.

### 💬 Everyday Conversation Practice

Practice responding in practical situations through guided conversation scenarios.

### 🧠 Quizzes and Revision

Test your understanding with interactive quizzes and revisit learning material to reinforce what you have learned.

### 🏆 Progress and XP

Follow your learning progress and earn XP through supported learning activities.

### ❤️ Saved Phrases and Additional Learning Tools

Use available saved-phrase, challenge, and revision features to revisit useful content and continue practicing.

### 📱 Responsive Interface

Use the application on desktop and mobile-sized screens.

*Feature descriptions should match the version deployed for the hackathon.*

## 🛠️ Tech Stack

| Technology          | Purpose                                         |
| ------------------- | ----------------------------------------------- |
| React               | Component-based user interface                  |
| Vite                | Development server and production build tooling |
| JavaScript / JSX    | Application logic and UI composition            |
| CSS                 | Styling and responsive layouts                  |
| Browser Speech APIs | Supported speech and audio functionality        |

The application uses a frontend-focused architecture. Refer to the source code and package configuration for the exact dependencies and browser APIs used by the current version.

## 🏗️ Architecture

```text
                   ┌──────────────────────┐
                   │        Learner       │
                   └──────────┬───────────┘
                              │
                              ▼
                   ┌──────────────────────┐
                   │   Responsive Web UI   │
                   │       React           │
                   └──────────┬───────────┘
                              │
                              ▼
                   ┌──────────────────────┐
                   │ Learning Components  │
                   ├──────────────────────┤
                   │ Lessons              │
                   │ Conversation Practice│
                   │ Quizzes              │
                   │ Progress and XP      │
                   │ Revision and Saved   │
                   │ Phrases               │
                   └──────────┬───────────┘
                              │
                  ┌───────────┴───────────┐
                  ▼                       ▼
       ┌──────────────────┐   ┌────────────────────┐
       │ Learning Data    │   │ Browser Speech     │
       │ and App State    │   │ Functionality      │
       └──────────────────┘   └────────────────────┘
```

This diagram illustrates the frontend learning flow. It is conceptual: verify the actual data persistence and component connections in the source code before treating it as a complete implementation diagram.

## 🚀 Getting Started

Follow these instructions to run KannadaMitra locally.

### Prerequisites

Install the following:

- [Node.js](https://nodejs.org/) — use a version compatible with the project's dependencies.
- npm — included with Node.js.
- [Git](https://git-scm.com/)

### 1. Clone the repository

```bash
git clone https://github.com/nidhijainofficial07-star/KannadaMitra.git
cd KannadaMitra
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

Open the local URL displayed in your terminal.

### 4. Create a production build

```bash
npm run build
```

### 5. Preview the production build

```bash
npm run preview
```

Use the preview URL displayed in your terminal to test the production build locally.


## 🌐 Deployment

KannadaMitra can be deployed using a static hosting platform that supports Vite-built frontend applications, such as Vercel or Netlify.

Typical build settings:

- **Build command:** `npm run build`
- **Output directory:** `dist`

After deployment, open the public URL and test the core learning features. Confirm that any assets, audio functionality, and client-side routes work in the hosted environment.

**Live URL:** https://kannada-mitra.vercel.app

## 🔐 Security

- Do not commit API keys, passwords, access tokens, or other secrets.
- If environment variables are needed in a future version, document the required variable names in a `.env.example` file without including real credentials.
- Review the repository contents before making it public.

## 🌱 Future Scope

Possible future improvements include:

- More everyday Kannada conversation scenarios.
- Expanded lessons and vocabulary for different proficiency levels.
- Additional accessibility and pronunciation-learning support.
- More revision activities and learning recommendations.
- Further improvements based on feedback from learners and educators.

These are potential enhancements, not claims about existing functionality.

## 🎯 Hackathon Submission

- **Event:** Kannada Digital Innovation Hackathon 2026
- **Selected Problem Statement:** Kannada for Everyone
- **Project:** KannadaMitra
- **Purpose:** Make practical Kannada learning more interactive, approachable, and useful for everyday communication.

*KannadaMitra — Making everyday Kannada easier to learn and practice.*
- **Deployment:** Vercel

---

Made with the goal of making Kannada learning more accessible, practical, and enjoyable.
