import FavoriteButton from "./FavoriteButton";

export default function AirbnbCard({ item }) {
    return (
        <div className="airbnb-card">
            <a href={`/airbnblist/${item.id}`}>
                <div className="airbnb-content">
                    <p className="airbnb-name">{item.name}</p>
                    <p className="airbnb-summary">{item.summary}</p>
                    <FavoriteButton id={item.id} />
                </div>
                <div className="airbnb-image-container">
                    <img className="airbnb-image" src={item.image} />
                </div>
            </a>
        </div>
    )
}