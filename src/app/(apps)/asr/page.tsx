import { FullContent } from "@/components/layouts/OriolesLayout";
import ASR from "./ASR";

export const metadata = {
    title: '语音识别',
}

export default () => {
    return (
        <FullContent paths={[{ name: '语音识别' }]}>
            <ASR />
        </FullContent>
    )
};