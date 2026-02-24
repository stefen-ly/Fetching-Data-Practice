import { SkeletonCard } from "@/components/i-skeleton/skeleton-card";
import { Skeleton } from "@/components/ui/skeleton";
import { number } from "zod";

export default function ProductLoading(){
    return (
        <main className="px-4 py-8 max-w-7xl mx-auto">
            <section>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {/* {Array.from({length: 15}).map((_, index) => (
                            <SkeletonCard key={index} />
                        ))} */}

                        {[...Array(15)].map((_, index) => (
                            <SkeletonCard key={index} />
                        ))}

                    </div>
            </section>
        </main>
    )
}
