# Redeem Digital Wallet Theme

A modern, responsive Odoo 19 website theme designed for digital wallet and financial services landing pages, based on the "Khair Gate LP" Figma design.

## Overview

This theme creates a comprehensive landing page that showcases the Redeem digital wallet platform, featuring:

- **Hero Section**: Compelling headline with phone mockups demonstrating the app
- **Ecosystem Section**: Interactive overview of the digital funds delivery ecosystem
- **Features Grid**: Six key features with detailed descriptions and icons
- **How It Works**: Step-by-step process flow with visual demonstrations
- **Fund Management**: Automated features with benefits and mockups
- **CTA Section**: Final conversion-optimized call-to-action with trust indicators

## Design System

### Color Palette
- **Primary Blue**: `#2563eb` - Main brand color for buttons, links, and accents
- **Secondary Coral**: `#ff6b6b` - Accent color for highlights and mobile mockups
- **Light Gray**: `#f8fafc` - Section backgrounds and light elements
- **Pure White**: `#ffffff` - Content areas and cards
- **Dark Slate**: `#1e293b` - Text color and dark elements

### Typography
- **Font Family**: Inter (Google Fonts)
- **Headings**: Clean, modern sans-serif with proper hierarchy
- **Body Text**: Comfortable reading with 1.6 line-height
- **Buttons**: Semi-bold weight with generous padding

### Layout
- **Mobile-First**: Responsive design using Bootstrap 5 grid system
- **Section Spacing**: Generous vertical rhythm with 5rem (80px) sections
- **Card Design**: Subtle shadows and rounded corners
- **Button Styling**: Modern rounded buttons with hover effects

## File Structure

```
theme_redeem/
├── __manifest__.py                 # Theme configuration and dependencies
├── README.md                      # This documentation file
├── data/                          # XML data files
│   ├── home.xml                  # Homepage template with all sections
│   ├── images.xml                # Image assets and attachments
│   ├── menu.xml                  # Navigation menu (optional)
├── views/                         # Template customizations
│   ├── header.xml                # Header styling and modifications
│   └── footer.xml                # Footer content and styling
└── static/src/                    # Static assets
    ├── scss/                     # Styling files
    │   ├── primary_variables.scss  # Theme color palette and variables
    │   └── bootstrap_overridden.scss # Bootstrap customizations
    └── img/                      # Image assets directory
        └── placeholder.md        # Image requirements documentation
```

## Installation

1. **Copy Theme Files**: Place the `theme_redeem` directory in your Odoo addons directory or in `projects/redeem/` as structured.

2. **Install Dependencies**: Ensure the `website` module is installed.

3. **Install Theme**:
   ```bash
   ./odoo-bin -d your_database -i theme_redeem
   ```

4. **Add Images**: Replace placeholder images with actual assets (see Image Requirements below).

5. **Activate Theme**: Go to Website > Configuration > Settings and select the Redeem theme.

## Image Requirements

The theme requires the following images to be placed in `static/src/img/`:

### Required Images:
- `redeem-logo.png` - Brand logo (200x60px recommended)
- `phone-mockup-1.png` - Main app interface (280x560px)
- `phone-mockup-2.png` - Transaction screen (280x560px)  
- `phone-mockup-3.png` - Wallet overview (280x560px)
- `ecosystem-phone.png` - Ecosystem demo (400x800px)
- `how-it-works-phone-1.png` - Registration process (240x480px)
- `how-it-works-phone-2.png` - Fund distribution (240x480px)
- `fund-management-phone.png` - Management interface (350x700px)

### Image Guidelines:
- Use PNG format for images with transparency
- Optimize for web performance while maintaining quality
- Ensure images look good on retina displays
- All images include proper alt text for accessibility

## Customization

### Colors
Modify colors in `static/src/scss/primary_variables.scss`:

```scss
$o-theme-color-palettes: map-merge($o-theme-color-palettes, (
    'redeem-digital-wallet': (
        'alpha': #your-primary-color,    // Primary brand color
        'beta': #your-secondary-color,   // Secondary accent color
        // ... other colors
    ),
));
```

### Content
Edit content in `data/home.xml`:
- Update headlines, descriptions, and feature text
- Modify section layouts and structure
- Add or remove content sections as needed

### Styling  
Adjust styling in `static/src/scss/bootstrap_overridden.scss`:
- Button styles and sizing
- Card appearances and shadows
- Typography and spacing adjustments
- Animation and transition effects

## Features

### Landing Page Sections

1. **Hero Section**
   - Full-height viewport section with gradient background
   - Brand logo, compelling headline, and subtext
   - Two CTA buttons (primary and secondary)
   - Trust indicators with key metrics
   - Three-phone mockup display

2. **Ecosystem Section**
   - Centered content with descriptive text
   - Central phone mockup with feature callouts
   - Positioned feature cards around the phone (desktop only)
   - Mobile-responsive layout

3. **Features Grid**
   - Six feature cards in responsive grid
   - Icon-based visual hierarchy
   - Consistent card styling with shadows
   - Detailed feature descriptions

4. **How It Works**
   - Four-step process flow
   - Numbered step indicators with color coding
   - Side-by-side layout with phone mockups
   - Clear, actionable descriptions

5. **Fund Management**
   - Feature list with checkmark indicators
   - Benefits-focused messaging
   - Single phone mockup showcase
   - CTA button for conversion

6. **Final CTA**
   - Blue gradient background
   - Dual CTA buttons (primary and demo)
   - Trust badges with icons
   - Social proof elements

### Technical Features

- **Responsive Design**: Mobile-first Bootstrap 5 implementation
- **Performance Optimized**: Efficient CSS and lightweight images
- **Accessibility**: Proper ARIA labels, alt text, and semantic HTML
- **SEO Friendly**: Clean markup with proper heading hierarchy
- **Website Builder Compatible**: Works with Odoo's website editor

## Browser Support

- Chrome/Chromium 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers with modern CSS support

## Contributing

To contribute to this theme:

1. Follow Odoo website theme best practices
2. Maintain consistent code formatting and commenting
3. Test responsive behavior across all breakpoints
4. Ensure accessibility compliance
5. Update documentation for any changes

## License

This theme is licensed under LGPL-3, consistent with Odoo's licensing.

## Support

For theme support and customization:
- Review the Odoo website documentation
- Check the existing design system rules in `DESIGN_SYSTEM_RULES.md`
- Follow Odoo theme development patterns

---

**Theme Version**: 19.0.1.0.0  
**Odoo Compatibility**: 19.0  
**Created**: 2024  
**Based on**: Figma "Khair Gate LP" design for Redeem Digital Wallet