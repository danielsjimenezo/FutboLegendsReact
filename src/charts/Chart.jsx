import { useRef, useEffect } from "react";
import ChartJS from "chart.js/auto";

function Chart({ 
    options,
    id = "",
    className = ""
}) {
    const canvasRef = useRef(null)
    const chartRef = useRef(null)

    const activateCanvas = () => {
        try {
            chartRef.current = new ChartJS(canvasRef.current, options)
        } catch (error) {
            chartRef.current.clear()
            chartRef.current.destroy()
            chartRef.current = new ChartJS(canvasRef.current, options)
        }
    }

    if (canvasRef.current) {
        activateCanvas()
    }

    useEffect(()=>{
        activateCanvas()
    }, [])

    return (
        <canvas id={id} className={className} ref={canvasRef}></canvas>
    )
}

export default Chart;