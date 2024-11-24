import { ReactNode } from "react";
import Pagination from "./Pagination";

export default ({ data = [], pagination = false }: { data: Array<any>, pagination: Boolean | ReactNode }) => {
  return (
    // <div className="overflow-hidden bg-white shadow sm:rounded-lg">
    <div className="overflow-hidden border border-solid border-gray-300 shadow rounded-lg p-6">
      <ul role="list" className="divide-y divide-gray-100">
        {data.map((person) => (
          <li key={person.email} className="flex justify-between gap-x-6 py-5 hover:bg-gray-50">
            <div className="flex gap-x-4 ">
              <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src={person.imageUrl} alt="" />
              <div className="min-w-0 flex-auto">
                <p className="text-sm font-semibold leading-6 text-gray-900">{person.name}</p>
                <p className="mt-1 truncate text-xs leading-5 text-gray-500">{person.email}</p>
              </div>
            </div>
            <div className="hidden sm:flex sm:flex-col sm:items-end">
              <p className="text-sm leading-6 text-gray-900">{person.role}</p>
              {person.lastSeen ? (
                <p className="mt-1 text-xs leading-5 text-gray-500">
                  Last seen <time dateTime={person.lastSeenDateTime}>{person.lastSeen}</time>
                </p>
              ) : (
                <div className="mt-1 flex items-center gap-x-1.5">
                  <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  </div>
                  <p className="text-xs leading-5 text-gray-500">Online</p>
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
      
      {pagination === true ? <Pagination /> : null}
    </div>
  );
};