import { db } from "../screens/CaisseScreen";

export const addItem = (item, p) => {
  db.ref("/items").push({
    name: item,
    price: p,
  });
};
