import { useRef, useEffect } from "react";

function BelowImageTable({ headings, rows, totals }) {
  const bodyRef = useRef(null);
  const footerRef = useRef(null);

  async function alignFooterAndBody() {
    const bodyTds = bodyRef.current.querySelectorAll(
      ":scope > tr:first-child td"
    );
    const widths = [...bodyTds].map((td) => td.offsetWidth);
    const footerCells = footerRef.current.querySelectorAll(
      ":scope > tr:first-child > *"
    );
    [...footerCells].forEach((cell, i) => {
      cell.style.width = `${widths[i]}px`;
    });
  }

  useEffect(() => {
    setTimeout(() => {
      alignFooterAndBody();
    }, 500);
  }, []);

  return (
    <div className="playerTableStats">
      <section className="table-container">
        <div className="team-data-table-container">
          <table className="team-data-table">
            <thead>
              <tr className="header-roww">
                {headings.map((h) => (
                  <th>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody id="team-stats" ref={bodyRef}>
              {rows.map((row) => (
                <tr key={row.key}>
                  {row.items.map((item, i) => (
                    <td
                      key={`${headings[i]}|${item.value}}`}
                      className={`${item.type == "logo" ? "team-logo-td" : ""}`}
                    >
                      {item.type === "logo" ? (
                        <>
                          <img
                            src={item.img}
                            alt={`Logo of ${item.name}`}
                            loading="lazy"
                            className="team-logo"
                          />
                        </>
                      ) : (
                        <>{item.value.toLocaleString()}</>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <table className="team-data-foot">
          <tfoot ref={footerRef}>
            <tr className="totalsRowProfile">
              <th>TOTALS</th>
              {totals.map((total) => (
                <td>{total.toLocaleString()}</td>
              ))}
            </tr>
          </tfoot>
        </table>
      </section>
    </div>
  );
}

export default BelowImageTable;
