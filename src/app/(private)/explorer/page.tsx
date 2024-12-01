import AppNav from "@/components/server/AppNav";
import FullContainer from "@/components/server/Containers";
import Explorer from './Explorer';
import { TParams } from "./type";

export const metadata = {
  title: '文档管理'
}

export default async ({ params }: { params: TParams }) => {
  return (
    <div className='w-full p-4 md:p-8 flex flex-col gap-4 md:gap-6'>
      <AppNav paths={[{ name: '文档管理' }]} />
      <FullContainer>
        <Explorer />
      </FullContainer>
    </div>
  )
};