import { createContext, useContext, useState } from "react";

const menuData = {
  Recommended: [
    {
      image: "menu/Samosa.jpg",
      name: "Paneer Masala",
      price: 80,
      inStock: true,
    },
    {
      image: "menu/Samosa.jpg",
      name: "Dosa",
      price: 50,
      inStock: false,
    },
    {
      image: "menu/Samosa.jpg",
      name: "Garlic Naan",
      price: 25,
      inStock: true,
    },
    {
      image: "menu/Samosa.jpg",
      name: "Garlic Naan",
      price: 25,
      inStock: true,
    },
    {
      image: "menu/Samosa.jpg",
      name: "Samosa",
      price: 25,
      inStock: true,
    },
  ],
  "South Indian": [
    {
      image: "menu/Samosa.jpg",
      name: "Masala Dosa",
      price: 80,
      inStock: true,
    },
    {
      image: "menu/Samosa.jpg",
      name: "Idli",
      price: 50,
      inStock: true,
    },
    {
      image: "menu/Samosa.jpg",
      name: "Medu Vada",
      price: 50,
      inStock: true,
    },
    {
      image: "menu/Samosa.jpg",
      name: "Medu Vada",
      price: 50,
      inStock: true,
    },
    {
      image: "menu/Samosa.jpg",
      name: "Medu Vada",
      price: 50,
      inStock: true,
    },
  ],
  "Main Course": [
    {
      image: "menu/Samosa.jpg",
      name: "Matar Paneer",
      price: 50,
      inStock: true,
    },
    {
      image: "menu/Samosa.jpg",
      name: "Paneer Masala",
      price: 50,
      inStock: true,
    },
    {
      image: "menu/Samosa.jpg",
      name: "Shahi Paneer",
      price: 50,
      inStock: true,
    },
    {
      image: "menu/Samosa.jpg",
      name: "Malai Kofta",
      price: 50,
      inStock: true,
    },
    {
      image: "menu/Samosa.jpg",
      name: "Kadhai Paneer",
      price: 50,
      inStock: true,
    },
    {
      image: "menu/Samosa.jpg",
      name: "Mushroom Matar",
      price: 50,
      inStock: true,
    },
    {
      image: "menu/Samosa.jpg",
      name: "Paneer Pasanda",
      price: 50,
      inStock: true,
    },
  ],
  "Indian Breads": [
    {
      image: "menu/Samosa.jpg",
      name: "Tandoori Roti",
      price: 15,
      inStock: true,
    },
    {
      image: "menu/Samosa.jpg",
      name: "Tawa Roti",
      price: 15,
      inStock: true,
    },
    {
      image: "menu/Samosa.jpg",
      name: "Naan",
      price: 20,
      inStock: true,
    },
    {
      image: "menu/Samosa.jpg",
      name: "Garlic Naan",
      price: 25,
      inStock: true,
    },
    {
      image: "menu/Samosa.jpg",
      name: "Laccha Paratha",
      price: 20,
      inStock: true,
    },
  ],
};

const MenuContext = createContext();

function MenuProvider({ children }) {
  const [menu, setMenu] = useState(menuData);
  return <MenuContext.Provider value={menu}>{children}</MenuContext.Provider>;
}

function useMenu() {
  const context = useContext(MenuContext);
  if (context === undefined)
    throw new Error("MenuContext was used outside the MenuProvider");
  return context;
}

export { MenuProvider, useMenu };
