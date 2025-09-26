# TX Battle Farcaster Mini App Design Guidelines

## Design Approach: Gaming-Focused Experience
**Selected Approach:** Reference-based approach inspired by modern gaming platforms (Twitch, Discord gaming interfaces) and prediction markets (Polymarket, Manifold) with Farcaster's social integration patterns.

**Key Design Principles:**
- Real-time gaming excitement with clear visual feedback
- Social-first design emphasizing player interaction
- Mobile-optimized for Farcaster's mobile-heavy user base
- Clear game state visualization and prediction outcomes

## Core Design Elements

### A. Color Palette
**Primary Colors:**
- Dark Mode Primary: `220 25% 10%` (Deep navy background)
- Gaming Accent: `280 100% 60%` (Electric purple for active states)
- Success/Win: `120 60% 50%` (Vibrant green for wins)
- Warning/Risk: `15 90% 60%` (Orange-red for high-risk predictions)

**Supporting Colors:**
- Text Primary: `220 10% 95%` (Near white)
- Text Secondary: `220 10% 70%` (Muted gray)
- Border/Divider: `220 20% 20%` (Subtle borders)

### B. Typography
**Font System:** Inter via Google Fonts CDN
- Headers: Inter 600-700 (semibold to bold)
- Body text: Inter 400-500 (regular to medium)
- Gaming UI elements: Inter 500 (medium, slightly condensed spacing)
- Chat messages: Inter 400 (regular, optimized for readability)

### C. Layout System
**Spacing Primitives:** Consistent use of Tailwind units 2, 4, 6, and 8
- Component padding: `p-4` or `p-6`
- Section spacing: `gap-6` or `gap-8`  
- Button padding: `px-6 py-2` or `px-8 py-3`
- Card margins: `m-4`

### D. Component Library

**Gaming UI Components:**
- **Prediction Cards:** Rounded corners (`rounded-xl`), subtle glow effects for active predictions
- **Player Count Display:** Prominent positioning, real-time updates with smooth number transitions
- **Game Timer/Status:** Always visible, color-coded by game phase
- **Leaderboard Cards:** Rank-based styling with winner highlighting

**Social Integration:**
- **Farcaster Connect Button:** Primary CTA styling with Farcaster brand colors
- **Chat Interface:** Discord-inspired message bubbles with user avatars
- **Player Avatars:** Circular, consistent sizing across all contexts

**Navigation & Controls:**
- **Action Buttons:** High contrast, finger-friendly sizing (minimum 44px)
- **Share Functionality:** Native Farcaster sharing integration
- **Game Controls:** Clear primary/secondary button hierarchy

### E. Mobile-First Considerations
- **Touch Targets:** All interactive elements minimum 44px
- **Thumb Navigation:** Key actions within easy thumb reach
- **Splash Screen:** Branded loading state with TX Battle identity
- **Status Indicators:** Always visible game state without scrolling

### F. Real-Time Gaming Features
- **Live Updates:** Subtle animations for score changes and player joins
- **Prediction States:** Clear visual distinction between pending, active, and resolved predictions
- **Chat Bubbles:** Smooth scrolling with new message indicators
- **Connection Status:** Discrete but clear network status indicators

### G. Farcaster Integration Elements
- **User Context:** Seamless display of Farcaster identity and reputation
- **Social Proof:** Player count and social validation prominently featured
- **Frame Compatibility:** Ensure all UI elements work within Farcaster frame constraints
- **Mini App Navigation:** Clear entry/exit points respecting Farcaster UX patterns

## Critical Implementation Notes
- **SDK Integration:** Ensure proper `sdk.actions.ready()` calls to prevent splash screen hanging
- **Error States:** Graceful handling of connection issues with clear retry options
- **Performance:** Optimize for mobile networks common in Farcaster ecosystem
- **Accessibility:** High contrast ratios maintained throughout gaming interface

This gaming-focused design balances excitement and clarity while maintaining Farcaster's social-first philosophy and ensuring smooth mini app integration.