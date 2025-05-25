function TableTd({ k, v, width }) {
    if (typeof v === 'object') {
        switch (v.type) {
            case 'img':
                return (
                    <td style={{
                        width: width
                    }}>
                        <img src={v.src} alt={v.alt} className="table-img" />
                    </td>
                )
            default:
                return ""
        }
    }

    return (
        <td style={{ width }}>{v}</td>
    )
}

export default TableTd;