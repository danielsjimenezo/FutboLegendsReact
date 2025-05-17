import sty from './Tooltip.module.css'

function Tooltip({ 
    children,
    containerId = "",
    containerClassName = "",
    tooltipClassName = "",
    tooltipId = "",
    message = "I'm a tooltip",
    position = "right"
}) {

    return (
        <div id={containerId} className={[containerClassName, sty.container].join(' ')}>
            {children}
            <div id={tooltipId} className={[tooltipClassName, sty.tooltip, sty[position]].join(' ')}>
                {message}
            </div>
        </div>
    )
}

export default Tooltip;