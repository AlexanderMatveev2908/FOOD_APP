import { CartItem } from "../../types/allTypes/cart";
import { OrderItem } from "../../types/allTypes/orders";

export const priceFormatter = ({
  price,
  showStr = false,
}: {
  price: number;
  showStr?: boolean;
}) => {
  const formatted = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price ?? 0);

  if (!price && showStr) return "Free";

  return formatted;
};

export const calcTotPriceItem = (item: CartItem | OrderItem) =>
  priceFormatter({ price: item.quantity * item.price });

export const calcTotWithDelivery = (tot: number, del: number) =>
  priceFormatter({ price: tot + del });
