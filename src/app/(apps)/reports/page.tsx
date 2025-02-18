import { Metadata } from 'next';
import ExcelTable from './ExcelTable';
import { FullContent } from '@/components/layouts/OriolesLayout';

export const metadata: Metadata = {
    title: `报表处理`
};

export default async () => {
    return (
        <FullContent paths={[{ name: '报表处理' }]}>
            <ExcelTable />
        </FullContent>
    )
};