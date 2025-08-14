interface PaymentCardProps {
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

const PaymentCard = ({ name, price, quantity, imageUrl }: PaymentCardProps) => {
  const total = price * quantity;

  return (
    <div className="payment-card">
      <img src={imageUrl} alt={name} className="payment-img" />
      <div className="payment-details">
        <h3>{name}</h3>
        <p>Price: ₹{price}</p>
        <p>Quantity: {quantity}</p>
        <p>Total: ₹{total}</p>
      </div>
    </div>
  );
};

export default PaymentCard;
