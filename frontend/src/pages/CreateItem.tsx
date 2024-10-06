import Root from "./Root";
import SubmitButton from "../components/button/SubmitButton";
import FormInput from "../components/FormInput";
import ErrorMessage from "../components/ErrorMessage";
import { useCreateItemForm } from "../hooks/useCreateItemForm";

const CreateItem = () => {
    const { formData, formError, handleInputChange, handleCreateItem, createItemError } = useCreateItemForm();

    return (
        <Root>
            <ErrorMessage message={createItemError} type="danger" />
            <form className="form-signin" onSubmit={handleCreateItem}>
                <FormInput
                    id="name"
                    type="text"
                    label="Item Name"
                    value={formData.name}
                    onChange={handleInputChange}
                    error={formError.name}
                />
                <FormInput
                    id="price"
                    type="number"
                    label="Price"
                    value={formData.price}
                    onChange={handleInputChange}
                    error={formError.price}
                />
                <FormInput
                    id="barcode"
                    type="text"
                    label="Barcode"
                    value={formData.barcode}
                    onChange={handleInputChange}
                    error={formError.barcode}
                />
                <FormInput
                    id="description"
                    type="text"
                    label="Description"
                    value={formData.description}
                    onChange={handleInputChange}
                    error={formError.description}
                />
                <SubmitButton label="Save" color="primary" />
            </form>
        </Root>
    );
};

export default CreateItem;
