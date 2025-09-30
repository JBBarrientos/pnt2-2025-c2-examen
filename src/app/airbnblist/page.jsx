"use client"
import { useCallback, useEffect, useMemo, useState } from "react"
import { AirbnbItem } from "../components/airbnb/AirbnbItem"
import { FaSpinner } from "react-icons/fa"
import AirbnbCard from "../components/airbnb/AirbnbCard"
import "../components/airbnb/airbnblist.css"
import AirbnbPaginator from "../components/airbnb/AirbnbPaginator"
export const MAX_ITEMS_PER_PAGE = 100
export const MAX_ITEMS = 55000
export const MIN_PAGE = 1
export const MAX_PAGE = Math.floor(MAX_ITEMS / MAX_ITEMS_PER_PAGE)

export default function AirbnbListPage() {
    const [loading, setLoading] = useState(true)
    const [currentPage, setCurrentPage] = useState(1)
    const [list, setList] = useState([])

    const fetchData = useCallback(async (pageSize, page) => {
        setLoading(true)
        const url = new URL("https://backendairbnb-befph8eegzabfudb.eastus2-01.azurewebsites.net/api/listings")
        url.searchParams.append("pageSize", pageSize)
        url.searchParams.append("page", page)

        const headers = new Headers()
        headers.append("Authorization", "Bearer " + localStorage.getItem('authToken'))

        const response = await fetch(url, { headers })
        const data = await response.json()

        setLoading(false)
        return data
    }, [])

    const items = useMemo(() => list.map(item =>
        new AirbnbItem(item._id, item.name, item.listing_url, item.summary, item.images?.picture_url || "")),
        [list]
    )

    const nextPage = useCallback(() => {
        setCurrentPage(prev => Math.min(MAX_PAGE, prev + 1))
    }, [setCurrentPage])

    const prevPage = useCallback(() => {
        setCurrentPage(prev => Math.max(MIN_PAGE, prev - 1))
    }, [setCurrentPage])

    const setPage = useCallback((selectedPage) => {
        let result
        if (selectedPage < MIN_PAGE) {
            result = MIN_PAGE
        } else if (selectedPage > MAX_PAGE) {
            result = MAX_PAGE
        } else {
            result = selectedPage
        }
        setCurrentPage(result)
    }, [])


    useEffect(() => {
        async function fetchList() {
            const list = await fetchData(MAX_ITEMS_PER_PAGE, currentPage)
            setList(list)
        }
        fetchList()
    }, [fetchData, currentPage])

    if (loading) return (
        <div className="airbnb-page airbnb-loader">
            <FaSpinner className="loading-spinner" />
        </div>
    )
    return (
        <div className="airbnb-page">
            <div className="airbnb-container">
                <div className="airbnb-grid">
                    {items.map(item => (
                        <AirbnbCard key={item.id} item={item} />
                    ))}
                </div>
                <AirbnbPaginator nextPage={nextPage} prevPage={prevPage} setPage={setPage} currentPage={currentPage} />
            </div>
        </div>
    )
}