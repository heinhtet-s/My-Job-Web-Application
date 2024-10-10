import { usePathname } from "next/navigation";
import React from "react";

const useFullUrl = () => {
  const asPath = usePathname();
  const origin =
    typeof window !== "undefined" && window.location.origin
      ? window.location.origin
      : "";

  const URL = `${origin}${asPath}`;
  return URL;
};

export default useFullUrl;
