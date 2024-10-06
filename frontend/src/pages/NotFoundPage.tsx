import { useNavigate } from "react-router-dom";
import Root from "./Root";

const NotFoundPage = () => {
    const navigate = useNavigate();
    const goBack = () => {
        navigate(-1);
    };
    return (
        <Root>
            <div className="d-flex justify-content-center align-items-center vh-100">
                <div className="text-center">
                    <h1 className="display-4 mb-3">404 - Page Not Found</h1>
                    <p className="lead mb-4">
                        The page you are looking for does not exist.
                    </p>
                    <button className="btn btn-secondary btn-lg" onClick={goBack}>
                        Go Back
                    </button>
                </div>
            </div>
        </Root>
    );
};

export default NotFoundPage;
