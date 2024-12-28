import LoginPage from './Login';

export default async () => {

    return (
        <div className='w-full p-4 md:p-8'>
            <div className={`bg-white rounded-lg shadow bg-opacity-80`}>
                <LoginPage />
            </div>
        </div>
    )
};