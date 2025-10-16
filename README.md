bibquiz-next/
│
├─ public/ # Static assets (images, icons, fonts)
│ ├─ images/
│ └─ favicon.ico
│
├─ src/
│ ├─ app/ # Next.js 13+ App Router
│ │ ├─ layout.tsx # App-wide layout
│ │ ├─ page.tsx # Home page
│ │ └─ globals.css # Global styles
│ │
│ ├─ pages/ # Optional if using pages router
│ │
│ ├─ components/ # UI components
│ │ ├─ Quiz/
│ │ │ ├─ QuestionCard.tsx
│ │ │ ├─ Options.tsx
│ │ │ └─ QuizProgress.tsx
│ │ ├─ Layout/
│ │ │ └─ Header.tsx
│ │ └─ UI/
│ │ ├─ Button.tsx
│ │ ├─ Card.tsx
│ │ └─ Modal.tsx
│ │
│ ├─ features/ # Domain-specific logic
│ │ ├─ quiz/
│ │ │ ├─ quizSlice.ts # State management (Redux/Riverpod/Context)
│ │ │ ├─ quizService.ts # API calls (Supabase)
│ │ │ └─ types.ts # Quiz data types
│ │ └─ user/
│ │ ├─ userSlice.ts
│ │ └─ userService.ts # Supabase auth & profile
│ │
│ ├─ services/ # External API or DB integration
│ │ ├─ supabaseClient.ts
│ │ └─ aiService.ts # Optional AI-generated hints/questions
│ │
│ ├─ hooks/ # Reusable hooks
│ │ ├─ useQuiz.ts
│ │ └─ useUser.ts
│ │
│ ├─ utils/ # Utility functions
│ │ ├─ helpers.ts
│ │ ├─ randomizer.ts
│ │ └─ validator.ts
│ │
│ ├─ types/ # Global types
│ │ └─ index.ts
│ │
│ └─ styles/ # Tailwind / SCSS / CSS modules
│ └─ quiz.module.css
│
├─ .gitignore
├─ package.json
├─ tsconfig.json # If using TypeScript
├─ next.config.js
├─ tailwind.config.js # If using Tailwind
└─ README.md
