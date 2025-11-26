# 🏠 DejaVu Home Remodeling Website

Professional, conversion-optimized landing page for a premium home remodeling company serving Orange County, California.

![Project Preview](images/home-hero-background.jpg)

## ✨ Features

- **Conversion-Optimized Design**: Streamlined 3-field contact form for maximum lead generation
- **Mobile-First Responsive**: Seamless experience across all devices
- **Interactive Elements**:
  - Floating contact button with modal popup
  - Full-screen hero section with animated elements
  - 10-image project gallery with navigation
  - Smooth scrolling and transitions
- **Service Sections**: Kitchen, Bathroom, Full Home Renovation, Outdoor Living
- **Social Proof**: Client testimonials with 5-star ratings
- **Google Maps Integration**: Service area visualization
- **Professional Typography**: Poppins font family throughout

## 🛠️ Tech Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Backend**: PHP (form processing)
- **Integrations**: 
  - Google reCAPTCHA v2
  - Google Maps Embed API
  - Font Awesome 6.4.0
  - Google Fonts

## 📋 Prerequisites

- Web server with PHP support (Apache/Nginx)
- PHP 7.4 or higher
- Google reCAPTCHA keys ([Get them here](https://www.google.com/recaptcha/admin))

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Farshad-Darani/dejavu-home-remodeling.git
   cd dejavu-home-remodeling
   ```

2. **Configure sensitive data**
   ```bash
   cp config.example.php config.php
   ```
   Edit `config.php` with your actual values:
   - Google reCAPTCHA secret key
   - Business email addresses
   - Company name

3. **Update reCAPTCHA site key**
   - Open `index.html`
   - Find the reCAPTCHA div (search for `data-sitekey`)
   - Replace with your site key

4. **Deploy to web server**
   - Upload all files to your web hosting
   - Ensure PHP is enabled
   - Test the contact form

## 📁 Project Structure

```
dejavu-home-remodeling/
├── index.html              # Main landing page
├── style.css               # All styles
├── script.js               # Interactive functionality
├── process-quote.php       # Form submission handler
├── quote-success.html      # Thank you page
├── config.php              # Configuration (not in repo)
├── config.example.php      # Configuration template
├── images/                 # All images and gallery
│   ├── gallery/           # Project galleries
│   └── mobile/            # Mobile-optimized images
└── .gitignore             # Git ignore rules
```

## 🎨 Customization

### Brand Colors
Update these CSS variables in `style.css`:
- Primary Gold: `#E9C46A`
- Navy Blue: `#1A2332`
- White/Light: `#f8f9fa`

### Contact Information
Update in `index.html`:
- Phone number: Search for `+1 (949) 416-4471`
- Email: Search for `info@dejavuhomeremodeling.com`
- Address: Search for `123 Gateway Center Drive`

### Service Areas
Edit the cities list in the Service Areas section around line 670

## 📱 Mobile Optimization

- Floating contact button becomes icon-only on mobile
- Responsive grid layouts adapt to screen size
- Touch-friendly navigation and buttons
- Optimized images for mobile devices

## 🔒 Security Notes

**Never commit these files to public repositories:**
- `config.php` - Contains API keys and sensitive data
- Any files with email credentials
- Database connection strings

The `.gitignore` file is configured to protect these automatically.

## 📊 Google Ads Integration

This landing page is optimized for Google Ads campaigns:
- Fast loading time
- Clear call-to-actions
- Mobile-responsive
- Service-specific sections for ad targeting
- Simplified form for high conversion rates

**Recommended ad targeting:**
- Kitchen remodeling Orange County
- Bathroom renovation Irvine
- Home remodeling Newport Beach

## 🤝 Contributing

This is a business website, but suggestions for improvements are welcome! Open an issue or submit a pull request.

## 📄 License

© 2025 DejaVu Home Remodeling. All Rights Reserved.

This code is provided for reference and educational purposes. Please customize for your own business use.

## 📞 Contact

**DejaVu Home Remodeling**
- 📱 Phone: +1 (949) 416-4471
- 📧 Email: info@dejavuhomeremodeling.com
- 📍 Location: Irvine, CA 92618
- 🌐 Serving: Orange County, California

---

**Built with ❤️ for Orange County homeowners**
