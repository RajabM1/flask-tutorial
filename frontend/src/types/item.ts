export type Item = {
    id?: number;
    name: string;
    barcode: string;
    price: number;
    description: string;
    image?: string;
    quantity: number
};

export type ItemFormError = {
    name?: string;
    price?: string;
    barcode?: string;
    description?: string;
    image?: string;
    quantity?: string;
}