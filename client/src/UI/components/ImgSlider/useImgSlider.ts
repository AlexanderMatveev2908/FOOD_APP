import { useCallback, useEffect, useState } from "react";
import { tailwindBreak } from "../../../core/config/constants/breakpoints";
import { ImageUploadedType } from "../../../types/types";

export const useImgSlider = ({
  images,
}: {
  images: ImageUploadedType[] | { id: string; img: string }[];
}) => {
  const [activeIndx, setActiveIdx] = useState<number>(0);
  const [btnClicked, setBtnClicked] = useState<boolean>(false);
  const [translateVal, setTranslateVal] = useState<number>(100);

  useEffect(() => {
    const updateTranslateVal = () =>
      window.innerWidth > tailwindBreak.xl
        ? setTranslateVal(50)
        : window.innerWidth > tailwindBreak.lg
        ? setTranslateVal(60)
        : window.innerWidth > tailwindBreak.md
        ? setTranslateVal(70)
        : window.innerWidth > tailwindBreak.sm
        ? setTranslateVal(90)
        : setTranslateVal(90);

    updateTranslateVal();

    window.addEventListener("resize", updateTranslateVal);

    return () => window.removeEventListener("resize", updateTranslateVal);
  }, []);

  const handleNext = useCallback(() => {
    if (activeIndx === images.length - 1) setActiveIdx(0);
    else setActiveIdx((prev) => prev + 1);
  }, [activeIndx, images.length]);

  const handlePrev = () => {
    if (activeIndx === 0) setActiveIdx(images.length - 1);
    else setActiveIdx((prev) => prev - 1);
  };

  useEffect(() => {
    if (btnClicked) return;

    const interval = setInterval(() => {
      handleNext();
    }, 1500);

    return () => clearInterval(interval);
  }, [btnClicked, handleNext]);

  return { activeIndx, handleNext, handlePrev, setBtnClicked, translateVal };
};
