export const formatDate = (dateString) => {
    const ar = dateString.split ("-")
    return ar[2] + "." + ar[1] + "." + ar[0]
}

export const isPast = (dateSting) => {
    const dt = new Date (dateString)
    const today = new Date()
    return dt.getTime() < today.getTime()
}