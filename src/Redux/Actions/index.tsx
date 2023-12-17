export const User = (name: string, photo: string | null) => ({
    type: 'SET_USER',
    payload: {
        name,
        photo,
    },
});

export const Calendar = (monthYear: string) => ({
    type: 'SET_CALENDAR',
    payload: monthYear,
});
