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
    name: { type: String, required: true, minlength: 3, maxlength: 30 },
    carbohydrate: { type: String, required: true, minlength: 1, maxlength: 4 },
    energyKj: { type: String, required: true, minlength: 1, maxlength: 4 },
    energyKcal: { type: String, required: true, minlength: 1, maxlength: 4 },
    fat: { type: String, required: true, minlength: 1, maxlength: 4 },
    saturatesFat: { type: String, required: true, minlength: 1, maxlength: 4 },
    fiber: { type: String, required: true, minlength: 1, maxlength: 4 },
    protein: { type: String, required: true, minlength: 1, maxlength: 4 },
    salt: { type: String, required: true, minlength: 1, maxlength: 4 },
    suger: { type: String, required: true, minlength: 1, maxlength: 4 },
    barCode: { type: String, required: true, minlength: 10, maxlength: 14 }
});

export const Product = model<Product>('Product', productSchema);