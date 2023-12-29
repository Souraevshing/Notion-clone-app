import { useEffect, useState } from "react";

export const useOrigin = () => {
  const [isMounted, setIsMounnted] = useState(false);
  const origin =
    typeof window !== "undefined" && window.location.origin
      ? window.location.origin
      : "";

  useEffect(() => {
    setIsMounnted(true);
  }, []);

  if (!isMounted) {
    return "";
  }

  return origin;
};
