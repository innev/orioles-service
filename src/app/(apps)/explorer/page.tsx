import FileExplorer from '@/components/file-tree/FileExplorer';
import { FullContent } from "@/components/layouts/OriolesLayout";
import Explorer from './Explorer';

export const metadata = {
  title: '文档管理'
}

export default async () => {
  return (
    <FullContent
      paths={[{ name: '文档管理' }]}
      Sider={<FileExplorer />}
    >
      <Explorer />
    </FullContent>
  )
};