import React from "react";


type FoodCardProps = {
  imageUrl: string;
  name: string;
  description: string;
  rating: string;
  deliveryTime: string;
  onClick: () => void;
};

const FoodCard: React.FC<FoodCardProps> = ({
  imageUrl,
  name,
  description,
  rating,
  deliveryTime,
  onClick,
}) => {
  return (
    <div className="food-card" onClick={onClick}>
      <img src={imageUrl} alt={name} className="food-image" />
      <h2 className="food-title">{name}</h2>
      <p className="food-description">{description}</p>
      <div className="food-footer">
        <span>⭐ {rating}</span>
        <span>• {deliveryTime}</span>
      </div>
    </div>
  );
};

export default FoodCard;
