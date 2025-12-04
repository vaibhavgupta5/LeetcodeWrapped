# 🎯 LeetCode Wrapped 2025

> Your personalized LeetCode journey, wrapped up beautifully! 🚀

**LeetCode Wrapped** is a fun and interactive way to visualize your coding achievements on LeetCode throughout 2025. Just like Spotify Wrapped, but for your coding stats!

![LeetCode Wrapped Banner](https://img.shields.io/badge/LeetCode-Wrapped-FFA116?style=for-the-badge&logo=leetcode&logoColor=white)

## ✨ Features

- 📊 **Interactive Slides** - Beautiful animated slides showcasing your stats
- 🎨 **Dynamic Visualizations** - Contest rating graphs, contribution patterns, and more
- 🏆 **Achievement Highlights** - Your best badges, hardest problems solved, and nemesis topics
- 🌐 **Multi-Language Support** - Displays greetings in your most-used programming language
- 🎵 **Background Music** - Immersive audio experience with controls
- 🔄 **Auto-Scroll Mode** - Sit back and watch your journey unfold
- 📱 **Share Your Wrapped** - Easy sharing to X (Twitter), Instagram, WhatsApp, and more
- 🔗 **Direct Links** - Generate shareable links for your personalized wrapped

## 🎬 Slides Included

1. **Intro** - Personalized greeting in your favorite language
2. **Origin** - When you started your LeetCode journey
3. **Language** - Your most-used programming language
4. **Difficulty** - Breakdown of Easy, Medium, and Hard problems
5. **Nemesis** - Your most challenging topic
6. **Consistency** - Your coding streak and dedication
7. **Arena** - Contest rating graph and top 10 performances
8. **Wealth** - Your LeetCoins earned (if any)
9. **Recent Wins** - Your latest accepted submissions
10. **Summary** - Overall stats at a glance
11. **Credits** - Share and celebrate!

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/vaibhavgupta5/leetcodewrapped.git
cd leetcodewrapped
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🎮 How to Use

1. Enter your LeetCode username on the home page
2. Click "Get Your Wrapped"
3. Enjoy your personalized journey!
4. Use arrow keys or click to navigate between slides
5. Toggle auto-scroll and music with the control buttons
6. Share your wrapped with friends on social media

## 🛠️ Tech Stack

- **Framework**: [Next.js 14+](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Data Source**: LeetCode GraphQL API

## 📂 Project Structure

```
leetcodewrapped/
├── src/
│   ├── app/
│   │   ├── [username]/       # Dynamic route for direct wrapped access
│   │   ├── actions.js         # Server actions for API calls
│   │   ├── page.js            # Home page
│   │   └── layout.js          # Root layout
│   └── components/
│       ├── SlideManager.js    # Main slide orchestrator
│       ├── ContributionGrid.js
│       └── slides/            # Individual slide components
├── public/
│   └── audio.mp3              # Background music
└── README.md
```

## 🎨 Customization

### Adding Background Music

Place your audio file (MP3 format) in the `public/` directory as `audio.mp3`. The app will automatically load and play it.

### Modifying Slides

Each slide is a separate component in `src/components/slides/`. You can customize the animations, styling, and content as needed.

## 📤 Sharing Your Wrapped

The app generates a unique shareable link for each user:
```
https://yourdomain.com/[username]
```

Anyone with this link can view your LeetCode Wrapped directly!

## 🤝 Contributing

Contributions are welcome! Feel free to:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request


## 💖 Made With Love

Created by [Vaibhav Gupta](https://github.com/vaibhavgupta5)

If you found this project helpful, consider giving it a ⭐️!

---

**Happy Coding! 🎉**
