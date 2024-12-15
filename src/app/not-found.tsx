import { FullContent } from "@/components/layouts/OriolesLayout"

export default () => {
    return (
        <FullContent paths={[{ name: 'Not found' }]}>
            <div className="text-center p-8 rounded-lg">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Not Found</h2>
                <p className="text-gray-600">Could not find requested resource</p>
            </div>
        </FullContent>
    )
}