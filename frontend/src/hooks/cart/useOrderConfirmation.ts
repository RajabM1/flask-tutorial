import endpoints from "../../config/api";
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
    } = useFetch(endpoints.USER.ADDRESSES_BY_ID(addressId));

    const {
        data: orderInformation,
        error: orderError,
        isLoading: isOrderLoading,
    } = useFetch(endpoints.ORDER.BY_TRACKING_CODE(orderCode));

    const {
        data: shippingMethods,
        error: shippingMethodsError,
        isLoading: isShippingMethodsLoading,
    } = useFetch(
        endpoints.ORDER.SHIPPING_METHODS_BY_ID(selectedShippingMethodId)
    );

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
