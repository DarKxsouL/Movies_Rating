# 🎬 Movie Library  

## 📌 Project Description  
Movie Library is a **frontend React project** that allows users to explore movies, view detailed information, and manage their personal watchlist.  
It integrates with the **IMDb API via RapidAPI** to fetch movie data and uses **React Router** for navigation.  

---

## 🚀 Features  
- 🔍 **Search movies** by title.  
- 🎞 **Movie page**: Displays fetched movies with hover effects.  
- 📄 **Movie details page**: Shows title, release date, rating, content rating, watch time, overview, genres, country of origin, trailer link, and watchlist buttons.  
- 📝 **Watchlist page**: Allows adding/removing movies and searching within the watchlist.  
- 💾 **LocalStorage support** for watchlist persistence.  
- 🌐 **React routing & dynamic routing** for seamless navigation.  

---

## 🛠 Tech Stack  
- **Domain**: Frontend Development  
- **Framework**: React  
- **Languages**: JavaScript, CSS  
- **API**: RapidAPI (IMDb)  
- **Libraries**: `react-router`, `lucide-react`  

---

## 📂 Project Structure  
```
movie-library/
│── src/
│   ├── components/    # Reusable components
│   ├── pages/         # Movie page, Watchlist page, Details page
│   ├── App.js         # Routing setup
│   └── main.jsx       # Entry point
│── public/            # Static files
│── package.json
│── README.md
```

---

## ⚙️ Setup & Run Locally  

1. Clone the repository:  
   ```bash
   git clone <your-repo-link>
   cd movie-library
   ```

2. Install dependencies:  
   ```bash
   npm install
   npm install react-router
   npm install lucide-react
   ```

3. Start the development server:  
   ```bash
   npm run dev
   ```

4. Open in browser:  
   ```
   http://localhost:5173
   ```

---

## 🧪 Test Instructions  

Currently, **no automated test framework (like Jest) has been integrated**.  
To test the project:  

1. Run the application using `npm run dev`.  
2. Manually verify the following:  
   - Searching movies by title filters results.  
   - Clicking a movie opens its details page.  
   - Hovering over a movie shows its title and watchlist button.  
   - Adding/removing movies updates the watchlist and persists in LocalStorage.  
   - Watchlist search works correctly.  
   - Trailer button redirects to the trailer.  

---

## 📌 Assumptions & Design Choices  
- Used **LocalStorage** to persist watchlist since no backend was required.  
- Chose **React Router** for navigation and dynamic routes for movie details.  
- Designed a **simple and clean UI** for easy usability.  
