'use client';

import { DBook } from '@/components/iv-ui/typings/DBook';
import Link from 'next/link';
import useSWR from 'swr';
import { EBOOK_SERVICE } from '@/service';
import http from '@/utils/http';
import { FALLBACK_IMAGE } from '@/utils';
import { Loading } from '@/components/Icons';

export default () => {
  const { data = [], error, isLoading } = useSWR<DBook[]>(EBOOK_SERVICE.BOOKS, http.find_);

  return (
    <div className="m-6 grid gap-6 grid-flow-row grid-cols-1 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-8">
      {
        isLoading
          ? <div className="my-8 mx-auto col-span-full"><Loading className='h-20 w-20' /></div>
          : data.map(ebook => (
            <div key={ebook.id} className="group relative">
              <div className="overflow-hidden rounded-md group-hover:opacity-75 shadow-lg">
                <img src={ebook.cover||FALLBACK_IMAGE} alt={ebook.name} className="object-cover object-center" />
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
          ))
      }
    </div>
  );
};