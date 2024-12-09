export type ShippingMethodType = {
    id: string;
    name: string;
    label: string;
    cost: number;
};

export interface IShippingMethods {
    selectedMethod: string | null;
    onSelectMethod: (method: ShippingMethodType) => void;
}
