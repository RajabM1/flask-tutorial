import { useNavigate } from "react-router-dom";
import Root from "../market/Root";
import { useTranslation } from "react-i18next";

const NotFoundPage = () => {
    const { t } = useTranslation("errors-page");
    const navigate = useNavigate();
    const goBack = () => {
        navigate(-1);
    };
    return (
        <Root>
            <div className="d-flex justify-content-center align-items-center vh-100">
                <div className="text-center">
                    <h1 className="display-4 mb-3">{t("not_found.title")}</h1>
                    <p className="lead mb-4">{t("not_found.description")}</p>
                    <button className="btn btn-secondary btn-lg" onClick={goBack}>
                        {t("go_back_btn")}
                    </button>
                </div>
            </div>
        </Root>
    );
};

export default NotFoundPage;
