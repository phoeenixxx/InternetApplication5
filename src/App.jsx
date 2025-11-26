import { useState } from "react"
import movieData from "./data.json"
import MovieCard from "./components/MovieCard"
import './App.css'

export default function App() {
    // State to hold the list of movies (initialized from the JSON file)
    const [movies, setMovies] = useState(movieData)
    // State for the search input
    const [searchTerm, setSearchTerm] = useState("")
    // State for sorting preference 
    const [sortBy, setSortBy] = useState("rating")

    // State for the "Add New Movie" form inputs
    const [newMovie, setNewMovie] = useState({
        name: "", description: "", image: "", rating: 1
    })

    // Function to delete a movie by its ID
    const deleteMovie = (id) => {
        setMovies(movies.filter(movie => movie.id !== id))
    }

    // Function to update the rating of a movie
    const updateRating = (id, newRating) => {
        // Prevent rating from going below 1 or above 10
        if (newRating < 1 || newRating > 10) return;
        
        setMovies(movies.map(movie => 
            movie.id === id ? { ...movie, rating: newRating } : movie
        ))
    }

    // Function to add a new movie to the list
    const handleAddMovie = (e) => {
        e.preventDefault() // Prevent page reload on form submit
        
        // Basic validation
        if (!newMovie.name || !newMovie.description) return alert("Please fill in details!")
        
        const movieToAdd = {
            ...newMovie,
            id: Date.now(), // Generate a unique ID using timestamp
            // Use a placeholder image if the user didn't provide one
            image: newMovie.image || "https://via.placeholder.com/300x450?text=No+Image" 
        }

        setMovies([...movies, movieToAdd]) // Add new movie to the end of the array
        setNewMovie({ name: "", description: "", image: "", rating: 1 }) // Reset form
    }

    // Logic for searching and sorting the movie list
    const processedMovies = movies
        .filter(movie => 
            // Case-insensitive search
            movie.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .sort((a, b) => {
            // Sort logic based on selected option
            if (sortBy === "rating") return b.rating - a.rating // Descending order
            if (sortBy === "name") return a.name.localeCompare(b.name) // Alphabetical order
            return 0
        })

    return (
        <div className="container" style={{padding: "20px", maxWidth: "1200px", margin: "0 auto", fontFamily: "Arial, sans-serif"}}>
            
            <h1 style={{textAlign: "center", color: "#ffffff"}}>Movie Collection</h1>

            {/* Top Bar: Search Input and Sort Dropdown */}
            <div style={{background: "#f4f4f4", padding: "15px", borderRadius: "8px", marginBottom: "20px", display: "flex", gap: "10px", flexWrap: "wrap"}}>
                <input 
                    type="text" 
                    placeholder="Search movies..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{padding: "8px", flexGrow: 1}}
                />
                <select 
                    value={sortBy} 
                    onChange={(e) => setSortBy(e.target.value)}
                    style={{padding: "8px"}}
                >
                    <option value="rating">Sort by Rating</option>
                    <option value="name">Sort by Name</option>
                </select>
            </div>

            {/* Form to add a new movie */}
            <form onSubmit={handleAddMovie} style={{background: "#eee", padding: "15px", borderRadius: "8px", marginBottom: "30px", display: "flex", gap: "10px", flexWrap: "wrap"}}>
                <input 
                    type="text" placeholder="Title" 
                    value={newMovie.name}
                    onChange={e => setNewMovie({...newMovie, name: e.target.value})}
                    style={{padding: "8px", flex: "1"}} required
                />
                <input 
                    type="text" placeholder="Image URL" 
                    value={newMovie.image}
                    onChange={e => setNewMovie({...newMovie, image: e.target.value})}
                    style={{padding: "8px", flex: "1"}} 
                />
                <input 
                    type="number" min="1" max="10" placeholder="Rate" 
                    value={newMovie.rating}
                    onChange={e => setNewMovie({...newMovie, rating: Number(e.target.value)})}
                    style={{padding: "8px", width: "60px"}} 
                />
                <input 
                    type="text" placeholder="Description" 
                    value={newMovie.description}
                    onChange={e => setNewMovie({...newMovie, description: e.target.value})}
                    style={{padding: "8px", flex: "2"}} required
                />
                <button type="submit" style={{padding: "8px 20px", background: "#2ecc71", color: "white", border: "none", cursor: "pointer"}}>Add Movie</button>
            </form>

            {/* Grid display of movie cards */}
            {processedMovies.length > 0 ? (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: "20px" }}>
                    {processedMovies.map(movie => (
                        <MovieCard 
                            key={movie.id} 
                            item={movie} 
                            onDelete={deleteMovie}
                            onRate={updateRating}
                        />
                    ))}
                </div>
            ) : (
                <h3 style={{textAlign: "center", color: "#777"}}>No movies found...</h3>
            )}
        </div>
    )
}
