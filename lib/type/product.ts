export type ProductResponse = {
    id: number;
    title: string;
    price: number;
    slug: string;
    description: string;
    category: categoryResponse;
    images: string[];
    creationAt: string;
    updatedAt: string;
}

export type categoryResponse = {
    id: number;
    name: string;
    image: string;
}