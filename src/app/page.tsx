"use client";

import {useState} from "react";

interface RequestItem {
  ammount: number;
  client: string;
  createdAt: string;
  due: string;
  id: string;
  invoice: string;
  issued: string;
  status: string;
}
const mockItems = [
  {
    createdAt: "2024-10-24T05:29:55.950Z",
    invoice: "858f484c-5bc7-4b2d-8a9f-094238090d1a",
    client: "Russel Group",
    issued: "2095-12-27T10:31:36.240Z",
    due: "2065-07-13T09:17:35.970Z",
    ammount: 12551,
    status: "#f2b4ec",
    id: "1",
  },
  {
    createdAt: "2024-10-23T18:38:27.162Z",
    invoice: "d263570e-c543-4b6c-8480-81dbc873c158",
    client: "Lindgren - Feil",
    issued: "2038-05-05T17:30:03.279Z",
    due: "2014-03-01T18:58:58.386Z",
    ammount: 91673,
    status: "#2ffa2c",
    id: "2",
  },
  {
    createdAt: "2024-10-23T21:29:51.084Z",
    invoice: "517a88da-fe80-4bcf-b031-c9c08cafb144",
    client: "Schamberger Inc",
    issued: "2085-11-14T17:28:55.938Z",
    due: "2090-07-12T21:31:51.953Z",
    ammount: 44113,
    status: "#9a5dca",
    id: "3",
  },
  {
    createdAt: "2024-10-23T21:35:09.271Z",
    invoice: "6da81cf2-61f7-4ac8-af2b-d713f8f43deb",
    client: "Leuschke - Wyman",
    issued: "2054-05-29T23:24:35.809Z",
    due: "2042-02-27T12:18:00.059Z",
    ammount: 18978,
    status: "#ce3983",
    id: "4",
  },
];
export default function Home() {
  const [item, setItems] = useState<RequestItem[] | null>(null);

  async function getItems() {
    const resp = await fetch("/api/items", {
      headers: {"Content-Type": "application/json"},
    });
    const result = await resp.json();
    setItems(result.items);
    console.log(result.items);
  }
  function formatDateString(dateTimeString: string): string {
    const date = new Date(dateTimeString);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }
  function getWeekDay(dateTimeString: string): string {
    const date = new Date(dateTimeString);

    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    const dayIndex = date.getDay(); // Returns a number from 0 (Sunday) to 6 (Saturday)

    return daysOfWeek[dayIndex];
  }
  return (
    <div>
      <div className="container p-2 mx-auto sm:p-4 text-gray-100 dark:text-gray-800">
        <h2
          onClick={getItems}
          className="mb-4 text-2xl font-semibold leading-tight text-white underline underline-offset-4 outline-dashed  p-4 hover:bg-slate-600 hover:cursor-pointer">
          Invoices
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-xs">
            <colgroup>
              <col />
              <col />
              <col />
              <col />
              <col />
              <col className="w-24" />
            </colgroup>
            <thead className="bg-gray-700 dark:bg-gray-300">
              <tr className="text-left">
                <th className="p-3">Invoice #</th>
                <th className="p-3">Client</th>
                <th className="p-3">Issued</th>
                <th className="p-3">Due</th>
                <th className="p-3 text-right">Amount</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {item
                ? item.map((item, id) => (
                    <tr
                      key={id}
                      className="border-b border-opacity-20 border-gray-700 dark:border-gray-300 bg-gray-900 dark:bg-gray-50">
                      <td className="p-3">
                        <p>{item.invoice}</p>
                      </td>
                      <td className="p-3">
                        <p>{item.client}</p>
                      </td>
                      <td className="p-3">
                        <p>{formatDateString(item.issued)}</p>
                        <p className="text-gray-400 dark:text-gray-600">
                          {getWeekDay(item.issued)}
                        </p>
                      </td>
                      <td className="p-3">
                        <p>{formatDateString(item.due)}</p>
                        <p className="text-gray-400 dark:text-gray-600">
                          {getWeekDay(item.due)}
                        </p>
                      </td>
                      <td className="p-3 text-right">
                        <p>${item.ammount}</p>
                      </td>
                      <td className="p-3 text-right">
                        <span
                          style={{backgroundColor: item.status}}
                          className={`px-3 py-1 font-semibold rounded-md  text-gray-900 dark:text-gray-50`}>
                          <span>{item.status}</span>
                        </span>
                      </td>
                    </tr>
                  ))
                : mockItems.map((item, id) => (
                    <tr
                      key={id}
                      className="border-b border-opacity-20 border-gray-700 dark:border-gray-300 bg-gray-900 dark:bg-gray-50">
                      <td className="p-3">
                        <p>{item.invoice}</p>
                      </td>
                      <td className="p-3">
                        <p>{item.client}</p>
                      </td>
                      <td className="p-3">
                        <p>{formatDateString(item.issued)}</p>
                        <p className="text-gray-400 dark:text-gray-600">
                          {getWeekDay(item.issued)}
                        </p>
                      </td>
                      <td className="p-3">
                        <p>{formatDateString(item.due)}</p>
                        <p className="text-gray-400 dark:text-gray-600">
                          {getWeekDay(item.due)}
                        </p>
                      </td>
                      <td className="p-3 text-right">
                        <p>${item.ammount}</p>
                      </td>
                      <td className="p-3 text-right">
                        <span
                          style={{backgroundColor: item.status}}
                          className={`px-3 py-1 font-semibold rounded-md  text-gray-900 dark:text-gray-50`}>
                          <span>{item.status}</span>
                        </span>
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
