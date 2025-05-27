import './BelowImageTable.css'

function BelowImageTable({ headings, rows, totals, gtc }) {


  return (
    <div className="playerTableStats">
      <section className="table-container">
        <div className="team-data-table-container">
          <table className="team-data-table">
            <thead>
              <tr className="header-roww"  style={{
                  display: 'grid',
                  gridTemplateColumns: gtc
                }}>
                {headings.map((h) => (
                  <th key={h}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody id="team-stats">
              {rows.map((row) => (
                <tr key={row.key} style={{
                  display: 'grid',
                  gridTemplateColumns: gtc
                }}>
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
          <tfoot>
            <tr className="totalsRowProfile" style={{
              display: 'grid',
              gridTemplateColumns: gtc
            }}>
              <th>TOTALS</th>
              {totals.map((total) => (
                <td key={Math.random()}>{total.toLocaleString()}</td>
              ))}
            </tr>
          </tfoot>
        </table>
      </section>
    </div>
  );
}

export default BelowImageTable;
