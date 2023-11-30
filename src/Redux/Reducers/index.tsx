const initialState = {
    name: '',
    calendar: {
        month: '',
        year: '',
    },
};

const reducer = (state = initialState, action: any) => {
    switch (action.type) {
        case 'SET_NAME':
            return { ...state, name: action.payload };
        case 'SET_CALENDAR':
            return { ...state, calendar: { month: action.payload.month, year: action.payload.year } };
        default:
            return state;
    }
};

export default reducer;
