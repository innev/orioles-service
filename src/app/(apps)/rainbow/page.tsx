import { FullContent } from "@/components/layouts/OriolesLayout";

export const metadata = {
    title: 'Rainbow'
}

export default function RainbowPage() {
    return (
        <FullContent paths={[{ name: 'rainbow' }]}>
            <iframe src="https://rainbow.me" className='w-full h-full rounded-lg' />
        </FullContent>
    )
}