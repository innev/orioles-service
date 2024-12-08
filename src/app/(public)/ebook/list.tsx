'use client';

import { getBookList } from '@/service/apis/ebook';
import { DBook } from '@/components/iv-ui/typings/DBook';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default () => {
  const [ ebooks, setEBooks ] = useState<Array<DBook>|undefined>([]);

  useEffect(() => {
    getBookList().then(setEBooks);
  }, []);

  return (
    <div className="m-6 grid gap-6 grid-flow-row grid-cols-1 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-8">
      {ebooks?.map((ebook: DBook) => (
        <div key={ebook.id} className="group relative">
          <div className="overflow-hidden rounded-md group-hover:opacity-75 shadow-lg">
            <img src={ebook.cover} alt={ebook.name} className="object-cover object-center"/>
          </div>
          <div className="mt-4 flex justify-between">
            <div>
              <h3 className="text-sm text-gray-700">
                <Link href={`/ebook/${ebook.id}/cover`}>
                  <span aria-hidden="true" className="absolute inset-0" />
                  {ebook.name}
                </Link>
              </h3>
            </div>
            <p className="text-sm font-medium text-gray-900">{ebook.version}</p>
          </div>
        </div>
      ))}
    </div>
  );
};