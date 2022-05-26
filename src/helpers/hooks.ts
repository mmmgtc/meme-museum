import { useEffect, useState } from "react";

export default function useDebounce(value: any, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export function useImageResizer(src: string, height: number, width: number) {
  const [resizedSrc, setResizedSrc] = useState<string>(src);

  useEffect(() => {
    const ipfsId = src?.toString().includes("ipfs.io")
      ? src?.toString().substring(21)
      : src?.toString().substring(8, src.toString().length - 15);

    setResizedSrc(
      `https://d2wwrm96vfy3z4.cloudfront.net/image?&width=${width}&url=https://ipfs.io/ipfs/${ipfsId}`
    );
  }, [src, height, width]);

  return resizedSrc;
}

export function useWidowSize() {
  const [height, setHeight] = useState<number>(0);
  const [width, setWidth] = useState<number>(0);

  useEffect(() => {
    setHeight(window.innerHeight);
    setWidth(window.innerWidth - 50);
  }, []);

  return { height, width };
}
