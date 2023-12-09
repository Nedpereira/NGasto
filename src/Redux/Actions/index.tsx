
export const NameUser = (name: string ) => ({
    type: 'SET_NAME',
    payload: name,
})

export const Calendar = (monthYear:string) => ({
    type: 'SET_CALENDAR',
    payload: monthYear,
})