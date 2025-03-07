# Hand-Drawn Portfolio Website

A creative portfolio website with a hand-drawn aesthetic, featuring animated SVG elements, interactive paper-like textures, and a sketchbook metaphor throughout the interface.

## Features

- Hand-drawn UI elements with animated drawing effects
- Realistic paper textures with lighting and shadows
- Interactive SVG animations that simulate real-time drawing
- Responsive design that maintains the hand-drawn aesthetic across devices
- Dark/light mode support
- Smooth page transitions and animations
- Portfolio project showcase
- About page with timeline and skills visualization
- Contact form with animated paper airplane submission effect

## Tech Stack

- **Framework**: Next.js with TypeScript
- **Styling**: Tailwind CSS 3.4.1
- **Animations**: 
  - Framer Motion for UI animations
  - GSAP for advanced timeline-based animations
  - RoughJS for hand-drawn rendering effects
- **Hand-drawn Effects**:
  - SVG path animations
  - Custom paper texture components
  - Sketch-like UI elements

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/hand-drawn-portfolio.git
cd hand-drawn-portfolio
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

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Project Structure

```
hand-drawn-portfolio/
├── public/            # Static assets
├── src/
│   ├── app/           # Next.js 14 App Router
│   ├── components/    # Reusable components
│   │   ├── layout/    # Layout components
│   │   └── ui/        # UI components
│   └── styles/        # Global styles
├── tailwind.config.js # Tailwind configuration
└── next.config.js     # Next.js configuration
```

## Hand-Drawn UI Components

The project includes several custom components for creating the hand-drawn effect:

- `HandDrawnPath`: For animated SVG paths that draw themselves
- `PaperTexture`: For paper-like backgrounds with different textures and effects
- `HandDrawnButton`: For stylized buttons with hover and active states

## Customization

### Changing Colors and Themes

Color schemes are defined in the Tailwind configuration file. The main colors are:

- Paper colors: For background textures
- Ink colors: For text and drawn elements
- Pencil colors: For lighter drawn elements

### Adding Custom Fonts

The project uses Google Fonts for the handwritten aesthetic. To change or add fonts:

1. Import new fonts in `src/app/layout.tsx`
2. Update the font variables
3. Update the Tailwind configuration in `tailwind.config.js`

## Deployment

This project is ready to be deployed on Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fyourusername%2Fhand-drawn-portfolio)

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- Font families from Google Fonts
- Inspiration from traditional sketchbooks and paper textures
- Hand-drawn SVG animations inspired by creative portfolios
