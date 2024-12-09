import { useFetch } from "../shared/useFetch";

export const useOrderConfirmation = (
    addressId: string,
    orderCode: string,
    selectedShippingMethodId: string
) => {
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

    const {
        data: shippingMethods,
        error: shippingMethodsError,
        isLoading: isShippingMethodsLoading,
    } = useFetch(`orders/shipping-methods/${selectedShippingMethodId}`);

    const isLoading =
        isAddressLoading || isOrderLoading || isShippingMethodsLoading;
    const addressData = addressInformation || null;
    const orderData = orderInformation || [];
    const shippingMethodsData = shippingMethods || [];

    if (addressError) {
        console.error("Error fetching address data:", addressError);
    }
    if (orderError) {
        console.error("Error fetching order data:", orderError);
    }
    if (shippingMethodsError) {
        console.error("Error fetching shipping methods:", shippingMethodsError);
    }

    return { addressData, orderData, shippingMethodsData, isLoading };
};
