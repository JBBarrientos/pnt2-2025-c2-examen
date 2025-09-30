"use client"
import { useParams } from "next/navigation"
import "../../components/airbnb/airbnblist.css"
import { useCallback, useEffect, useState } from "react"
import { FaSpinner } from "react-icons/fa"
export default function AirbnbCardDetails() {
    const { id } = useParams()
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState(null)
    console.log(data)
    const fetchData = useCallback(async () => {
        setLoading(true)
        const url = new URL("https://backendairbnb-befph8eegzabfudb.eastus2-01.azurewebsites.net/api/listings/" + id.toString())

        const headers = new Headers()
        headers.append("Authorization", "Bearer " + localStorage.getItem('authToken'))

        const response = await fetch(url, { headers })
        const data = await response.json()

        setLoading(false)
        return data
    }, [])

    useEffect(() => {
        async function fetchCard() {
            const data = await fetchData()
            setData(data)
        }
        fetchCard()
    }, [setData, fetchData])

    if (!data) return (
        <div className="airbnb-page airbnb-loader">
            <FaSpinner className="loading-spinner" />
        </div>
    )
    return (
        <div className="airbnb-page">
            <div className="airbnb-detail-container">
                <div className="airbnb-detail-header">
                    <a className="back-button" href="/airbnblist">Volver al listado</a>
                    <p className="airbnb-detail-title">
                        {data.name}
                    </p>
                </div>
                <div className="airbnb-detail-content">
                    <div className="airbnb-detail-image-container">
                        <img className="airbnb-detail-image" src={data.images.picture_url} />
                    </div>
                    <div className="airbnb-detail-info">
                        <p className="airbnb-detail-summary">{data.summary}</p>
                    </div>
                    <div className="airbnb-detail-url-container">
                        <div className="airbnb-detail-url-label">
                            <p>Ver en Articulo</p>
                            <a className="airbnb-detail-url-label" href={data.listing_url}>
                                {data.listing_url}
                            </a>
                        </div>

                    </div>
                </div>


            </div>
        </div>
    )
}