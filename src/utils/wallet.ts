
export const convertIDWallet = (id: string): string => {
  const [start, ...rest] = id.split('-')
  return `${start}-${rest.at(-1)}`
}