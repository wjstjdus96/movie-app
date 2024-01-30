import { useEffect, useState } from "react";

interface ISliderSize {
  width: number | undefined;
  height: number | undefined;
}

export const useSliderSize = () => {
  const [sliderSize, setSliderSize] = useState<ISliderSize>({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => {
        setSliderSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      };

      window.addEventListener("resize", handleResize);
      handleResize();

      return () => window.removeEventListener("resize", handleResize);
    } else {
      return () =>
        window.removeEventListener("resize", () => {
          return null;
        });
    }
  }, []);
  return { sliderSize };
};
