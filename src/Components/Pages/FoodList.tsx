import { useState, useEffect } from "react";
import "../styles/FoodList.css";
import { Link } from "react-router-dom";

interface FoodItem {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  rating: string;
  deliveryTime: string;
  price: number;
}

const FoodList = () => {
  const [foodItems, setFoodItems] = useState<FoodItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cartItems, setCartItems] = useState<{ [id: string]: number }>({});

  useEffect(() => {
    async function loadFoodItems() {
      try {
        const response = await fetch(
          "https://www.themealdb.com/api/json/v1/1/search.php?s="
        );
        if (!response.ok) throw new Error("Failed to fetch food items");

        const data = await response.json();

        interface Meal {
          idMeal: string;
          strMeal: string;
          strCategory: string;
          strMealThumb: string;
          strRating?: string;
          strDeliveryTime?: string;
        }

        const formattedItems = data.meals.map((meal: Meal) => ({
          id: meal.idMeal,
          name: meal.strMeal,
          description: meal.strCategory,
          imageUrl: meal.strMealThumb,
          rating: meal.strRating || "4.5",
          deliveryTime: meal.strDeliveryTime || "30 min",
          price: Math.floor(Math.random() * 200) + 100,
        }));

        setFoodItems(formattedItems);
      } catch (err) {
        console.error("Error loading food items:", err);
        setError("Something went wrong while loading food items.");
      } finally {
        setLoading(false);
      }
    }

    loadFoodItems();
  }, []);

  function addToCart(itemId: string) {
    setCartItems({ ...cartItems, [itemId]: 1 });
  }

  function increaseQuantity(itemId: string) {
    setCartItems({ ...cartItems, [itemId]: cartItems[itemId] + 1 });
  }

  function decreaseQuantity(itemId: string) {
    const quantity = cartItems[itemId];
    if (quantity <= 1) {
      const updatedCart = { ...cartItems };
      delete updatedCart[itemId];
      setCartItems(updatedCart);
    } else {
      setCartItems({ ...cartItems, [itemId]: quantity - 1 });
    }
  }

  if (loading) return <div>Loading food items...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="food-list-container">
      <h1>Foodie's Cart ({Object.keys(cartItems).length} items)</h1>

      <div className="card-container">
        {foodItems.map((item) => (
          <div key={item.id} className="food-card">
            <img src={item.imageUrl} alt={item.name} />
            <div className="card-content">
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <p>₹{item.price}</p>
              <div className="card-footer">
                <span>⭐ {item.rating}</span>
                <span>• {item.deliveryTime}</span>
              </div>

              {cartItems[item.id] ? (
                <div className="cart-controls">
                  <button onClick={() => decreaseQuantity(item.id)}>-</button>
                  <span>{cartItems[item.id]}</span>
                  <button onClick={() => increaseQuantity(item.id)}>+</button>
                </div>
              ) : (
                <button onClick={() => addToCart(item.id)}>Add to Cart</button>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="Payment-Process">
        <Link
          to="/PaymentPage"
          state={{ cartItems: cartItems, foodItems: foodItems }}
        >
          <button className="pay-btn">Pay Now</button>
        </Link>
      </div>
    </div>
  );
};

export default FoodList;
