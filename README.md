# Cam Mate Website

This is the official website for Cam Mate, an intelligent AI camera assistant that enhances your existing security camera system.

## Features

- Modern, responsive design
- Contact form integration
- Built with TailwindCSS
- GitHub Pages ready

## Setup

1. Clone this repository:
```bash
git clone https://github.com/yourusername/CamMate.git
cd CamMate
```

2. Configure the contact form:
   - Sign up for a free account at [Formspree](https://formspree.io)
   - Create a new form and get your form ID
   - Replace `your-form-id` in `cammate.js` with your actual Formspree form ID

3. Customize content:
   - Update text and images in `index.html`
   - Modify styles in the TailwindCSS classes
   - Add your own logo and favicon in the `assets` directory

## Deployment

This website is designed to be deployed on GitHub Pages:

1. Push your code to GitHub:
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. Enable GitHub Pages:
   - Go to your repository settings
   - Navigate to the "Pages" section
   - Select the main branch as source
   - Save the changes

Your website will be available at `https://yourusername.github.io/CamMate`

## Development

To modify the website:

1. Make your changes to the HTML, CSS, or JavaScript files
2. Test locally by opening `index.html` in a browser
3. Commit and push your changes
4. GitHub Pages will automatically update your site

## Contact Form

The contact form uses Formspree as a serverless solution. To test:

1. Fill out the form on your website
2. Submit the form
3. Check your Formspree dashboard for the submission

## License

MIT License - feel free to use this template for your own projects!

## Support

For support, please open an issue in the GitHub repository or contact us through the website.

# CamMate

CamMate is a web-based interface for a camera management system that supports ONVIF and RTSP cameras.

## Modular HTML Implementation

This project implements a modular approach to HTML development, allowing for component reuse across pages. The implementation uses client-side includes to load HTML components dynamically.

### Project Structure

```
CamMate/
├── assets/
│   ├── css/
│   ├── fonts/
│   └── images/
├── components/
│   ├── common/
│   │   └── server-include.js
│   ├── layout/
│   │   ├── footer.html
│   │   ├── header.html
│   │   └── head.html
│   └── sections/
│       ├── cameras-cta.html
│       ├── generic-rtsp.html
│       ├── onvif-cameras.html
│       └── rtsp-cameras.html
├── index.html              // Original version
├── index-modular.html      // Modular version
├── cameras.html            // Original version
├── cameras-modular.html    // Modular version
├── cammate.js
└── README.md
```

### How It Works

The modular implementation uses a simple client-side include system. Each component is defined in a separate HTML file, and loaded dynamically when the page loads.

1. HTML elements with the `data-include` attribute specify which component file to load.
2. The `server-include.js` script finds these elements and loads the specified HTML file.
3. The loaded content replaces the element's inner HTML.

## Testing Locally

To test the modular implementation locally, you'll need to serve the files through a web server. This is necessary because browsers restrict loading local files through JavaScript fetch calls due to security policies.

### Option 1: Using Python's built-in HTTP server

If you have Python installed, you can use its built-in HTTP server:

For Python 3:
```
python -m http.server
```

For Python 2:
```
python -m SimpleHTTPServer
```

Then visit `http://localhost:8000/index-modular.html` or `http://localhost:8000/cameras-modular.html` in your browser.

### Option 2: Using Node.js with a simple HTTP server

If you have Node.js installed, you can use a package like `http-server`:

1. Install http-server globally:
```
npm install -g http-server
```

2. Navigate to your project directory and run:
```
http-server
```

3. Visit `http://localhost:8080/index-modular.html` or `http://localhost:8080/cameras-modular.html` in your browser.

### Option 3: Using VS Code Live Server

If you're using Visual Studio Code, you can use the Live Server extension:

1. Install the "Live Server" extension by Ritwick Dey
2. Right-click on `index-modular.html` or `cameras-modular.html` in the file explorer
3. Select "Open with Live Server"

## Benefits of Modular Components

- **Code Reuse**: Common elements like headers and footers are defined once and reused across pages.
- **Maintainability**: Changes to shared components only need to be made in one place.
- **Separation of Concerns**: Each component focuses on a specific piece of the UI.
- **Easier Development**: Team members can work on different components simultaneously.

## Future Improvements

- Implement a build system to pre-compile the HTML files for production
- Add parameters to components for more flexibility
- Create additional components for other shared sections of the site 