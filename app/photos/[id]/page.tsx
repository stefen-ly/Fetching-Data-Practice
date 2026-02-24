export default async function PhotoPage({params}: {params: {id: string}}) {
    const {id} = await params; 
    return (
        <main className="w-2/4 h-50 bg-gray-100 rounded-lg p-6 mx-auto mt-10">
            <section>
                <h1 className="text-3xl font-bold mb-2">Photo Detail - ID: {id}</h1>
                <p className="text-gray-600 mb-6">
                    This is the detail page for photo with ID: {id}.
                </p>
            </section>
        </main>
    )
}