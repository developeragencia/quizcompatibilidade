# Design Guidelines: Adult Compatibility Test Application

## Design Approach
**Reference-Based Approach**: Drawing inspiration from modern dating apps and personality test platforms like Match.com, eHarmony, and 16Personalities, focusing on user privacy, trust-building through professional presentation, and clear navigation through sensitive content.

## Core Design Principles
- **Privacy & Discretion**: Clean, professional interface that feels secure and private
- **Progressive Disclosure**: Reveal sensitive content gradually to build user comfort
- **Clear Navigation**: Always show progress and allow easy movement between sections
- **Trust Through Design**: Professional aesthetics to establish credibility

## Color Palette
**Primary Colors:**
- Deep Purple: 260 70% 25% (trust, intimacy, sophistication)
- Soft Purple: 260 40% 85% (light backgrounds, cards)

**Secondary Colors:**
- Charcoal: 220 15% 25% (text, dark mode primary)
- Warm Gray: 30 5% 95% (light backgrounds)
- Success Green: 140 60% 45% (compatibility matches)
- Warning Red: 0 70% 55% (incompatibility, important notices)

**Accent Colors (minimal use):**
- Rose Gold: 15 60% 75% (premium features, highlights)

## Typography
- **Primary**: Inter (Google Fonts) - clean, modern readability
- **Headings**: Inter Bold (600-700 weight)
- **Body**: Inter Regular (400 weight)
- **Small Text**: Inter Medium (500 weight)

## Layout System
**Spacing Units**: Tailwind classes using 4, 6, 8, 12, 16 units
- Consistent card padding: p-6
- Section spacing: mb-8, mt-12
- Form element spacing: space-y-4
- Button margins: mx-4

## Component Library

### Navigation & Progress
- **Stepper Component**: Horizontal progress indicator showing current questionnaire section
- **Tab Navigation**: For switching between Active/Passive/Vers preferences
- **Breadcrumbs**: Clear path back through questionnaire sections

### Forms & Input
- **Radio Button Groups**: Custom styled for preference selection (Active/Passive/Vers etc.)
- **Range Sliders**: For size measurements with discrete value display
- **Text Areas**: For open-ended compatibility questions
- **Checkbox Lists**: For multiple choice lifestyle/preference questions
- **File Upload**: Profile photo upload with preview

### Data Display
- **Compatibility Cards**: Results showing percentage matches with visual progress rings
- **Question Categories**: Collapsible sections (Physical, Lifestyle, Relationship, Career)
- **Tip Cards**: Animated reveal cards for health/safety recommendations
- **Results Dashboard**: Clean metric display with icons

### Interactive Elements
- **Modal Dialogs**: For sensitive preference details
- **Tooltip Overlays**: Helpful explanations for intimate questions
- **Accordion Panels**: Organized question groupings
- **Progress Rings**: Animated compatibility percentage displays

## Page-Specific Design

### Registration/Login
- Centered card layout with soft shadows
- Minimal form fields to reduce friction
- Social auth options if applicable
- Privacy reassurance messaging

### Preference Selection
- Large, clear buttons for Active/Passive/Vers selection
- Visual icons to support text choices
- Immediate transition to relevant questionnaire sections

### Questionnaire Interface  
- Single question per screen for focus
- Category headers to provide context
- Skip/back navigation always visible
- Progress indicator at top

### Results & Tips
- Celebration animation for high compatibility
- Organized tip sections with playful but tasteful icons
- Clear call-to-action for next steps
- Share/save functionality

## Visual Treatments
- **Card Shadows**: Subtle depth with soft shadows
- **Border Radius**: Consistent 8px rounded corners
- **Gradients**: Minimal use - header backgrounds only using purple tones
- **Hover States**: Gentle color shifts, no dramatic animations
- **Focus States**: Clear outline indicators for accessibility

## Content Strategy
- **Tone**: Mature, respectful, occasionally playful
- **Privacy First**: Clear data usage explanations
- **Health Focus**: Safety tips presented as caring advice
- **Inclusive Language**: Welcoming to all orientations and preferences

This design creates a professional, trustworthy platform for intimate compatibility testing while maintaining user comfort and privacy throughout the experience.