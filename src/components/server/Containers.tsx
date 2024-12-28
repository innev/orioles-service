export default function FullContainer(props: any) {
    return (
        <div className={`content-opacity rounded-lg flex flex-1 ${props.className}`}>
            <div className='flex-none w-full h-full'>
                {props.children}
            </div>
        </div>
    )
}