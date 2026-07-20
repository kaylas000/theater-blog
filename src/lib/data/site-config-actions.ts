import { SiteConfig } from "@/lib/types/site-config";
import siteConfig from "./site-config.json";

export function getSiteConfig(): SiteConfig {
  return siteConfig as SiteConfig;
}
