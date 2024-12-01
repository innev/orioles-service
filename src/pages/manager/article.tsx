import { getArticleList } from '@/apis/wechat';
import DArticle from '@/components/iv-ui/typings/DArticle';
import AdminLayout from '@/components/layouts/AdminLayout';
import { ReactNode, useEffect, useState } from 'react';

const Article = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    getArticleList().then(data => setArticles(data));
  }, []);

  return (
    <div className="overflow-hidden bg-white shadow-md sm:rounded-lg p-6">
      <h2 className="text-2xl font-bold tracking-tight text-gray-900">内容列表</h2>
      
      <div className="my-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        {articles.map((product: DArticle) => (
          <div key={product.id} className="group relative">
            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
              <img
                src={product.thumbnail}
                alt={product.title}
                className="h-full w-full object-cover object-center lg:h-full lg:w-full"
              />
            </div>
            
            <div className="mt-4 flex justify-between">
              <div>
                <h3 className="text-sm text-gray-700">
                  <a href="#">
                    <span aria-hidden="true" className="absolute inset-0" />
                    {product.title}
                  </a>
                </h3>
                <p className="mt-1 text-sm text-gray-500 max-w-sm truncate overflow-ellipsis">{product.description}</p>
              </div>
              <p className="text-sm font-medium text-gray-900">{product.series}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

Article.getLayout = (page: ReactNode) => <AdminLayout breadcrumbs={[ { name: '内容管理', href: '/article', current: true } ]}>{page}</AdminLayout>;
export default Article; 