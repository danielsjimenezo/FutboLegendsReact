import { useRef, useEffect } from "react";
import ChartJS from "chart.js/auto";

function Chart({ 
    options,
    id = "",
    className = ""
}) {
    const canvasRef = useRef(null)

    useEffect(() => {
        if (!canvasRef.current) return;
        try {
            new ChartJS(canvasRef.current, options)
            
        } catch {
            
        }
    }, [canvasRef])

    return (
        <canvas id={id} className={className} ref={canvasRef}></canvas>
    )
}

export default Chart;