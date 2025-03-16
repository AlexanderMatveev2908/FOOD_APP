import { useEffect, useState } from "react";
import { tailwindBreak } from "../config/constants/breakpoints";

export const useUpdateCardsLimit = () => {
  const [limit, setLimit] = useState(5);

  useEffect(() => {
    const updateLimit = () => {
      const w = window.innerWidth;

      if (w > tailwindBreak.xl) setLimit(12);
      else if (w > tailwindBreak.lg) setLimit(9);
      else setLimit(6);
    };

    updateLimit();

    window.addEventListener("resize", updateLimit);

    return () => {
      window.removeEventListener("resize", updateLimit);
    };
  }, [limit]);

  return { limit };
};
