export const formatDate = (dateString) => {
    const ar = dateString.split ("-")
    return ar[2] + "." + ar[1] + "." + ar[0]
}