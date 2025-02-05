import { useContext } from "react";
import CheckMark from "./assets/icon-order-confirmed.svg"; // შეკვეთის დადასტურების ნიშანი
import CartContext from "./CartContext"; // კალათის კონტექსტი
import { CartContextProps } from "./libs/types";
import OrderItem from "./components/OrderItem"; // შეკვეთის ერთეული კომპონენტი

// Checkout კომპონენტი
const Checkout = () => {
  // კონტექსტიდან პროდუქციის სია და კალათის გასუფთავების ფუნქცია
  const { products, resetCart } = useContext(CartContext) as CartContextProps;

  // ახალი შეკვეთის დაწყების ფუნქცია
  const handleNewOrder = () => {
    resetCart(); // კალათის გასუფთავება
    window.location.href = "/"; // მომხმარებლის გადამისამართება მთავარი გვერდზე
  };

  // კალათის მთლიანობის (subtotal) დათვლის ფუნქცია
  const calculateSubTotal = () => {
    let subtotal = 0;

    products.forEach((product) => {
      subtotal += product.price * product.quantity!; // თითოეული პროდუქტის ჯამი
    });

    return subtotal; // მთლიანობა
  };

  return (
    <div className="fixed inset-0 h-screen bg-black bg-opacity-50">
      
      <div className="flex h-full md:items-center md:justify-center">
        <div className="absolute bottom-0 flex w-full flex-col items-start justify-end rounded-lg bg-white p-4 md:relative md:h-fit md:w-[450px] md:px-8 md:pb-8">
          {/* შეკვეთის დადასტურების განყოფილება */}
          <div className="mb-6">
            <img src={CheckMark} alt="Order confirmed" />
            <h4 className="text-500 font-700 text-rose-900">Order Confirmed</h4> 
            <p>We hope you enjoy your food!</p> 
          </div>

          {/* პროდუქციის სია */}
          <div className="w-full rounded-lg bg-rose-100 p-4">
            {products.map((product) => (
              <div
                key={product.id}
                className="border-b border-b-rose-300 py-4 first-of-type:pt-0"
              >
                <OrderItem product={product} /> {/* შეკვეთის ერთეული კომპონენტი */}
              </div>
            ))}

            {/* შეკვეთის მთლიანობა (subtotal) */}
            <div className="mt-6 flex items-center justify-between">
              <p>Order Total</p>
              <span className="text-300 font-700 lg:text-500 text-rose-900">
                {calculateSubTotal().toLocaleString("en-us", {
                  style: "currency",
                  currency: "usd", 
                })}
              </span>
            </div>
          </div>

          
          <button
            onClick={handleNewOrder} // ღილაკზე დაჭერის შემთხვევაში იწყება ახალი შეკვეთა
            className="bg-primary-red font-500 mt-4 w-full rounded-full py-4 text-white transition-colors duration-300 hover:bg-rose-900"
          >
            Start Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
