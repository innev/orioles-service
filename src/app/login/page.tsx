import LoginPage from './Login';

export default async () => {

    return (
        <div className='w-full p-4 md:p-8' style={{
            backgroundImage: `url(/assets/images/login_bg.svg)`,
            backgroundSize: 'cover', // 可选：根据需要调整背景图的大小
            backgroundPosition: 'center', // 可选：根据需要调整背景图的位置
            backgroundRepeat: 'no-repeat' // 可选：防止背景图重复
        }}>
            <div className={`bg-white rounded-lg shadow bg-opacity-80`}>
                <LoginPage />
            </div>
        </div>
    )
};