function CompareBar({ label, val1, val2, max }) {
    
    const lengthPercent1 = (val1 / max) * 100
    const lengthPercent2 = (val2 / max) * 100

    const style1 = {
        width: lengthPercent1 + '%',
        backgroundImage: `linear-gradient(
            90deg,
            ${lengthPercent1 > lengthPercent2 ? 'var(--green)' : 'var(--pink)'},
            transparent
        )`
    }

    const style2 = {
        width: lengthPercent2 + '%',
        backgroundImage: `linear-gradient(
            90deg,
            transparent,
            ${lengthPercent1 < lengthPercent2 ? 'var(--green)' : 'var(--pink)'}
        )`
    }

    return (
        <div className="compare-bar">

            <div className="compare-bar-container left">
                <div className="compare-bar-value">{val1}</div>
                <div className="compare-bar-fill" style={style1}></div>
            </div>

            <div className="compare-bar-label">{label}</div>

            <div className="compare-bar-container right">
                <div className="compare-bar-fill" style={style2}></div>
                <div className="compare-bar-value">{val2}</div>
            </div>

        </div>
    )
}

export default CompareBar