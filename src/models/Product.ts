import { Schema, model } from 'mongoose';

interface Product {
    id: string;
    name: string;
    carbohydrate: string;
    energyKj: string;
    energyKcal: string;
    fat: string;
    saturatesFat: string;
    fiber: string;
    protein: string;
    salt: string;
    suger: string;
    barCode: string;
}

const productSchema = new Schema<Product>({
    name: { type: String, required: true },
    carbohydrate: { type: String, required: true },
    energyKj: { type: String, required: true },
    energyKcal: { type: String, required: true },
    fat: { type: String, required: true },
    saturatesFat: { type: String, required: true },
    fiber: { type: String, required: true },
    protein: { type: String, required: true },
    salt: { type: String, required: true },
    suger: { type: String, required: true },
    barCode: { type: String }
});

export const Product = model<Product>('Product', productSchema);