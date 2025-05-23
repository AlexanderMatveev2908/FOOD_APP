import { useEffect, useState } from "react";
import { tailwindBreak } from "../../../../core/config/constants/breakpoints";

export const useUpdateSizeLoaderPage = () => {
  const [size, setSize] = useState(50);

  useEffect(() => {
    const updateSize = () => {
      const currWidth = window.innerWidth;

      return currWidth > tailwindBreak.md
        ? setSize(100)
        : currWidth > tailwindBreak.sm
        ? setSize(75)
        : setSize(50);
    };

    updateSize();

    window.addEventListener("resize", updateSize);

    return () => window.removeEventListener("resize", updateSize);
  }, [setSize]);

  return { size };
};
