import AppNav from "@/components/server/AppNav";
import * as ww from '@wecom/jssdk';
import VideoPlayer from "./VideoPlayer";

export const metadata = {
    title: '企业微信'
}

export default () => {
    ww.register({
        corpId: 'ww7ca4776b2a70000',       // 必填，当前用户企业所属企业ID
        jsApiList: ['getExternalContact'], // 必填，需要使用的JSAPI列表
        getConfigSignature                 // 必填，根据url生成企业签名的回调函数
    })

    async function getConfigSignature(url: string | URL) {
        // 根据 url 生成企业签名
        // 生成方法参考 https://developer.work.weixin.qq.com/document/14924
        return { timestamp: '', nonceStr: '', signature: '' }
    }

    return (
        <div className='w-full p-4 md:p-8 flex flex-col gap-4 md:gap-6'>
            <AppNav paths={[{ name: '企业微信' }]} />
            <VideoPlayer />
        </div>
    )
}