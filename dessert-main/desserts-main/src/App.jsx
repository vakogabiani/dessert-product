import "./App.css";
import { AddToCart, RemoveItem } from "./Icons"; // დამატებისა და წაშლის აიქონები
import dessertsProducts from "./data.json"; // დესერტების მონაცემები JSON ფაილიდან

// const BASE_URL = "https://res.cloudinary.com/dc2c49xov/desserts"; // სურათების ბეის URL 

function App() {
  const [cart, setCart] = useState([]); // კალათის მდგომარეობა (ცარიელი საწყისი სია)

  // კალათაში პროდუქტის დამატების ფუნქცია
  const addToCart = (dessert) => {
    const exists = cart.find((item) => item.name === dessert.name); // ამოწმებს, უკვე არის თუ არა პროდუქტი კალათაში
    if (exists) {
      // თუ პროდუქტი უკვე არსებობს, რაოდენობას ზრდის 1-ით
      setCart(
        cart.map((item) =>
          item.name === dessert.name ? { ...item, qty: item.qty + 1 } : item
        )
      );
    } else {
      // თუ პროდუქტი არ არსებობს, ამატებს მას ახალი რაოდენობით (qty: 1)
      setCart([...cart, { ...dessert, qty: 1 }]);
    }
  };

  // კალათის განახლების ფუნქცია (რაოდენობის ზრდა ან შემცირება)
  const updateCart = (name, change) => {
    setCart(
      cart
        .map((item) =>
          item.name === name ? { ...item, qty: item.qty + change } : item
        )
        .filter((item) => item.qty > 0) // თუ რაოდენობა 0-ზე ნაკლებია, პროდუქტი წაშლილია
    );
  };

  return (
    <div className="App">
      <h1>Dessert Shop</h1> {/* აპლიკაციის სათაური */}
      <div className="desserts-list">
        {/* დესერტების სია */}
        {dessertsProducts.map((dessert) => (
          <Dessert
            key={dessert.name} // უნიკალური გასაღები თითოეული დესერტისთვის
            dessert={dessert} // დესერტის მონაცემები
            inCart={cart.some((item) => item.name === dessert.name)} // ამოწმებს, არის თუ არა კალათაში
            addToCart={() => addToCart(dessert)} // დამატების ფუნქცია
            updateCart={updateCart} // განახლების ფუნქცია
          />
        ))}
      </div>
      <Cart cart={cart} updateCart={updateCart} /> {/* კალათის კომპონენტი */}
    </div>
  );
}

export default App;
