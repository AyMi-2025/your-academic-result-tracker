# 🚀 GitHub Deployment Guide

This guide will help you deploy your Academic Results Tracker to GitHub and make it live using GitHub Pages.

## Step 1: Create a GitHub Repository

1. Go to [GitHub](https://github.com) and sign in
2. Click the **"+"** icon in the top right corner
3. Select **"New repository"**
4. Fill in the details:
   - **Repository name**: `academic-results-tracker` (or your preferred name)
   - **Description**: "A web app to track academic results from 1st-12th grade and competitive exams"
   - **Visibility**: Choose Public or Private
   - **DO NOT** initialize with README (we already have one)
5. Click **"Create repository"**

## Step 2: Upload Files to GitHub

### Option A: Using Git (Command Line)

If you have Git installed:

```bash
# Navigate to the project folder
cd path/to/academic-results-tracker

# Initialize git repository
git init

# Add all files
git add .

# Commit the files
git commit -m "Initial commit: Academic Results Tracker"

# Add your GitHub repository as remote
git remote add origin https://github.com/YOUR-USERNAME/academic-results-tracker.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Option B: Using GitHub Web Interface

If you prefer not to use command line:

1. Go to your newly created repository on GitHub
2. Click **"uploading an existing file"** link
3. Drag and drop all files:
   - `index.html`
   - `styles.css`
   - `script.js`
   - `README.md`
   - `LICENSE`
   - `CONTRIBUTING.md`
   - `.gitignore`
4. Add commit message: "Initial commit"
5. Click **"Commit changes"**

## Step 3: Enable GitHub Pages

1. In your repository, click **"Settings"** tab
2. Scroll down to **"Pages"** in the left sidebar
3. Under **"Source"**, select:
   - Branch: **main**
   - Folder: **/ (root)**
4. Click **"Save"**
5. Wait 1-2 minutes for deployment
6. Your site will be live at:
   ```
   https://YOUR-USERNAME.github.io/academic-results-tracker/
   ```

## Step 4: Verify Deployment

1. Visit your GitHub Pages URL
2. Test all features:
   - Add a school result
   - Add a competitive exam result
   - View all results
   - Delete a result
3. Test on mobile/tablet devices
4. Check browser console for any errors (F12)

## Step 5: Customize (Optional)

### Update README.md

Edit the README.md file and replace:
- `[Your Name]` with your actual name
- `[Your GitHub Pages URL]` with your actual URL
- Add screenshots if desired

### Update LICENSE

Replace `[Your Name]` with your actual name in the LICENSE file.

## Troubleshooting

### Site Not Loading

- Wait 5-10 minutes after enabling Pages
- Clear browser cache (Ctrl+F5 or Cmd+Shift+R)
- Check Settings → Pages for deployment status

### CSS/JS Not Loading

- Ensure all files are in the root directory
- Check file names match exactly (case-sensitive)
- Verify paths in `index.html`:
  ```html
  <link rel="stylesheet" href="styles.css">
  <script src="script.js"></script>
  ```

### Data Not Persisting

- This is normal - localStorage is browser-specific
- Each browser/device has separate storage
- Data clears if you clear browser data

## Making Updates

After making changes to your code:

```bash
# Add changed files
git add .

# Commit changes
git commit -m "Description of changes"

# Push to GitHub
git push origin main
```

GitHub Pages will automatically redeploy (takes 1-2 minutes).

## Custom Domain (Optional)

To use a custom domain:

1. Buy a domain from any registrar
2. In repository Settings → Pages → Custom domain
3. Enter your domain name
4. Follow DNS configuration instructions
5. Wait for DNS propagation (up to 48 hours)

## Security Notes

- Data is stored locally in browser
- No server-side processing
- No data transmitted over network
- Safe for storing personal academic records

## Sharing Your Project

Share your project URL:
```
https://YOUR-USERNAME.github.io/academic-results-tracker/
```

Add badges to README (optional):
```markdown
![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Live-success)
![Version](https://img.shields.io/badge/version-1.0.0-blue)
```

## Need Help?

- Check [GitHub Pages Documentation](https://docs.github.com/en/pages)
- Open an issue in this repository
- Check existing issues for solutions

---

**Congratulations! Your Academic Results Tracker is now live! 🎉**
