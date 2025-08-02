import React from "react";

const Table = ({ columns, data, handleEditEvent }) => {
  const formatCell = (row, column) => {
    const { id, value, isList } = column;

    if (id === "action") {
      return (
        <td className=" mt-3 ">
          <div className="flex items-center justify-center gap-2">
            {column.buttons.map((b)=> <button
            onClick={() => b.onClick(row)}
            className={b.css}
          >
            {b.name}
          </button>)}
          </div>
        </td>
      );
    }  else if (id === "bold") {
      return (
        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
          {row[value]}
        </td>
      );
    } else if (id === "status") {
      return (
        <td className="px-6 py-4  text-center">
          {row[value] === "rejected" ? (
            <span class="bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm border border-red-400">
              Rejected
            </span>
          ) : row[value] === "accepted" ? (
            <span class="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm border border-green-400">
              Accepted
            </span>
          ) : (
            <span class="bg-yellow-100 text-yellow-600 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm border border-yellow-300">
              Submitted
            </span>
          )}
        </td>
      );
    } else {
      return (
        <td class="px-6 py-3 text-center">
          {isList ? row[value].length : row[value]}
        </td>
      );
    }
  };

  return (
    <>
      <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 border border-gray-300">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              {columns.map((column, columnIndex) => (
                <th
                  scope="col"
                  class={`px-6 py-3 ${columnIndex !== 0 && "text-center"} `}
                >
                  {column.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map((row, rowIndex) => (
                <tr className=" odd:bg-white even:bg-gray-50 border-b border-gray-200">
                  {columns.map((column) => formatCell(row, column))}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center mt-4">
        <ul class="inline-flex -space-x-px text-sm">
          <li>
            <a
              href="#"
              class="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700"
            >
              Previous
            </a>
          </li>
          <li>
            <a
              href="#"
              class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
            >
              1
            </a>
          </li>
          <li>
            <a
              href="#"
              class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700"
            >
              Next
            </a>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Table;
