import { ModalSample, Tabs } from '@/components/iv-ui';
import Upload from '@/components/iv-ui/Upload';
import { Header, pluginMapping, Sider } from '@/components/layouts/EditorLayout';
import useUpload, { DUpload } from '@/hooks/usePdfJsUpload';
import Book from '@/templates/Book';
import BookPage from '@/templates/BookPage';
import { DBook } from '@/templates/interfaces/IBook';
import { DBookPage } from '@/templates/interfaces/IBookPage';
import { DModule, DModuleNode, DModuleTree } from '@/templates/interfaces/IModule';
import { DPDFTextContent } from '@/templates/interfaces/IPDFTextContent';
import { DSpeechWord } from '@/templates/interfaces/ISpeech';
import PDFTextContent from '@/templates/PDFTextContent';
import { isAbsolutePath } from '@/utils';
import alioss, { DListObjectResult } from '@/utils/alioss';
import { classNames } from '@/utils/classNames';
import '@/utils/extensions/string';
import mimeType from '@/utils/mimeType';
import { request } from '@/utils/request';
import Head from 'next/head';
import { useEffect, useMemo, useState } from 'react';

/**
 * 自定义上传请求，根据不同场景进行定制
 * @param {Blob|File} file - blob或file数据
 * @param {Object} data - 附带数据
 * @property {String} md5 - 当前上传资源编号
 * @property {String} filename - 目标文件名
 * @property {String} textContent - 目标文件名
 * @returns {Promise<string|void>} - OSS上传后的Promise对象
 */
const uploadRequest = (file: File | Blob, { md5, filename, textContent }: DUpload): Promise<Array<string | void> | string | void> => {
  if (textContent) {
    const data: Blob = new Blob([JSON.stringify(textContent)], { type: mimeType.PackTypes.json });
    return Promise.all([
      alioss.uploadFile(file, { rid: md5, filename, category: "thumbs" }),
      alioss.uploadFile(data, { rid: md5, filename, category: "contents" })
    ]);
  } else {
    return alioss.uploadFile(file, { rid: md5, filename, category: "thumbs" });
  }
};

const CDN_HOST: string = "https://o.innev.cn";
const bookListParse = (result: DListObjectResult): Promise<Array<DBook | { id: string, name: string, version: string }>> => {
  const tasks: Array<Promise<DBook | { id: string, name: string, version: string }>> = result?.prefixes?.map((name: string) => {
    const url: string = `${CDN_HOST}/${name}index.json`;
    const names: Array<string> = name.split("/");
    const id: string = names[names.length - 2] || '';
    return new Promise(resolve => request({
      url,
      success: (data: DBook) => resolve(data),
      error: (res: any) => resolve({ id, name: id, version: 'v5.0.0' })
    }));
  }) || [];
  return Promise.all(tasks);
};

const ListItem = (item: { id: string, name?: string, label?: string, selected?: string, onSelected?: Function}) => {
  return <ul
    key={item.id}
    className={classNames(
      'cursor-pointer px-2 py-3 hover:bg-gray-100 hover:text-orange-600',
      item.id === item?.selected ? "bg-gray-100 text-orange-600" : ""
    )}
    onClick={() => item.onSelected && item.onSelected(item.id)}
  >
    {item?.name || item?.label || ''}
  </ul>
};

export default () => {
  const [title, setTitle] = useState<string>('电子课本');
  const [books, setBooks] = useState<Array<DBook>>([]);
  const [book, setBook] = useState<DBook>();
  const [selectedModule, setSelectedModule] = useState<string>();
  const [chapter, setChapter] = useState<Array<DModuleTree>>([]);
  const [selectedChapter, setSelectedChapter] = useState<string>();
  const [content, setContent] = useState<string>('');
  const [subTitle, setSubTitle] = useState<Array<Array<{ str: string, fontFamily: string}>>>([]);
  const [speechWords, setSpeechWords] = useState<Array<DSpeechWord>>([]);

  const [open, setOpen] = useState<Boolean>(false);
  const [plugin, setPlugin] = useState<string>('list');
  const [moduleKey, setModuleKey] = useState<string>('module');
  const {msgData, fileInfo, fileList, uploadProps, uploading} = useUpload({
    maxSize: 200,
    type: 'application/pdf',
    uploadRequest
  });

  useEffect(() => {
    alioss.list(true, bookListParse).then(setBooks);
  }, []);

  /*
  ** 导入PDF, 批量设置页码
  ** fileList: [{name, pageId, url}]
  */
  useEffect(() => {
    if (!uploading && fileList.length && fileInfo) {
      const pages: Array<DBookPage> = fileList.map((data, idx) => new BookPage(data, idx).toJson());
      const bookData: DBook = new Book(fileInfo, pages).toJson();
      const fileData: Blob = new Blob([JSON.stringify(bookData)], { type: mimeType.PackTypes.json });
      alioss.uploadFile(fileData, { rid: fileInfo.id, filename: "index" });
      setBook(() => {
        setTitle(bookData.name);
        setPlugin('page');
        return bookData;
      });
    }
  }, [fileList, fileInfo]);

  const onBookChange = (bookData: DBook) => {
    setBook(() => {
      setTitle(bookData.name);
      setPlugin('page');
      return bookData;
    });
  };

  const onPageChange = (url: string, src: string) => {
    setContent(src);
    url && request({
      url,
      success: (textContent: DPDFTextContent) => {
        setSubTitle(() => {
          setPlugin('subtitle');
          return PDFTextContent.parse(textContent);
        });
      }
    });
  };

  const onModuleChange = (mId: string) => {
    setSelectedModule(mId);
    if(book && book.modules) {
      const _chapter: Array<DModuleTree> = book.modules.find(({ id }: DModule) => id === mId)?.chapter || [];
      setChapter(_chapter);
    }
  };

  const onChapterChange = ({ id, src }: DModuleTree) => {
    setSelectedChapter(id);
    src && request({
      url: isAbsolutePath(src) ? src : `${book?.path}/${src}`,
      success: (nodeContent: DModuleNode) => {
        console.log("nodeContent:", nodeContent);
        setSpeechWords(nodeContent.word);
      }
    });
  };

  const panelRender = useMemo(() => {
    switch (plugin) {
      case "list": return books && books.map((bookData: DBook) => <ListItem key={bookData.id} id={bookData.id} name={bookData.name} selected={book?.id} onSelected={() => onBookChange(bookData)} />);
      case "page": return book && book.pages.map((page: DBookPage) => {
        const { width = 151, backgroundImage, ...style } = page.style;
        const cacheUrl: string = page?.cache_url && isAbsolutePath(page.cache_url) ? page?.cache_url : `${book?.path}/${page?.cache_url||''}`;
        const bgImg: string = backgroundImage?.extractBackgroundImageUrl(book.path) || "";
        return (
          <div key={page.keyid} className='flex flex-col justify-center items-center cursor-pointer' onClick={() => onPageChange(cacheUrl, bgImg)}>
            <div className="rounded hover:opacity-75 hover:shadow-lg" style={{
                backgroundImage: `url(${bgImg}?x-oss-process=image/resize,w_${width})`,
                width,
                ...style
              }}
            />
            <div className="text-sm text-center">{page.name}</div>
          </div>
        )
      });
      case "subtitle": return subTitle?.map((lines: Array<{ str: string, fontFamily: string}>, idx: number) => {
        return (
          <ul key={`text-line-${idx}`} className='py-2 pl-2 cursor-pointer hover:bg-gray-100 hover:text-orange-600'>
            {lines?.map(({ str, fontFamily }, i) => <span key={`text-line-${i}`} style={{ fontFamily }}>{str}</span>)}
          </ul>
        );
      });
      default: return null;
    }
  }, [plugin, books.length, book, subTitle.length]);

  const onHeaderChange = (opt: string) => {
    switch(opt) {
      case "save":
        alert("保存");
        break;
      case "preview":
        alert("保存");
        break;
    }
  };

  return (
    <div className='h-screen items-centerbg-gray-100 pt-12'>
      <Head>
        <title>{title}</title>
      </Head>
      
      <ModalSample
        title='title'
        content='Modal content goes here.'
        open={open}
        onCancel={() => setOpen(false)}
      />
      
      <Header className='fixed top-0 z-50' status={<Upload {...uploadProps} uploading={uploading} title="上传PDF" />} onHeaderChange={onHeaderChange} />
      
      <div className="flex h-full border-t border-slate-600">
        <Sider className='h-full border-r border-slate-600' value={plugin} onSelectPlugin={setPlugin} />

        <div className="h-full w-80 flex flex-col bg-slate-900 text-gray-100 border-r border-slate-600">
          <div className='text-lg text-gray-100 font-mono text-center border-b border-gray-300 my-1'>
            <p className='py-2 mb-px'>{pluginMapping[plugin]}</p>
          </div>
          <div className='flex-grow overflow-y-auto'>
            {panelRender}
          </div>
        </div>

        <div className="h-full w-80 flex flex-col bg-slate-900 text-gray-100 border-r border-slate-600">
          <Tabs
            className='h-full w-full flex flex-col'
            items={[
              {
                key: 'module',
                label: '模块',
                children: book?.modules.map((module: DModule) => <ListItem key={module.id} {...module} selected={selectedModule} onSelected={onModuleChange} />)
              },
              {
                key: 'chapter',
                label: '章节目录',
                children: chapter?.map((cpt: DModuleTree) => <ListItem key={cpt.id} {...cpt} selected={selectedChapter} onSelected={() => onChapterChange(cpt)} />)
              },
              {
                key: 'content',
                label: '内容管理',
                children: speechWords.map((wod: DSpeechWord) => <ListItem key={wod.id} label={`${wod.en} ${wod.ps} ${wod.cn}`} {...wod} />)
              }
            ]}
            activeKey={moduleKey}
            onChange={(key: string) => setModuleKey(key)}
          />
        </div>

        <div className="h-full flex-grow p-4 bg-gray-800">
          {content ? <img src={content} alt={title} className="h-full mx-auto shadow rounded"/> : null}
        </div>

      </div>
    </div>
  );
};