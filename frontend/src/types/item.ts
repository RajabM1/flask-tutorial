export type Item = {
    id?: number;
    name: string;
    barcode: string;
    price: number;
    description: string;
};

export type ItemFormError = {
    name?: string;
    price?: string;
    barcode?: string;
    description?: string;
}