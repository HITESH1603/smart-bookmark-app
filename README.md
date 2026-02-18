Smart Bookmark App

A simple bookmark manager built with Next.js, Supabase, and Tailwind CSS. Users can log in using Google, add bookmarks, view them in real-time, and delete them. Bookmarks are private to each user.

Tech Stack

Frontend: Next.js (App Router) + Tailwind CSS

Backend / Database: Supabase (Auth, Database, Realtime)

Authentication: Google OAuth

Deployment: Vercel

Features :-

1. Login via Google OAuth (no email/password).

2. Add bookmarks with a title and URL.

3. View only your own bookmarks; user data is private.

4. Real-time updates: bookmarks added or deleted in one tab reflect immediately in another.

5. Delete bookmarks you no longer need.


Setup

1. Clone the repository:

git clone https://github.com/HITESH1603/smart-bookmark-app.git
cd smart-bookmark-app


2. Install dependencies:

npm install



3. Create a .env.local file and add your Supabase credentials:

NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key


4. Run the development server:

npm run dev



Challenges Faced :-

1. Understanding Supabase Auth: Setting up Google login and managing sessions was initially confusing. Learned how to use supabase.auth.getUser() to manage the current user.


2. Row Level Security (RLS): Ensuring that users can only access their own bookmarks required creating policies in Supabase. It took some trial and error to get SELECT, INSERT, and DELETE policies correct.

3. Real-time updates: Implementing realtime subscriptions with supabase.channel was new to me. Had to figure out how to fetch bookmarks whenever changes happen.
