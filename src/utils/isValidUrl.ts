const isValidHttpUrl = (urlString: string) => {
  try {
    const url = new URL(urlString)
    return url.protocol === 'http:' || url.protocol === 'https:'
  } catch (err) {
    return false
  }
}
export default isValidHttpUrl
