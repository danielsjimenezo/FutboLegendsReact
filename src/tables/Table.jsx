import "./Table.css";
import TableRow from "./TableRow.jsx";
import TableTd from "./TableTd.jsx";
import { useState } from "react";

function Table({
  headings,
  items,
  _key,
  hide = [],
  expandables,
  id = "",
  columnWidths = [],
  totals,
  perPage = 10,
  cellPaddingY = "10px",
  cellHeight = "auto",
}) {
  const [page, setPage] = useState(0);

  const start = page * perPage;
  const end = (page + 1) * perPage;
  const totalPages = Math.ceil(items.length / perPage);

  const shownItems = items.slice(start, end);

  // console.log(items, 'items')

  return (
    <>
      <table className="table" id={id}>
        <thead>
          <tr>
            {headings.map((h, i) => {
              return (
                <th
                  key={h}
                  style={{
                    width: columnWidths[i] || "auto",
                  }}
                >
                  {h}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {shownItems.map((item, i) => {
            const entries = Object.entries(item).filter(
              ([k, v]) => !hide.includes(k)
            );
            // Table row can be "expandable" if "expandables prop is provided"
            const expandable = expandables?.[i];
            return (
              <TableRow
                key={Math.random()}
                entries={entries}
                expandable={expandable}
                columnWidths={columnWidths}
                cellPaddingY={cellPaddingY}
                cellHeight={cellHeight}
              />
            );
          })}
        </tbody>
        {totals && (
          <tfoot>
            <tr className="totals-row">
              {totals.map((v) => (
                <td
                  key={Math.random()}
                  style={{
                    paddingTop: cellPaddingY,
                    paddingBottom: cellPaddingY,
                    height: cellHeight,
                  }}
                >
                  {v}
                </td>
              ))}
            </tr>
          </tfoot>
        )}
      </table>
      <div className="pagination">
        <div>
          {page > 0 && (
            <button onClick={() => setPage(page - 1)}>
              <img src="/images/Icons/rtri.svg" alt="" />
            </button>
          )}
        </div>
        {/* <div>
          <p>
            Page {page + 1} of {totalPages}
          </p>
        </div> */}
        <div>
          {page < totalPages - 1 && (
            <button onClick={() => setPage(page + 1)}>
              <img src="/images/Icons/rtri.svg" alt="" />
            </button>
          )}
        </div>
      </div>
    </>
  );
}

export default Table;
