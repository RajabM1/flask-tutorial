import { Link } from "react-router-dom";

interface Props {
    text: string;
    linkText: string;
    to: string;
}
const TextWithLink = ({ text, linkText, to }: Props) => {
    return (
        <div className="mt-3">
            <h6 className="d-inline">{text}</h6>
            <Link to={to} className="text-secondary ms-2 text-decoration-none">
                {linkText}
            </Link>
        </div>
    );
};

export default TextWithLink;
