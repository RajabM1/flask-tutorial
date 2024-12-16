import { useTranslation } from "react-i18next";
import ErrorLayout from "../components/ErrorLayout";

const NotFoundPage = () => {
    const { t } = useTranslation("errors-page");

    return (
        <ErrorLayout
            title={t("not_found.title")}
            description={t("not_found.description")}
            buttonLabel={t("go_back_btn")}
        />
    );
};

export default NotFoundPage;
