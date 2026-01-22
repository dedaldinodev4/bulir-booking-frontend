
export const isCurrentMonth = (date: Date)  => {
  const now = new Date()

  return (
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear()
  )
}
