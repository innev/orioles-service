'use client';

import { localWhisper } from '@/utils';
import { useState } from 'react';

export default () => {
  const [message, setMessage] = useState<string>('');

  return (
    <div className="border border-solid border-gray-300 rounded-lg">
      <div className="border-b border-gray-300 pb-5">
        <input type="file" onChange={event => localWhisper(event.target.files).then(({ data }) => setMessage(data))} />
      </div>
      <div className="flex flex-wrap items-start justify-start max-w-4xl mt-4 hover:text-blue-600 hover:border-blue-600">
        <p className="text-xl">{message}</p>
      </div>
    </div>
  )
};