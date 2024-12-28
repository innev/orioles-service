import { FullContent } from "@/components/layouts/OriolesLayout";
import TTS from "./TTS";

export const metadata = {
    title: '语音合成',
}

export default () => {
    return (
        <FullContent paths={[{ name: '语音合成' }]}>
            <TTS />
        </FullContent>
    )
};