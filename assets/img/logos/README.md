# Brand Logos Directory

This directory contains the official brand logos for automation manufacturers featured on the NovaGen Automation website.

## Required Logo Files

Please save the following logo files in this directory:

### 1. Siemens Logo
- **Filename**: `siemens-logo.png`
- **Description**: Siemens logo with "Ingenuity for Life" tagline
- **Color**: Teal/Cyan (#009999)
- **Format**: PNG with transparent background (recommended)

### 2. Mitsubishi Electric Logo
- **Filename**: `mitsubishi-logo.png`
- **Description**: Mitsubishi Electric Factory Automation logo
- **Color**: Red and black
- **Format**: PNG with transparent background (recommended)

### 3. Delta Logo
- **Filename**: `delta-logo.png`
- **Description**: Delta logo with "Smarter. Greener. Together." tagline
- **Color**: Cyan/Blue (#00BFFF)
- **Format**: PNG with transparent background (recommended)

### 4. Yaskawa Logo
- **Filename**: `yaskawa-logo.png`
- **Description**: Yaskawa brand logo
- **Color**: Blue (#0066CC)
- **Format**: PNG with transparent background (recommended)

### 5. Omron Logo
- **Filename**: `omron-logo.png`
- **Description**: Omron brand logo
- **Color**: Blue (#0066CC)
- **Format**: PNG with transparent background (recommended)

## Logo Specifications

### Recommended Dimensions
- **Width**: 300-500px
- **Height**: 100-150px
- **Aspect Ratio**: Maintain original brand proportions

### File Format
- **Primary**: PNG with transparent background
- **Alternative**: PNG with white background
- **Resolution**: 72-150 DPI (web optimized)

### File Size
- Target: < 50KB per logo
- Maximum: < 100KB per logo

## Usage on Website

### Home Page
- Location: "Trusted Brands We Work With" section
- Display size: 80px height (auto width)
- Layout: Grid of 5 cards

### Products Page
- Location: Product cards in "Product Categories Grid"
- Display size: 70px height (auto width)
- Layout: Individual brand cards with logo, title, and description

## Logo Placement

The logos are automatically styled with:
- `max-width: 100%`
- `max-height: 70-80px` (depending on location)
- `object-fit: contain` (maintains aspect ratio)
- Centered alignment

## Dark Mode Compatibility

Logos should work well in both light and dark modes:
- **Light Mode**: Logos display on white/light gray backgrounds
- **Dark Mode**: Logos display on dark blue backgrounds (#16213E)

**Recommendation**: Use logos with transparent backgrounds or ensure they have sufficient contrast for both themes.

## How to Add Logos

1. Save each logo file with the exact filename specified above
2. Place all files in this directory: `site/assets/img/logos/`
3. Refresh the website to see the logos appear
4. Test in both light and dark modes

## Current Status

✅ HTML updated on both pages  
✅ Directory created  
⏳ Logo files need to be added  

## Files to Add

- [ ] siemens-logo.png
- [ ] mitsubishi-logo.png
- [ ] delta-logo.png
- [ ] yaskawa-logo.png
- [ ] omron-logo.png

## Troubleshooting

### Logo not displaying?
1. Check filename matches exactly (case-sensitive)
2. Verify file is in correct directory
3. Clear browser cache and refresh
4. Check browser console for 404 errors

### Logo too large/small?
- The CSS automatically scales logos to fit
- If needed, adjust the `max-height` value in the HTML

### Logo looks bad in dark mode?
- Use PNG with transparent background
- Ensure logo has light colors or white elements
- Consider creating separate dark mode versions if needed

## Contact

For questions about logo usage or brand guidelines, contact the respective manufacturers or refer to their official brand resources.
