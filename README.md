# JustStreamIt - Movie Streaming Frontend

## 📖 About the Project

JustStreamIt is a vanilla JavaScript frontend application that displays movies fetched from a local REST API.
This project was developed as an exercise of a training program focused on mastering HTML, CSS and JavaScript without any framework.

### Key Features

- **Best Movie Showcase**: Displays the highest-rated movie with full details
- **Top Rated Movies**: Grid of the best rated movies sorted by IMDB score
- **Genre Categories**: Two randomly selected genre categories displayed as movie grids
- **Custom Category**: A selectable category allowing the user to browse movies by genre, excepted those already 
  displayed in previous random categories
- **Movie Modal**: Click any movie or its button to open a detailed modal window
- **Responsive Design**: Fully responsive layout for desktop, tablet and mobile screens
- **No CSS Framework**: Pure custom CSS, no Bootstrap or Tailwind

---

## 🔗 Required API

This project depends on the **OCMovies API** to fetch movie data.

👉 [OCMovies-API repository](https://github.com/OpenClassrooms-Student-Center/OCMovies-API-EN-FR)

The API must be running locally before starting the frontend.
Please refer to the API repository for installation and startup instructions.

By default, the frontend expects the API to be available at:
[http://localhost:8000/api/v1/](http://localhost:8000/api/v1/)


---

## 🚀 Quick Start

### Prerequisites

- The [OCMovies API](https://github.com/OpenClassrooms-Student-Center/OCMovies-API-EN-FR) running locally on port `8000`
- A modern web browser (Chrome, Firefox, Edge, Safari)
- A local web server

### Running the Application

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd just_stream_it
   ```

2. **Start the OCMovies API**

   Follow the instructions in the [OCMovies API repository](https://github.com/OpenClassrooms-Student-Center/OCMovies-API-EN-FR) to start the API server.

3. **Serve the frontend**

   Open `index.html` with a local web server.


4. **Open the application**

   Navigate to localhost in your browser.

---

## 🛠️ Tech Stack

- **Language**: Vanilla JavaScript (ES6+ modules)
- **Styling**: Pure CSS with custom properties (no framework)
- **API Communication**: Fetch API
- **Font**: Oswald (self-hosted, woff2)
- **Validation**: W3C HTML & CSS validated

---


## ⚠️ Important Notes

### API Dependency

The frontend is entirely dependent on the OCMovies API running locally.
Without it, no movie data will be displayed.

### Image Availability

Some movie images hosted on Amazon Media may fail to load.
A CSS placeholder is displayed in place of any broken image.

### Development Server

The application uses JavaScript ES6 modules (`type="module"`), which require
being served over HTTP — opening `index.html` directly as a file (`file://`) will **not** work.

---

## 🐛 Troubleshooting

**No movies displayed**: Make sure the OCMovies API is running on `http://localhost:8000`.

**Blank page / console errors**: Ensure you are serving the project via a local web server and not opening the HTML file directly.

**CORS errors**: The OCMovies API must be configured to allow requests from your local server's origin.

---

## 👤 Author
Arnaud Goguelin
