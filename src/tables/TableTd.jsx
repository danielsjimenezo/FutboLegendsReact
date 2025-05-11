function TableTd({ k, v }) {
    if (typeof v === 'object') {
        switch (v.type) {
            case 'img':
                return (
                    <td>
                        <img src={v.src} alt={v.alt} className="table-img" />
                    </td>
                )
            default:
                return ""
        }
    }

    return (
        <td>{v}</td>
    )
}

export default TableTd;