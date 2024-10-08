import Root from "./Root";
import SubmitButton from "../components/button/SubmitButton";
import FormInput from "../components/FormInput";
import ErrorMessage from "../components/ErrorMessage";
import { useCreateItemForm } from "../hooks/useCreateItemForm";
import { useTranslation } from "react-i18next";

const CreateItem = () => {
    const { t } = useTranslation('create-item')
    const { formData, formError, handleInputChange, handleCreateItem, createItemError } = useCreateItemForm();

    return (
        <Root>
            <ErrorMessage message={createItemError} type="danger" />
            <form className="form-signin" onSubmit={handleCreateItem}>
                <FormInput
                    id="name"
                    type="text"
                    label={t('name_label')}
                    value={formData.name}
                    onChange={handleInputChange}
                    error={formError.name}
                />
                <FormInput
                    id="price"
                    type="number"
                    label={t('price_label')}
                    value={formData.price}
                    onChange={handleInputChange}
                    error={formError.price}
                />
                <FormInput
                    id="barcode"
                    type="text"
                    label={t('barcode_label')}
                    value={formData.barcode}
                    onChange={handleInputChange}
                    error={formError.barcode}
                />
                <FormInput
                    id="description"
                    type="text"
                    label={t('description_label')}
                    value={formData.description}
                    onChange={handleInputChange}
                    error={formError.description}
                />
                <SubmitButton label={t('save_label')} color="primary" />
            </form>
        </Root>
    );
};

export default CreateItem;
