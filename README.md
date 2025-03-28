# Hand-Drawn Portfolio Website

A creative portfolio website with a hand-drawn aesthetic, built with Next.js and Tailwind CSS. Features animated SVG elements, interactive paper-like textures, and a unique sketchbook-inspired interface.

[![Netlify Status](https://api.netlify.com/api/v1/badges/your-netlify-site-id/deploy-status)](https://app.netlify.com/sites/your-site-name/deploys)

## ✨ Features

- 🎨 Hand-drawn UI elements with animated drawing effects
- 📄 Paper-like textures with realistic lighting and shadows
- ✏️ Interactive SVG animations that simulate real-time drawing
- 📱 Fully responsive design that maintains the hand-drawn aesthetic
- 🚀 Optimized performance with Next.js
- 🎭 Interactive face animation that follows cursor movement
- 📝 Blog section with hand-drawn elements
- 🗺️ Custom illustrated map component
- 📬 Contact form with paper airplane animation

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) with TypeScript
- **Styling**: [Tailwind CSS 3.4.1](https://tailwindcss.com/)
- **Animations**: 
  - [Framer Motion](https://www.framer.com/motion/) for UI animations
  - Custom SVG animations for drawing effects
- **Fonts**:
  - Custom handwritten font (located in `public/fonts/Myfont.ttf`)
  - Inter (from Google Fonts) for body text

## 🚀 Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm or yarn
- Git

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/SallahBoussettah/Hand-Drawn
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file in the root directory:
   ```env
   # Add any environment variables here
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
hand-drawn-portfolio/
├── public/            # Static assets
│   └── images/        # Image assets
├── src/
│   ├── app/          # Next.js 14 App Router pages
│   ├── components/   # React components
│   │   ├── layout/   # Layout components
│   │   └── ui/       # Reusable UI components
│   └── styles/       # Global styles
├── tailwind.config.js # Tailwind configuration
└── next.config.js    # Next.js configuration
```

## 🎨 Custom Components

### Hand-Drawn UI Components
- `HandDrawnPath`: Animated SVG paths with drawing effects
- `PaperTexture`: Paper-like backgrounds with various textures
- `HandDrawnButton`: Stylized buttons with hover animations
- `HandDrawnMap`: Custom illustrated map component

### Layout Components
- `Navigation`: Responsive navigation with hand-drawn effects
- `Footer`: Site footer with social links
- `Layout`: Main layout wrapper with animations

## 🌈 Customization

### Colors
Color schemes are defined in `tailwind.config.js`:
```javascript
colors: {
  paper: {
    light: '#f9f7f1',
    DEFAULT: '#f5f3e7',
    dark: '#e8e6d9',
  },
  ink: {
    light: '#555555',
    DEFAULT: '#333333',
    dark: '#111111',
  }
}
```

### Fonts
The project uses:
- Custom handwritten font (located in `public/fonts/Myfont.ttf`)
- Inter (from Google Fonts) for body text

To use a different custom font:
1. Place your font file in the `public/fonts` directory
2. Update the font import in `src/app/layout.tsx`

## 🚀 Deployment

### Deploying to Netlify

1. Connect your GitHub repository to Netlify
2. Use the following build settings:
   - Build command: `npx next build --no-lint`
   - Publish directory: `.next`
3. Add any required environment variables in Netlify's dashboard

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/yourusername/hand-drawn-portfolio)

## 🤝 Contributing

1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature`
3. Make your changes
4. Commit your changes: `git commit -m 'Add some feature'`
5. Push to the branch: `git push origin feature/your-feature`
6. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgements

- Google Fonts for the beautiful typefaces
- Netlify for hosting
- Next.js team for the amazing framework
- The open-source community for inspiration

## 📧 Contact

Your Name - [@Salah](https://twitter.com/salahboussettah)

Project Link: [https://github.com/SallahBoussettah/Hand-Drawn](https://github.com/sallahboussettah/hand-drawn)
