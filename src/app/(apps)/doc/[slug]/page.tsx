import AppHeader from "@/components/server/AppNav"
import FullContainer from "@/components/server/Containers"
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeRaw from 'rehype-raw'
import rehypeStringify from 'rehype-stringify'
import { readFileSync } from 'fs'
import path from "path"
import { notFound } from 'next/navigation'
import { Metadata } from "next"
import { FullContent } from "@/components/layouts/OriolesLayout"

const titles = {
  about: '关于作者',
  jobs: '工作内推',
  links: '友情链接',
  terms: '用户协议',
}
type DOC = keyof typeof titles

export const generateMetadata = async ({ params: { slug } }: { params: { slug: DOC } }): Promise<Metadata> => {
  return {
    title: titles[slug]
  }
}

export default async ({ params: { slug } }: { params: { slug: DOC } }) => {

  if (Object.keys(titles).indexOf(slug) === -1) {
    return notFound()
  }

  const title = titles[slug]

  const content = readFileSync(path.join(process.cwd(), `prisma/data/md/${slug}.md`), 'utf-8');
  const file = await unified()
    .use(remarkParse)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeStringify)
    .process(content);

  return (
    <FullContent paths={[{ name: title }]}>
      <article className="max-w-full prose text-base p-4 md:p-8" dangerouslySetInnerHTML={{ __html: file.value.toString() }} />
    </FullContent>
  )
}