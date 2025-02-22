# Birthday Celebration Website

A beautiful and interactive birthday celebration website with parallax scrolling effects and modern design.

## Project Structure

```
project_058/
├── css/
│   ├── app.scss
│   ├── app.css (compiled from SCSS)
│   └── style.css
├── index.html
└── gulpfile.js
```

## Setup and Installation

1. Make sure you have [Node.js](https://nodejs.org/) installed on your system.

2. Install the project dependencies:
   ```bash
   npm install
   ```

3. Install Gulp globally (if not already installed):
   ```bash
   npm install -g gulp
   ```

## Development

To start development with automatic SCSS compilation:

1. Run Gulp to watch for SCSS changes:
   ```bash
   gulp
   ```

This will:
- Watch for changes in the `css/*.scss` files
- Automatically compile SCSS to CSS when changes are detected
- Output the compiled CSS in the same directory

## Technologies Used

- HTML5
- SCSS/CSS
- Gulp (for SCSS compilation)
- Parallax scrolling effects

## Deployment

The website can be served using any web server like Apache (XAMPP) or any other static file server.
