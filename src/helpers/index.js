export const formatQuant = quantity =>{

    return Number(quantity).toLocaleString('en-US',
        {
            style: 'currency',
            currency: 'USD'
        }
    )
}

export const generateId = ()  => {
    const random = Math.random().toString(36).substring(2, 11)
    
    const date = Date.now().toString(36)

    return random + date
}

export const formatDate = (date) => {
    const newDate = new Date(date)
    const options = {
        /* weekday: 'long', */
        year: 'numeric',
        month: 'long',
        day: '2-digit'
    }

    return newDate.toLocaleDateString('eng', options)
}