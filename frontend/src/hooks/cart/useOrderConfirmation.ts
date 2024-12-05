import { useFetch } from "../shared/useFetch";

export const useOrderConfirmation = (addressId: string, orderCode: string) => {
    const {
        data: addressInformation,
        error: addressError,
        isLoading: isAddressLoading,
    } = useFetch(`users/addresses/${addressId}`);

    const {
        data: orderInformation,
        error: orderError,
        isLoading: isOrderLoading,
    } = useFetch(`orders/${orderCode}`);

    const isLoading = isAddressLoading || isOrderLoading;
    const addressData = addressInformation || null;
    const orderData = orderInformation || [];

    if (addressError) {
        console.error("Error fetching address data:", addressError);
    }
    if (orderError) {
        console.error("Error fetching order data:", orderError);
    }

    return { addressData, orderData, isLoading };
};
