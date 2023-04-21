export const formatQuant = quantity =>{

    return Number(quantity).toLocaleString('en-US',
        {
            style: 'currency',
            currency: 'USD'
        }
    )
}