import { useEffect, useRef } from "react";

function YoutubeEmbed({ embedCode }) {

    const divRef = useRef(null)

    // Fix video size
    useEffect(()=>{
        const iframe = divRef.current.querySelector(":scope iframe")
        iframe.setAttribute("width", "100%")
    }, [])

    return (
        <div ref={divRef} dangerouslySetInnerHTML={{ __html: embedCode }}></div>
    )
}

export default YoutubeEmbed;