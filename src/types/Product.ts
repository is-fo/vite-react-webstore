import { Category } from "./Category";

export interface Product {
    id: number;
    title: string;
    slug: string;
    price: number;
    description: string;
    category: Category;
    images: string[];
}