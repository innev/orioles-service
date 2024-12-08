import CDN from '@/utils/cdn';
import DevIcon from './DevIcon';
import { getIcons, DevIconProps } from '@/service/model/Icon';

export default async () => {

    const icons: DevIconProps[] = await getIcons();
    return (
        <div className='p-6 w-fit'>
            <div className="flex flex-row flex-wrap gap-2">
                {
                    icons.map((item: DevIconProps) => {
                        item.url = CDN.icon(item.name);
                        item.name = item.name.toLowerCase();
                        return <DevIcon key={item.name} icon={item} />
                    })
                }
            </div>
        </div>
    )
}