# Bitcoin Block Guesser Farcaster Mini App Design Guidelines

## Design Approach: High-Tech Gaming Experience
**Selected Approach:** Reference-based approach inspired by top Farcaster mini apps (FarGuesser, Farcade) and premium financial trading platforms (Robinhood, Coinbase Pro) with Bitcoin/blockchain aesthetic.

**Key Design Principles:**
- Real-time data visualization with crypto trading platform aesthetics
- High-tech UI emphasizing precision and speed
- Mobile-first design optimized for Warpcast integration
- Clear visual hierarchy for game mechanics and live data

## Core Design Elements

### A. Color Palette
**Primary Colors:**
- Dark Mode Primary: `220 20% 8%` (Deep charcoal background)
- Bitcoin Orange: `25 100% 50%` (Primary brand accent)
- Electric Blue: `200 100% 60%` (Active states and data highlights)
- Success Green: `120 50% 45%` (Correct predictions, wins)
- Warning Red: `0 85% 60%` (Incorrect predictions, losses)

**Supporting Colors:**
- Text Primary: `220 10% 95%` (Near white)
- Text Secondary: `220 15% 70%` (Muted gray)
- Border Accent: `25 60% 25%` (Subtle Bitcoin-themed borders)
- Data Visualization: `200 80% 70%` (Chart elements and live data)

### B. Typography
**Font System:** JetBrains Mono via Google Fonts CDN (monospace for technical/crypto feel)
- Headers: JetBrains Mono 600-700 (semibold to bold)
- Game UI/Numbers: JetBrains Mono 500 (medium, for precise data display)
- Body text: Inter 400-500 (regular to medium, for readability)
- Live data displays: JetBrains Mono 400 (regular, technical precision)

### C. Layout System
**Spacing Primitives:** Consistent use of Tailwind units 2, 4, 6, and 8
- Component padding: `p-4` or `p-6`
- Section spacing: `gap-6` or `gap-8`
- Button padding: `px-6 py-3` or `px-8 py-4`
- Card margins: `m-4`

### D. Component Library

**Game Interface Components:**
- **Live Block Display:** Prominent real-time block height and countdown timer
- **Prediction Input:** Large, finger-friendly number input with +/- controls
- **Accuracy Meter:** Visual progress bar showing prediction accuracy
- **Score Display:** Prominent points/streak counter with animation

**Data Visualization:**
- **Transaction Chart:** Real-time line chart showing recent block tx counts
- **Mempool Indicator:** Live mempool size with color-coded urgency
- **Block Timer:** Circular countdown showing time to next block
- **Historical Data:** Mini charts showing prediction patterns

**Leaderboard System:**
- **Player Cards:** Farcaster avatars with rank, score, and accuracy
- **Personal Stats:** Win rate, streak, and total games played
- **Achievement Badges:** Visual rewards for milestones and accuracy

**Farcaster Integration:**
- **User Profile:** Seamless Farcaster identity display
- **Share Results:** Native sharing to Farcaster with formatted results
- **Social Proof:** Live player count and recent predictions feed

### E. Real-Time Gaming Features
- **WebSocket Integration:** Live mempool.space data with smooth transitions
- **Prediction States:** Clear visual distinction between active, submitted, and resolved
- **Live Updates:** Smooth number animations for score and block changes
- **Connection Status:** Discrete network status with Bitcoin node connectivity

### F. Mobile-First Considerations
- **Touch Targets:** All interactive elements minimum 44px
- **Gesture Support:** Swipe navigation between game sections
- **Thumb-Friendly:** Key actions positioned for one-handed use
- **Performance:** Optimized for mobile networks and battery life

### G. High-Tech Aesthetic Elements
- **Gradient Overlays:** Subtle Bitcoin orange to blue gradients on cards
- **Glow Effects:** Soft orange glow on active prediction elements
- **Monospace Typography:** Technical precision feel throughout data displays
- **Angular Design:** Sharp corners and geometric shapes suggesting blockchain
- **Data Density:** Information-rich displays similar to trading platforms

### H. Animation Guidelines
- **Micro-interactions:** Subtle hover states and button feedback
- **Data Transitions:** Smooth number counting and chart updates
- **Success/Failure:** Brief celebratory or sympathetic animations
- **Loading States:** Bitcoin-themed loading spinners and progress indicators

## Critical Implementation Notes
- **Real-time Performance:** Optimize WebSocket connections for smooth data flow
- **Error Handling:** Graceful fallbacks when mempool data is unavailable
- **Farcaster Frames:** Ensure compatibility with frame size constraints
- **Accessibility:** High contrast maintained throughout high-tech interface
- **Game Balance:** Clear scoring system that rewards both accuracy and participation

## Images Section
**No large hero image required** - the interface focuses on live data and game mechanics rather than promotional imagery. Use small Bitcoin/blockchain iconography throughout the interface and Farcaster user avatars in the leaderboard system.

This high-tech gaming design balances the excitement of real-time Bitcoin data with the social engagement patterns of successful Farcaster mini apps, creating a premium experience that stands out in the ecosystem.