import Root from "../Root";
import SubmitButton from "../../components/buttons/SubmitButton";
import FormInput from "../../components/form/FormInput";
import Message from "../../components/feedback/Message";
import { useCreateItemForm } from "../../hooks/items/useCreateItemForm";
import { useTranslation } from "react-i18next";
import FileUpload from "../../components/form/FileUpload";

const CreateItemPage = () => {
    const { t } = useTranslation('create-item')
    const { formData, formError, handleInputChange, handleCreateItem, handleFileChange, pageMessage } = useCreateItemForm();

    return (
        <Root>
            <Message message={pageMessage.message} type={pageMessage.type} />
            <form className="form-signin" onSubmit={handleCreateItem}>
                <FormInput
                    id="name"
                    type="text"
                    label={t('labels.name')}
                    value={formData.name}
                    onChange={handleInputChange}
                    error={formError.name}
                />
                <FormInput
                    id="price"
                    type="number"
                    label={t('labels.price')}
                    value={formData.price}
                    onChange={handleInputChange}
                    error={formError.price}
                />
                <FormInput
                    id="barcode"
                    type="text"
                    label={t('labels.barcode')}
                    value={formData.barcode}
                    onChange={handleInputChange}
                    error={formError.barcode}
                />
                <FormInput
                    id="description"
                    type="text"
                    label={t('labels.description')}
                    value={formData.description}
                    onChange={handleInputChange}
                    error={formError.description}
                />

                <FileUpload
                    id="image"
                    label={t('labels.image')}
                    onChange={handleFileChange}
                    error={formError.image}
                    accept="image/*"
                />

                <FormInput
                    id="quantity"
                    type="number"
                    label={t('labels.quantity')}
                    value={formData.quantity}
                    onChange={handleInputChange}
                    error={formError.quantity}
                />
                <SubmitButton label={t('labels.save')} color="primary" />
            </form>
        </Root>
    );
};

export default CreateItemPage;
