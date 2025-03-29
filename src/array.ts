export const getRandomItemFrom = <T>(arr: ReadonlyArray<T>): T => {
  const randomIndex = Math.floor(Math.random() * arr.length)
  return arr[randomIndex]
}
