// function to get the current date and time in simple format
export const getCurrentDateAndTime = () => {
    const now = new Date()
    const formattedDate = now.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    })
    const formattedTime = now.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
    })

    return { formattedDate, formattedTime }
}

export const getFirstLetter = (name: string) => {
    return name.charAt(0).toUpperCase()
}