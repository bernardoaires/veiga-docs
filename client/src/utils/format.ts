export const formatTitle = (title: string) => {
  if (title.length < 20) return title
  return title.slice(0, 19) + '...'
}
