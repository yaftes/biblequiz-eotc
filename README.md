biblequiz/
├─ app/
│ ├─ layout.tsx # Root layout, wraps all pages
│ ├─ page.tsx # Home page (welcome / login link)
│ ├─ auth/
│ │ ├─ sign-in/page.tsx # Sign-in page
│ │ └─ sign-up/page.tsx # Optional
│ ├─ dashboard/
│ │ ├─ page.tsx # Protected dashboard with quizzes
│ │ └─ quiz/
│ │ └─ [id]/page.tsx # Individual quiz page
│ └─ api/
│ ├─ auth/[...nextauth]/route.ts # NextAuth API route
│ └─ quizzes/route.ts # Example: get quiz data from Supabase
├─ components/
│ ├─ Navbar.tsx
│ ├─ QuizCard.tsx
│ └─ Button.tsx
├─ lib/
│ ├─ supabaseClient.ts # Supabase client helper
│ └─ auth.ts # Helper functions for auth/session
├─ prisma/ # Optional, if you use Prisma
│ └─ schema.prisma
├─ public/
│ └─ images/
├─ styles/
│ └─ globals.css
├─ .env
├─ next.config.js
├─ package.json
└─ tsconfig.json
