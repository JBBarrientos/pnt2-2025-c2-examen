
export default function AirbnbPaginator({ prevPage, nextPage, setPage, currentPage }) {
    return (
        <div className="airbnb-paginator-container">
            <button onClick={prevPage}>Prev</button>
            {Array(10).fill("").map((_, index) => <button key={index} onClick={() => setPage(currentPage + index)}>{currentPage + index}</button>)}
            <button onClick={nextPage}>Next</button>
        </div>
    )
}