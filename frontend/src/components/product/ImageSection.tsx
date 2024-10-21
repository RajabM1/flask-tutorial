const ImageSection = ({
    imageUrl,
    name,
}: {
    imageUrl: string;
    name: string;
}) => {
    return (
        <div className="image-section">
            <img src={imageUrl} alt={name} className="main-image" />
        </div>
    );
};

export default ImageSection;
