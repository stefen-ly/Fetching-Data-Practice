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
}

export type ProductRequest = {
    title: string;
    price: number;
    description: string;
    categoryId: number;
    images: string[];
}