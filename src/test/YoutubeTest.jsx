import { useState, useEffect, useRef } from "react";

const KEY = "AIzaSyDvXduLRfPj7K8meRCtfnO4E4sdt35YxMg"
const QUERY = "Lionel Messi 2023"

function generateYouTubeEmbedCode(videoId, width = 560, height = 315) {
  if (!videoId) {
    throw new Error("A valid YouTube video ID is required.");
  }

  return `
    <iframe width="${width}" height="${height}" 
        src="https://www.youtube.com/embed/${videoId}" 
        title="YouTube video player" 
        frameborder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
        allowfullscreen>
    </iframe>
  `;
}


function YoutubeTest() {

    const [ytId, setYtId] = useState(null)
    const mountedRef = useRef(false)

    async function test() {
        const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURI(QUERY)}&type=video&maxResults=5&key=${KEY}`
        const res = await fetch(url)
        const data = await res.json()
        //  data -> items[0] -> id -> videoId
        console.log(data)
        const id = data?.items[0]?.id?.videoId

        if (!id) {
            console.log("No video found")
        } else {
            setYtId(id)
        }
    }

    useEffect(() => {
        // Prevent double calls in safe mode
        if (mountedRef.current) return;
        mountedRef.current = true
        test()
    }, [])

    return (
        <div>
            {ytId ? (
                <div dangerouslySetInnerHTML={{
                    __html: generateYouTubeEmbedCode(ytId)
                }}></div>
            ) : (
                <p>Loading youtube vid...</p>
            )}
        </div>
    )
}

export default YoutubeTest;