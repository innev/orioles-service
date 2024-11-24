import { MapPinIcon } from '@heroicons/react/20/solid';
import { ReactNode } from "react";
import Pagination from "./Pagination";
import DArticle from './typings/DArticle';

export default ({ data = [], pagination = false }: { data: Array<DArticle>, pagination: Boolean | ReactNode }) => {
  return (
    <div className="overflow-hidden bg-white shadow sm:rounded-lg">
      <ul role="list" className="divide-y divide-gray-200">
        {data.map(item => (
          <li key={item.id}>
            <a href="#" className="block hover:bg-gray-50">
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="truncate text-sm font-medium text-indigo-600">{item.title}</div>
                  <div className="ml-2 flex flex-shrink-0">
                    <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">{item.series}</span>
                  </div>
                </div>
                <div className="mt-2 flex justify-between">
                  <div className="sm:flex">
                    <div className="mr-6 flex items-center text-sm text-gray-500">
                      {item.description}
                    </div>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <MapPinIcon className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
              </div>
            </a>
          </li>
        ))}
      </ul>
      {pagination === true ? <Pagination /> : null}
    </div>
  );
};