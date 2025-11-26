// src/components/MovieCard.jsx

export default function MovieCard({ item, onDelete, onRate }) {
    
    const handleImageError = (e) => {
        e.target.src = "https://via.placeholder.com/300x450?text=No+Image"; // სათადარიგო ფოტო
    }

    return (
        <div className="movie-card" style={{ 
            border: "1px solid #444", 
            padding: "15px", 
            borderRadius: "12px", 
            background: "#222", 
            color: "white",
            display: "flex",
            flexDirection: "column",
            boxShadow: "0 4px 8px rgba(0,0,0,0.3)"
        }}>
            {/* Movie Image */}
            <img 
                src={item.image} 
                alt={item.name} 
                onError={handleImageError} 
                style={{ width: "100%", height: "300px", objectFit: "cover", borderRadius: "8px", marginBottom: "10px" }} 
            />
            
            <h3 style={{marginTop: "0", fontSize: "1.2rem"}}>{item.name}</h3>
            
            <p style={{fontSize: "13px", color: "#ccc", flexGrow: 1, marginBottom: "15px"}}>
                {item.description}
            </p>

            <div style={{borderTop: "1px solid #555", paddingTop: "10px", display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                
                <div style={{display: "flex", alignItems: "center", gap: "5px"}}>
                    <span style={{color: "gold", fontWeight: "bold"}}>⭐ {item.rating}</span>
                    <div style={{display: "flex", flexDirection: "column"}}>
                        <button 
                            onClick={() => onRate(item.id, item.rating + 1)}
                            style={{background: "none", border: "none", color: "#fff", cursor: "pointer", fontSize: "10px"}}
                        >▲</button>
                        <button 
                            onClick={() => onRate(item.id, item.rating - 1)}
                            style={{background: "none", border: "none", color: "#fff", cursor: "pointer", fontSize: "10px"}}
                        >▼</button>
                    </div>
                </div>

                <button 
                    onClick={() => onDelete(item.id)}
                    style={{
                        background: "#e74c3c", 
                        border: "none", 
                        color: "white", 
                        padding: "5px 10px", 
                        borderRadius: "4px", 
                        cursor: "pointer"
                    }}
                >
                    Delete
                </button>
            </div>
        </div>
    )
}