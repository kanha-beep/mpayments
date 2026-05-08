function renderCell(row, column) {
  const value = row[column.key];

  if (typeof column.render === "function") {
    return column.render(value, row);
  }

  return value ?? "NA";
}

export default function DataTableCard({
  columns,
  rows,
  searchPlaceholder = "Search",
  footerText,
  compact = false,
}) {
  return (
    <section className={compact ? "" : "rounded-[20px] bg-white/90 p-4 shadow-[0_14px_36px_rgba(66,83,108,0.12)]"}>
      <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <span>Show</span>
          <input
            className="w-14 rounded-lg border border-slate-300 bg-white px-3 py-2"
            readOnly
            value="10"
          />
          <span>entries</span>
        </div>
        <label className="flex items-center gap-2 text-sm text-slate-600">
          <span>{searchPlaceholder}:</span>
          <input className="w-40 rounded-lg border border-slate-300 bg-white px-3 py-2" type="text" />
        </label>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-[980px] w-full border-separate border-spacing-0">
          <thead>
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className="bg-gradient-to-b from-[#6563f5] to-[#4c78f0] px-3 py-3 text-left text-sm font-semibold text-white first:rounded-tl-xl last:rounded-tr-xl"
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td
                  className="border-b border-slate-200 bg-white px-3 py-4 text-center text-slate-500"
                  colSpan={columns.length}
                >
                  No data available in table
                </td>
              </tr>
            ) : (
              rows.map((row, index) => (
                <tr key={row.id ?? index}>
                  {columns.map((column) => (
                    <td
                      key={column.key}
                      className="border-b border-slate-200 bg-white px-3 py-4 align-top text-sm text-slate-600"
                    >
                      {renderCell(row, column)}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex flex-col gap-3 text-sm text-slate-600 md:flex-row md:items-center md:justify-between">
        <span>{footerText ?? `Showing 1 to ${rows.length} of ${rows.length} entries`}</span>
        <div className="flex gap-2">
          <button className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-slate-500" type="button">
            Previous
          </button>
          <button className="rounded-lg border border-[#3690f8] bg-[#3690f8] px-4 py-2 text-white" type="button">
            1
          </button>
          <button className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-slate-500" type="button">
            Next
          </button>
        </div>
      </div>
    </section>
  );
}
