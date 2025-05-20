import "./Table.css";
import TableRow from "./TableRow.jsx";
import TableTd from "./TableTd.jsx";
import { useState } from "react";

function Table({ headings, items, _key, hide = [], expandables, id = "" }) {
  const [page, setPage] = useState(0);

  const start = page * 10;
  const end = (page + 1) * 10;
  const totalPages = Math.ceil(items.length / 10);

  const shownItems = items.slice(start, end);

  return (
    <>
      <table className="table" id={id}>
        <thead>
          <tr>
            {headings.map((h) => {
              return <th key={h}>{h}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {shownItems.map((item, i) => {
            const entries = Object.entries(item).filter(
              ([k, v]) => !hide.includes(k)
            );
            // Table row can be "expandable" if "expandables prop is provided"
            const expandable = expandables?.[i]
            return (
              <TableRow 
                key={Math.random()} 
                entries={entries} 
                expandable={expandable}
              />
            );
          })}
        </tbody>
      </table>
      <div className="pagination">
        <div>
          {page > 0 && <button onClick={() => setPage(page - 1)}>
            <img src="/images/Icons/rtri.svg" alt="" />
          </button>}
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
