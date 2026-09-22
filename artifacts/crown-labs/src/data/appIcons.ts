export const APP_ICON_ASSET_BASE_URL = "https://www.darenprince.com/assets/brand/products";

export function getAppIconAssetUrl(productId: string): string {
  return `${APP_ICON_ASSET_BASE_URL}/${productId}.png`;
}
