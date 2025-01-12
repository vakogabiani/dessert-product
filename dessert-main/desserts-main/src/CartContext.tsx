import { createContext, ReactNode } from "react";
import { CartContextProps, ProductItem } from "./libs/types";
import { useLocalStorage } from "./useLocalStorage";

// ინტერფეისი აღწერს პროვაიდერის პროპსებს
interface CartProviderProps {
  children: ReactNode;
}

// კონტექსტის შექმნა
const CartContext = createContext<CartContextProps | undefined>(undefined);

// მთავარი CartProvider კომპონენტი, რომელიც უზრუნველყოფს კონტექსტს
export function CartProvider({ children }: CartProviderProps) {
  
  const [products, setProduct] = useLocalStorage<ProductItem[]>(
    "dessert-product",
    [], 
  );

  //  პროდუქტის კალათაში დამატების ფუნქცია
  const addToCart = (
    id: number,
    name: string,
    price: number,
    image: string,
  ) => {
    // ამოწმებს, უკვე არის თუ არა პროდუქტი კალათაში
    const existingProduct = products.find((product) => product.id === id);

    if (existingProduct) {
      // თუ პროდუქტი უკვე არსებობს, მისი რაოდენობა იზრდება
      const updateProduct = products.map((product) => {
        if (product.id === id) {
          return { ...product, quantity: product.quantity! + 1 };
        }

        return product; // თუ პროდუქტი არ ემთხვევა, უცვლელი რჩება
      });

      setProduct(updateProduct); // განახლებული სია
    } else {
      // თუ პროდუქტი არ არის კალათაში, ამატებს ახალ პროდუქტს
      setProduct((prevProduct) => [
        ...prevProduct,
        { id, name, price, image, quantity: 1 },
      ]);
    }
  };

  // პროდუქტის რაოდენობის შემცირების ფუნქცია
  const reduceCartQuantity = (id: number) => {
    const updateProduct = products.map((product) => {
      if (product.id === id) {
        const updateQuantity = product.quantity! - 1;

        if (updateQuantity < 1) {
          removeFromCart(id); // თუ რაოდენობა 0-ს უტოლდება, პროდუქტი იშლება
        }

        return { ...product, quantity: updateQuantity }; // განახლებული პროდუქტი
      }

      return product;
    });

    setProduct(updateProduct); // განახლებული პროდუქტების სია
  };

  // პროდუქტის კალათიდან წაშლის ფუნქცია
  const removeFromCart = (id: number) => {
    setProduct((prevProduct) =>
      prevProduct.filter((product) => product.id !== id), // ფილტრავს პროდუქტებს ID-ის მიხედვით
    );
  };

  // ამოწმებს, არის თუ არა კონკრეტული პროდუქტი კალათაში
  const isItemInCart = (id: number) => {
    return products.some((product) => product.id === id);
  };

  // კალათის გასუფთავების ფუნქცია
  const resetCart = () => {
    setProduct([]); // სია ხდება ცარიელი
  };

  return (
    <CartContext.Provider
      value={{
        products, 
        addToCart, 
        reduceCartQuantity, 
        removeFromCart, 
        isItemInCart, 
        resetCart, 
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartContext;
