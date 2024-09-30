import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
    const navigate = useNavigate();
    const goHome = () => {
        navigate("/");
    };
    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="text-center">
                <h1 className="display-4 mb-3">404 - Page Not Found</h1>
                <p className="lead mb-4">
                    The page you are looking for does not exist.
                </p>
                <button className="btn btn-secondary btn-lg" onClick={goHome}>
                    Go to Home Page
                </button>
            </div>
        </div>
    );
};

export default NotFoundPage;
