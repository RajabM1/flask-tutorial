const ProductDetails = ({ name, price }: { name: string; price: number }) => {
    return (
        <div className="card-body text-center">
            <h5
                className="card-title text-truncate fw-bold"
                style={{ fontSize: "16px" }}
            >
                {name}
            </h5>
            <div className="d-flex justify-content-center align-items-center mt-2">
                <p className="card-text fw-bold" style={{ fontSize: "18px" }}>
                    {price}$
                </p>
            </div>
        </div>
    );
};

export default ProductDetails;
