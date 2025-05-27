import { useState, useEffect, useRef } from "react"
import { generateYouTubeEmbedCode } from "../utilities/utilities.js"

// WARNING: THIS IS EXPOSED ON GITHUB
const KEY = "AIzaSyDvXduLRfPj7K8meRCtfnO4E4sdt35YxMg"


function YTAPIExpandableVideos({ query, algorithms }) {

    const [ytIds, setYtIds] = useState(() => {
        const ids = []
        for (let i = 0; i < 5; i++) {
            ids.push(null)
        }
        return ids
    })
    const mountedRef = useRef(false)

    async function loadVideos() {
        const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURI(query)}&type=video&maxResults=5&key=${KEY}`
        const res = await fetch(url)
        const data = await res.json()
        console.log(data)
        const ids = []
        for (let i = 0; i < 5; i++) {
            let id = data?.items[i]?.id?.videoId
            ids.push(id)
        }
        setYtIds(ids)
    }

    useEffect(() => {
        // Prevent double calls in safe mode
        if (mountedRef.current) return
        mountedRef.current = true
        loadVideos()
    }, [])

    return (
        <div style={{
            display: 'grid',
            gridTemplateColumns: `repeat(5, 1fr)`,
            gap: "1rem",
            padding: "1rem",
            width: "250%"
        }}>
            {ytIds.map(id => {
                if (id) return (
                    <div dangerouslySetInnerHTML={{
                        __html: generateYouTubeEmbedCode(id, "100%")
                    }}></div>
                )

                if (id === null) return (
                    <p>Loading...</p>
                )

                return (
                    <p>No video found.</p>
                )
            })}
        </div>
    )
}

export default YTAPIExpandableVideos