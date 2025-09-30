import { useCallback, useState } from "react"
import { FaHeart } from "react-icons/fa"

export default function FavoriteButton({ id }) {
    const toggleFavorite = useCallback((id) => {
        const item = localStorage.getItem(id)
        if (item) {
            localStorage.removeItem(id)
        } else {
            localStorage.setItem(id, id)
        }
        setFavorite(!item)
    }, [])

    const [isFavorite, setFavorite] = useState(!!localStorage.getItem(id.toString()))
    if (isFavorite) {
        return (
            <button className="favorite-button" onClick={() => toggleFavorite(id)}>
                <FaHeart className="favorite-icon favorited" />
            </button>
        )
    } else {
        return (
            <button className="favorite-button" onClick={() => toggleFavorite(id)}>
                <FaHeart className="favorite-icon not-favorited" />
            </button>
        )
    }
}