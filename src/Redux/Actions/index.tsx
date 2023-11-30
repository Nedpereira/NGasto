
export const NameUser = (name: string ) => ({
    type: 'SET_NAME',
    payload: name,
})

export const Calendar = (month:string , year: string) => ({
    type: 'SET_CALENDAR',
    payload: {
        month,
        year
    }
})