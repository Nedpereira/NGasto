const initialState = {
    name: '',
    monthYear: '',
};

const reducer = (state = initialState, action: any) => {
    switch (action.type) {
        case 'SET_NAME':
            return { ...state, name: action.payload };
        case 'SET_CALENDAR':
            return { ...state, monthYear: action.payload };
        default:
            return state;
    }
};

export default reducer;
