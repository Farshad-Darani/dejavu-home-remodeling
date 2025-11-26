# 🚀 Deployment Guide - DejaVu Home Remodeling

## 📦 Files to Upload to Your Host

### ✅ MUST UPLOAD (Required Files):
```
index.html
style.css
script.js
process-quote.php
quote-success.html
config.php          ← Your actual config with real API keys
images/             ← Entire folder with all subfolders
```

### ❌ DO NOT UPLOAD (Local/Git Files):
```
.git/               ← Git repository data
.gitignore          ← Git configuration
.DS_Store           ← Mac system file
README.md           ← GitHub documentation
config.example.php  ← Just a template
DEPLOYMENT-GUIDE.md ← This file
```

---

## 🎯 Quick Upload Methods

### Method 1: FTP/SFTP (Recommended)
**Using FileZilla, Cyberduck, or similar:**

1. **Connect to your host:**
   - Host: `ftp.yourdomain.com` or your host's FTP address
   - Username: Your hosting username
   - Password: Your hosting password
   - Port: 21 (FTP) or 22 (SFTP)

2. **Navigate to public_html or www folder**

3. **Upload these files:**
   - ✅ index.html
   - ✅ style.css
   - ✅ script.js
   - ✅ process-quote.php
   - ✅ quote-success.html
   - ✅ config.php
   - ✅ images/ (entire folder)

### Method 2: cPanel File Manager

1. Log into your cPanel
2. Open "File Manager"
3. Navigate to `public_html`
4. Click "Upload"
5. Select and upload the files listed above
6. For images folder: Upload as ZIP, then extract

### Method 3: Command Line (If you have SSH access)

```bash
# From your local terminal
cd "/Users/darani/Documents/dejavu/dejavu final + landing page"

# Upload via SCP (replace with your details)
scp -r index.html style.css script.js process-quote.php quote-success.html config.php images/ username@yourhost.com:public_html/
```

---

## ⚙️ Post-Upload Configuration

### 1. Verify File Permissions
Set these permissions via FTP or cPanel:
- **Files (html, css, js, php):** 644
- **Directories (images/):** 755
- **process-quote.php:** 644 (must be readable by web server)

### 2. Test reCAPTCHA
- Visit your website
- Try submitting the contact form
- Verify reCAPTCHA works

### 3. Update config.php if needed
If you need to change email or API keys:
```bash
# Edit directly on server via cPanel File Manager
# or edit locally and re-upload config.php
```

### 4. Test Email Delivery
- Submit a test form
- Check if email arrives at `info@dejavuhomeremodeling.com`
- Check spam folder if not received

---

## 🔧 Common Hosting Platforms

### **GoDaddy:**
1. Login to GoDaddy
2. My Products → Web Hosting → Manage
3. File Manager → public_html
4. Upload files

### **Bluehost:**
1. Login to Bluehost
2. Advanced → File Manager
3. Navigate to public_html
4. Upload files

### **HostGator:**
1. Login to cPanel
2. File Manager → public_html
3. Upload files

### **SiteGround:**
1. Site Tools → File Manager
2. public_html folder
3. Upload files

---

## ✅ Pre-Upload Checklist

- [ ] config.php has correct reCAPTCHA secret key
- [ ] config.php has correct email addresses
- [ ] All images are in the images/ folder
- [ ] index.html has correct reCAPTCHA site key
- [ ] Phone numbers are correct in index.html
- [ ] Email addresses are correct in index.html

---

## 🧪 After Upload Testing

### Test These Features:
1. ✅ Website loads properly
2. ✅ All images display correctly
3. ✅ Navigation works (smooth scrolling)
4. ✅ Contact form modal opens
5. ✅ Form submission works
6. ✅ reCAPTCHA displays
7. ✅ Email arrives after submission
8. ✅ Success page shows after submission
9. ✅ Gallery slider works
10. ✅ Floating contact button works
11. ✅ Mobile responsive (test on phone)
12. ✅ All links work (social media, phone)

### Test URLs:
- Homepage: `https://yourdomain.com/`
- Success page: `https://yourdomain.com/quote-success.html`

---

## 🐛 Troubleshooting

### Issue: "Form not working"
**Solution:** Check PHP is enabled on your hosting

### Issue: "Images not showing"
**Solution:** 
- Verify images/ folder uploaded correctly
- Check file permissions (755 for folders, 644 for images)
- Clear browser cache

### Issue: "Email not received"
**Solution:**
- Check spam folder
- Verify `config.php` has correct email
- Contact hosting support to enable PHP mail()
- Consider using SMTP instead of PHP mail()

### Issue: "reCAPTCHA not showing"
**Solution:**
- Check site key in index.html is correct
- Verify domain is authorized in Google reCAPTCHA console

---

## 📞 Need Help?

If you encounter issues:
1. Check your hosting documentation
2. Contact your hosting support
3. Verify all files uploaded correctly
4. Check file permissions

---

## 🎉 Success!

Once uploaded and tested, your website will be live at:
**https://dejavuhomeremodeling.com**

Remember to:
- Set up Google Analytics
- Set up Google Search Console
- Submit sitemap
- Start your Google Ads campaigns!

---

**Last Updated:** November 26, 2025
