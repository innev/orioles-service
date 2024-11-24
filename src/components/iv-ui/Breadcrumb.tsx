
import Link from 'next/link';
import { ChevronRightIcon, HomeIcon } from "./icons";
import { IBreadcrumb } from './typings/Interfaces';

export default ({ main = "/", pages = [] }: { main?: string, pages: Array<IBreadcrumb> }) => {
  
  return (
    <nav className="flex w-full" aria-label="Breadcrumb">
      <ol role="list" className="flex items-center space-x-4">
        <li>
          <div>
            <Link href={main} className="flex items-center gap-2 text-sm text-gray-400 hover:text-gray-500">
              <HomeIcon className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
              <span>首页</span>
            </Link>
          </div>
        </li>

        {pages.map(page => (
          <li key={page.name}>
            <div className="flex items-center">
              <ChevronRightIcon
                className="h-5 w-5 flex-shrink-0 text-gray-400"
                aria-hidden="true"
              />
              <a
                href={main + page.href}
                className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
                aria-current={page.current ? 'page' : undefined}
              >
                {page.name}
              </a>
            </div>
          </li>
        ))}
      </ol>
    </nav>
  )
};