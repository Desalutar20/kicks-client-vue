export const getDiscountPercent = (price: number, salePrice: number | null | undefined) => {
  if (!salePrice || salePrice >= price) {
    return null
  }

  return Math.round(((price - salePrice) / price) * 100)
}
