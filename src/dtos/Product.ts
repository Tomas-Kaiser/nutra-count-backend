export default interface ProductDTO {
    barCode: string;
    name: string;
    nutrition: {
        carbohydrate: string;
        energyKj: string;
        energyKcal: string;
        fat: string;
        saturatesFat: string;
        fiber: string;
        protein: string;
        salt: string;
        suger: string;
    }
}