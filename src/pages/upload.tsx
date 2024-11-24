import HomeLayout from '@/components/layouts/HomeLayout';
import { localWhisper } from '@/utils';
import Head from 'next/head';
import { ReactNode, useState } from 'react';

const UploadPage = () => {
  const [message, setMessage] = useState<string>('');

  return (
    <div className="border border-solid border-gray-300 rounded-lg">
      <Head>
        <title>Upload</title>
      </Head>

      <div className="border-b border-gray-300 pb-5">
        <input type="file" onChange={event => localWhisper(event.target.files).then(({ data }) => setMessage(data))} />
      </div>
      <div className="flex flex-wrap items-start justify-start max-w-4xl mt-4 hover:text-blue-600 hover:border-blue-600">
        <p className="text-xl">{message}</p>
      </div>
    </div>
  )
};

UploadPage.getLayout = (page: ReactNode) => <HomeLayout>{page}</HomeLayout>;
export default UploadPage;