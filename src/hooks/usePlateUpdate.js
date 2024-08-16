import { usePlate } from "../contexts/PlateProvider";

export function usePlateUpdte(item) {
  const {
    totalItems,
    setTotalItems,
    plateItems,
    setPlateItems,
    setTotalPrice,
  } = usePlate();

  function addItem() {
    const newItem = new Map(plateItems);
    if (newItem.has(item)) console.log("has");
    newItem.set(item, 1);
    setPlateItems(newItem);

    setTotalPrice((initial) => initial + item.price);
  }

  function increaseQuantity() {
    const tempData = new Map(plateItems);
    tempData.set(item, tempData.get(item) + 1);
    setPlateItems(tempData);
    console.log(plateItems);

    setTotalPrice((initial) => initial + item.price);
  }

  function decreaseQuantity() {
    const tempData = new Map(plateItems);
    tempData.set(item, tempData.get(item) - 1);
    if (tempData.get(item) < 1) {
      deleteItem();
      return;
    }
    setPlateItems(tempData);

    setTotalPrice((initial) => initial - item.price);
  }

  function deleteItem() {
    const temp = new Map(plateItems);
    temp.delete(item);
    setPlateItems(temp);

    setTotalPrice((initial) => initial - item.price * plateItems.get(item));
  }
  return { addItem, increaseQuantity, decreaseQuantity, deleteItem };
}
