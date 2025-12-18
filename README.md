# NovaGen Automation Systems & Solution Website

A professional, responsive static website for NovaGen Automation Systems & Solution, built with pure HTML, CSS, and JavaScript. Features a modern design, dual theme system, and comprehensive automation product showcase.

## 🌟 Features

- **Responsive Design** - Mobile-first approach with elegant desktop layouts
- **Dual Theme System** - Light and muted dark themes with smooth transitions
- **Product Gallery** - Interactive modal lightbox with keyboard navigation
- **SEO Optimized** - Meta tags, Open Graph, and Schema.org structured data
- **Accessibility** - ARIA labels, semantic HTML, keyboard navigation
- **Performance** - Lazy loading, optimized assets, clean code
- **Contact Integration** - Formspree form handling with email fallbacks

## 📁 Project Structure

```
/site/
├── index.html              # Home page
├── about.html              # About Us page
├── vision.html             # Vision & Mission page
├── products.html           # Products page with gallery
├── services.html           # Services page
├── certifications.html     # Certifications page
├── contact.html            # Contact page with form
├── assets/
│   ├── css/
│   │   └── styles.css      # Main stylesheet with theme system
│   ├── js/
│   │   └── main.js         # Vanilla JavaScript functionality
│   └── img/
│       ├── logo.png        # Company logo
│       ├── iso_cert.png    # ISO 9001:2015 certification
│       └── gallery/        # Product images (to be added)
└── README.md               # This file
```

## 🎨 Design System

### Brand Colors
- **Primary Blue**: `#224488` (NovaGen brand blue)
- **Accent Orange**: `#F7A800` (NovaGen brand orange)
- **Background (Dark)**: `#6A6268` (Muted purple-grey)

### Theme System
- **Light Theme** (Default): White background, dark text
- **Dark Theme**: Muted purple-grey background, white text
- **Toggle**: Saved preference in localStorage

### Typography
- **Font Family**: Segoe UI, Tahoma, Geneva, Verdana, sans-serif
- **Responsive**: Scales appropriately for mobile and desktop

## 🚀 Deployment Options

### Option 1: GitHub Pages (Recommended)

1. **Create a GitHub repository**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/novagen-automation.git
   git push -u origin main
   ```

2. **Enable GitHub Pages**
   - Go to repository Settings → Pages
   - Source: Deploy from a branch
   - Branch: `main` / `root`
   - Click Save

3. **Access your site**
   - Your site will be available at: `https://yourusername.github.io/novagen-automation`

### Option 2: Netlify

1. **Drag and Drop Deployment**
   - Go to [Netlify](https://www.netlify.com/)
   - Drag the `/site` folder to the deploy area
   - Your site will be live instantly with a random URL

2. **Custom Domain (Optional)**
   - Add your custom domain in Site Settings
   - Configure DNS as instructed

### Option 3: Vercel

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Deploy**
   ```bash
   cd /site
   vercel
   ```

3. **Follow the prompts**
   - Set up and deploy: Y
   - Which scope: Your account
   - Link to existing project: N
   - Project name: novagen-automation
   - Directory: ./
   - Override settings: N

### Option 4: Traditional Web Hosting

1. **Upload files via FTP/SFTP**
   - Upload all files from `/site/` to your web server's public_html or www directory
   - Ensure `index.html` is in the root directory

2. **Configure domain**
   - Point your domain to the hosting server
   - Set up SSL certificate (Let's Encrypt recommended)

## 📧 Contact Form Setup (Formspree)

The contact form is pre-configured for Formspree integration. To activate:

1. **Create Formspree account**
   - Go to [Formspree.io](https://formspree.io/)
   - Sign up for a free account

2. **Create a new form**
   - Click "New Form"
   - Configure form settings
   - Copy your Form ID

3. **Update contact.html**
   - Open `contact.html`
   - Find: `action="https://formspree.io/f/your-form-id"`
   - Replace `your-form-id` with your actual Form ID

4. **Test the form**
   - Submit a test message
   - Check your Formspree dashboard

### Alternative: Email Fallback

If Formspree is not set up, the form will fall back to mailto links:

```html
<!-- Update form action to -->
<form action="mailto:ng@novagenautomation.com" method="POST">
```

## 📸 Adding Product Gallery Images

To populate the product gallery with images from IndiaMART:

1. **Visit the product page**
   - Go to: https://www.indiamart.com/novagenautomationsystemssolution/products-and-services.html

2. **Download images**
   - Right-click on product images
   - Save with descriptive names
   - Suggested naming: `brand_product_01.jpg` (e.g., `siemens_servo_motor_01.jpg`)

3. **Organize images**
   - Place images in `/assets/img/gallery/` folder
   - Use consistent naming convention

4. **Update products.html**
   - Replace placeholder gallery items with actual images
   - Update alt text and captions
   - Example structure:
   ```html
   <div class="gallery-item">
       <img src="/assets/img/gallery/siemens_servo_motor_01.jpg" alt="Siemens Servo Motor" loading="lazy">
       <div class="gallery-caption">Siemens Servo Motor - Model XYZ</div>
   </div>
   ```

## 🧪 Testing Checklist

### Functionality Testing
- [ ] **Navigation**
  - [ ] All menu links work correctly
  - [ ] Dropdown menus function properly
  - [ ] Mobile hamburger menu works
  - [ ] Breadcrumbs display correctly

- [ ] **Theme System**
  - [ ] Theme toggle button works
  - [ ] Theme preference saves to localStorage
  - [ ] Theme persists on page reload
  - [ ] All elements respond to theme change

- [ ] **Forms**
  - [ ] Contact form validation works
  - [ ] Required fields are enforced
  - [ ] Email format validation works
  - [ ] Form submission handling (Formspree or mailto)

- [ ] **Gallery**
  - [ ] Images load correctly
  - [ ] Modal opens on image click
  - [ ] Next/Previous navigation works
  - [ ] ESC key closes modal
  - [ ] Click outside closes modal

### Responsive Testing
- [ ] **Mobile Devices**
  - [ ] Layout adapts to mobile screens
  - [ ] Navigation collapses to hamburger menu
  - [ ] Text remains readable
  - [ ] Buttons are touch-friendly

- [ ] **Tablets**
  - [ ] Layout adapts appropriately
  - [ ] Navigation works correctly
  - [ ] Content displays properly

- [ ] **Desktop**
  - [ ] Full layout displays correctly
  - [ ] All interactive elements work
  - [ ] Hover effects function properly

### Accessibility Testing
- [ ] **Keyboard Navigation**
  - [ ] Tab navigation works through all interactive elements
  - [ ] Dropdown menus accessible via keyboard
  - [ ] Modal navigation via keyboard

- [ ] **Screen Reader Compatibility**
  - [ ] Alt text present on all images
  - [ ] ARIA labels and roles implemented
  - [ ] Semantic HTML structure

- [ ] **Visual Accessibility**
  - [ ] Color contrast meets WCAG AA standards
  - [ ] Focus indicators visible
  - [ ] Text remains readable in both themes

### Performance Testing
- [ ] **Page Load Speed**
  - [ ] Pages load in under 3 seconds
  - [ ] Images optimize for web
  - [ ] CSS and JS minification (for production)

- [ ] **SEO Elements**
  - [ ] Meta descriptions present on all pages
  - [ ] Page titles descriptive and unique
  - [ ] Open Graph tags working
  - [ ] Schema.org markup validates

## 🛠️ Customization Guide

### Updating Company Information

1. **Contact Details**
   - Update phone numbers, emails, addresses in:
     - `contact.html` (main contact section)
     - All footer sections across pages

2. **Company Description**
   - Update text in `about.html`
   - Modify meta descriptions in page heads

3. **Logo**
   - Replace `assets/img/logo.png` with new logo
   - Ensure logo is optimized for web (PNG, max 100KB)

### Adding New Pages

1. **Create HTML file**
   ```html
   <!DOCTYPE html>
   <html lang="en">
   <head>
       <!-- Copy head from existing page -->
   </head>
   <body>
       <!-- Copy header/navigation -->
       <!-- Add your content -->
       <!-- Copy footer -->
   </body>
   </html>
   ```

2. **Add navigation link**
   - Update header navigation in all pages
   - Update mobile navigation

3. **Test the new page**
   - Ensure all links work
   - Check responsive design
   - Validate HTML

### Modifying Theme Colors

1. **Update CSS variables in `assets/css/styles.css`**
   ```css
   :root {
     --brand-blue: #your-new-color;
     --brand-accent: #your-new-accent;
     /* Other variables */
   }
   ```

2. **Test both themes**
   - Ensure good contrast ratios
   - Check color accessibility

## 📱 Browser Compatibility

- **Modern Browsers**: Chrome, Firefox, Safari, Edge (latest versions)
- **Mobile Browsers**: Chrome Mobile, Safari Mobile, Samsung Internet
- **Features Used**:
  - CSS Grid and Flexbox
  - CSS Custom Properties (variables)
  - ES6 JavaScript (const, let, arrow functions)
  - Fetch API (for form submission)

## 🔧 Development Tools

### Recommended VS Code Extensions
- **Live Server** - For local development server
- **Prettier** - Code formatting
- **HTML CSS Support** - Enhanced CSS support
- **Auto Rename Tag** - HTML tag management

### Local Development
1. **Install Live Server extension in VS Code**
2. **Right-click on index.html**
3. **Select "Open with Live Server"**
4. **Browser will auto-refresh on file changes**

## 📊 Analytics Setup (Optional)

To add Google Analytics:

1. **Create GA4 property**
   - Go to [Google Analytics](https://analytics.google.com/)
   - Create new property for your website

2. **Add tracking code**
   ```html
   <!-- Add before closing </head> tag in all pages -->
   <script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
   <script>
     window.dataLayer = window.dataLayer || [];
     function gtag(){dataLayer.push(arguments);}
     gtag('js', new Date());
     gtag('config', 'GA_MEASUREMENT_ID');
   </script>
   ```

## 🚨 Important Notes

### Security
- **HTTPS Required**: Always use HTTPS in production
- **Form Protection**: Use Formspree or server-side validation
- **Regular Updates**: Keep any external dependencies updated

### Performance
- **Image Optimization**: Compress all images before upload
- **CDN Usage**: Consider using a CDN for faster global loading
- **Caching**: Set appropriate cache headers

### Maintenance
- **Regular Backups**: Keep backups of your website files
- **Monitor Uptime**: Use services like UptimeRobot
- **Update Content**: Keep product information and contact details current

## 📞 Support

For technical support or customization requests:

- **Email**: ng@novagenautomation.com
- **Phone**: +91-7417360330

## 📄 License

This website is built for NovaGen Automation Systems & Solution. All rights reserved.

---

**Built with ❤️ for automation excellence**

*"STAY INSPIRED. NEVER STOP CREATING."*