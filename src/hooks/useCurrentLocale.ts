import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { isLocale, type Locale } from "../types/app";

export function useCurrentLocale(): Locale {
  const params = useParams();

  return useMemo(() => {
    return isLocale(params.locale) ? params.locale : "en";
  }, [params.locale]);
}
