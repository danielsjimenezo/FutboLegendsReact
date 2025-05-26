function TableTd({ k, v, width }) {
  if (typeof v === "object") {
    switch (v.type) {
      case "img":
        return (
          <td
            style={{
              width: width,
            }}
          >
            <img src={v.src} alt={v.alt} className="table-img" />
          </td>
        );
      case "team":
        return (
          <td style={{ width }}>
            <span
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                src={v.badge}
                alt={v.name + " badge"}
                className="table-img"
              />
            </span>
          </td>
        );
      default:
        return "";
    }
  }

  return <td style={{ width }}>{v}</td>;
}

export default TableTd;
