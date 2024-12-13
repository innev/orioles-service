import { Metadata } from 'next';
import DevIcon from './DevIcon';
import { FullContent } from '@/components/layouts/OriolesLayout';

export const metadata: Metadata = {
    title: `Dev Icons`
};

export default async () => {
    return (
        <FullContent paths={[{ name: 'Dev Icons' }]}>
            <DevIcon />
        </FullContent>
    )
};