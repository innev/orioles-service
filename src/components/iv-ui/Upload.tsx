import { IconButton } from '@/components/iv-ui';
import { ArrowUpTrayIcon } from '@heroicons/react/24/outline';
import { ChangeEvent, cloneElement, ReactElement, useRef } from 'react';

export interface IUploadProps {
    title: string,
    uploading: Boolean,
    children?: ReactElement,
    accept: string,
    multiple: Boolean,
    beforeUpload?: Function
};

export default ({ title = "upload", uploading = false, children, ...props }: IUploadProps) => {
    const { accept = '.jpg,.jpeg,.png,.gif,.pdf', multiple = false, beforeUpload } = props;
    const fileInputRef = useRef<HTMLInputElement>(null);
    
    const onUploadButtonClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        if(event.target.files && event.target.files.length) {
            const [ file ] = event.target.files;
            beforeUpload && beforeUpload(file);
        } else {
            console.info('未选择文件！');
        }
    };
    
    return (
        <>
            <input type="file" accept={accept} className='hidden' ref={fileInputRef} onChange={handleFileChange} />
            {children ? cloneElement(children, { onClick: onUploadButtonClick }) : <IconButton icon={<ArrowUpTrayIcon/>} size={6} title={title} type="text" direction="horizontal" loading={uploading} onClick={onUploadButtonClick} />}
        </>
    );
};