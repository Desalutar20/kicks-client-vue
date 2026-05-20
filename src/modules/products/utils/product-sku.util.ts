export const isNewProduct = (createdAt: string | Date, daysThreshold: number = 30) => {
  const created = new Date(createdAt)
  const now = new Date()

  const diffInMs = now.getTime() - created.getTime()
  const diffInDays = diffInMs / (1000 * 60 * 60 * 24)

  return diffInDays <= daysThreshold
}
