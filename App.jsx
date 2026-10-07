import { useState } from "react";
import "./App.css";

const movies = [
  {
    id: 1,
    title: "Inception",
    genre: "Sci-Fi",
    year: 2010,
    rating: 8.8,
    emoji: "🌀",
    description:
      "A skilled thief enters people's dreams and steals valuable secrets."
  },
  {
    id: 2,
    title: "Interstellar",
    genre: "Sci-Fi",
    year: 2014,
    rating: 8.7,
    emoji: "🚀",
    description:
      "A team of explorers travels through a wormhole to find a new home for humanity."
  },
  {
    id: 3,
    title: "The Dark Knight",
    genre: "Action",
    year: 2008,
    rating: 9.0,
    emoji: "🦇",
    description:
      "Batman faces a dangerous criminal mastermind known as the Joker."
  },
  {
    id: 4,
    title: "Avatar",
    genre: "Adventure",
    year: 2009,
    rating: 7.9,
    emoji: "🌌",
    description:
      "A marine discovers the beautiful world of Pandora and its people."
  },
  {
    id: 5,
    title: "Titanic",
    genre: "Romance",
    year: 1997,
    rating: 7.9,
    emoji: "🚢",
    description:
      "A young couple from different social backgrounds fall in love aboard the Titanic."
  },
  {
    id: 6,
    title: "The Matrix",
    genre: "Action",
    year: 1999,
    rating: 8.7,
    emoji: "💊",
    description:
      "A hacker discovers that the world he knows is actually a simulated reality."
  },
  {
    id: 7,
    title: "Joker",
    genre: "Drama",
    year: 2019,
    rating: 8.3,
    emoji: "🃏",
    description:
      "A troubled man slowly transforms into the infamous Joker."
  },
  {
    id: 8,
    title: "Avengers",
    genre: "Action",
    year: 2012,
    rating: 8.0,
    emoji: "⚡",
    description:
      "Earth's greatest heroes join together to stop a powerful enemy."
  }
];

function App() {
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("All");
  const [favorites, setFavorites] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const genres = ["All", "Action", "Sci-Fi", "Adventure", "Romance", "Drama"];

  const filteredMovies = movies.filter((movie) => {
    const matchesSearch = movie.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesGenre = genre === "All" || movie.genre === genre;

    return matchesSearch && matchesGenre;
  });

  const toggleFavorite = (id) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter((movieId) => movieId !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  return (
    <div className="app">

      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">🎬 Movie Explorer</div>

        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#movies">Movies</a>
          <a href="#favorites">Favorites ({favorites.length})</a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero" id="home">
        <div className="hero-content">
          <p className="small-title">WELCOME TO</p>

          <h1>
            Discover Your Next
            <span> Favorite Movie</span>
          </h1>

          <p>
            Explore movies, search by title, filter by genre,
            and save your favorite movies.
          </p>

          <a href="#movies" className="explore-btn">
            Explore Movies →
          </a>
        </div>
      </section>

      {/* Movie Section */}
      <section className="movie-section" id="movies">

        <h2>🎥 Explore Movies</h2>

        {/* Search and Filter */}
        <div className="controls">

          <input
            type="text"
            placeholder="🔍 Search for a movie..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
          >
            {genres.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>

        </div>

        {/* Movie Cards */}
        <div className="movie-grid">

          {filteredMovies.length > 0 ? (
            filteredMovies.map((movie) => (
              <div className="movie-card" key={movie.id}>

                <div className="poster">
                  <span>{movie.emoji}</span>
                  <div className="rating">
                    ⭐ {movie.rating}
                  </div>
                </div>

                <div className="movie-info">
                  <h3>{movie.title}</h3>

                  <p>
                    {movie.genre} • {movie.year}
                  </p>

                  <div className="card-buttons">

                    <button
                      className="details-btn"
                      onClick={() => setSelectedMovie(movie)}
                    >
                      View Details
                    </button>

                    <button
                      className="favorite-btn"
                      onClick={() => toggleFavorite(movie.id)}
                    >
                      {favorites.includes(movie.id) ? "❤️" : "🤍"}
                    </button>

                  </div>
                </div>

              </div>
            ))
          ) : (
            <div className="no-results">
              <h3>😕 Movie Not Found</h3>
              <p>Try another movie name or genre.</p>
            </div>
          )}

        </div>
      </section>

      {/* Favorites */}
      <section className="favorites-section" id="favorites">

        <h2>❤️ My Favorites</h2>

        {favorites.length === 0 ? (
          <p className="empty">
            You haven't added any favorite movies yet.
          </p>
        ) : (
          <div className="favorite-list">
            {movies
              .filter((movie) => favorites.includes(movie.id))
              .map((movie) => (
                <div className="favorite-item" key={movie.id}>
                  <span>{movie.emoji}</span>
                  <div>
                    <strong>{movie.title}</strong>
                    <p>{movie.genre} • ⭐ {movie.rating}</p>
                  </div>
                </div>
              ))}
          </div>
        )}

      </section>

      {/* Details Modal */}
      {selectedMovie && (
        <div
          className="modal-background"
          onClick={() => setSelectedMovie(null)}
        >
          <div
            className="modal"
            onClick={(e) => e.stopPropagation()}
          >

            <button
              className="close-btn"
              onClick={() => setSelectedMovie(null)}
            >
              ✕
            </button>

            <div className="modal-poster">
              {selectedMovie.emoji}
            </div>

            <h2>{selectedMovie.title}</h2>

            <p className="modal-meta">
              {selectedMovie.genre} • {selectedMovie.year} • ⭐{" "}
              {selectedMovie.rating}
            </p>

            <p>{selectedMovie.description}</p>

            <button
              className="add-btn"
              onClick={() => toggleFavorite(selectedMovie.id)}
            >
              {favorites.includes(selectedMovie.id)
                ? "❤️ Remove from Favorites"
                : "🤍 Add to Favorites"}
            </button>

          </div>
        </div>
      )}

      {/* Footer */}
      <footer>
        <p>🎬 Movie Explorer | Built with React.js</p>
      </footer>

    </div>
  );
}

export default App;