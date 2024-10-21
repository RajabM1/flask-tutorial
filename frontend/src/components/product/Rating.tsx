const Rating = ({ rating }: { rating: string }) => {
    return (
        <div className="rating">
            <span>⭐ {rating} / 5.0</span>
        </div>
    );
};

export default Rating;
