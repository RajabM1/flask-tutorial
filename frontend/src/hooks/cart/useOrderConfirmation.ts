import { useFetch } from "../shared/useFetch";

export const useOrderConfirmation = (addressId: string, orderCode: string) => {
    const {
        data: addressInformation,
        error: addressError,
        isLoading: isAddressLoading,
    } = useFetch(`users/address/${addressId}`);

    const {
        data: orderInformation,
        error: orderError,
        isLoading: isOrderLoading,
    } = useFetch(`order/${orderCode}`);

    const isLoading = isAddressLoading || isOrderLoading;
    const addressData = addressInformation?.data || null;
    const orderData = orderInformation?.data || [];

    if (addressError) {
        console.error("Error fetching address data:", addressError);
    }
    if (orderError) {
        console.error("Error fetching order data:", orderError);
    }

    return { addressData, orderData, isLoading };
};
