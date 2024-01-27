import { Schema, model } from 'mongoose';

interface Product {
    id: string;
    barCode: string;
    name: string;
    nutrition: Nutriction;
}

interface Nutriction {
    carbohydrate: string;
    energyKcal: string;
    energyKj: string;
    fat: string;
    fiber: string;
    protein: string;
    salt: string;
    saturatesFat: string;
    suger: string;
}

const productSchema = new Schema<Product>({
    barCode: { type: String, required: true, minlength: 10, maxlength: 14 },
    name: { type: String, required: true, minlength: 3, maxlength: 30 },
    nutrition: {
        carbohydrate: { type: String, required: true, minlength: 1, maxlength: 4 },
        energyKj: { type: String, required: true, minlength: 1, maxlength: 4 },
        energyKcal: { type: String, required: true, minlength: 1, maxlength: 4 },
        fat: { type: String, required: true, minlength: 1, maxlength: 4 },
        saturatesFat: { type: String, required: true, minlength: 1, maxlength: 4 },
        fiber: { type: String, required: true, minlength: 1, maxlength: 4 },
        protein: { type: String, required: true, minlength: 1, maxlength: 4 },
        salt: { type: String, required: true, minlength: 1, maxlength: 4 },
        suger: { type: String, required: true, minlength: 1, maxlength: 4 },
    }
});

export const Product = model<Product>('Product', productSchema);