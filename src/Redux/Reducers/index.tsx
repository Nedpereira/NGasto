const initialState = {
    user: {
        name: '',
        photo: ''
    },
    monthYear: '',
};

const reducer = (state = initialState, action: any) => {
    switch (action.type) {
        case 'SET_USER':
            return { ...state, user:{name: action.payload.name, photo: action.payload.photo } };
        case 'SET_CALENDAR':
            return { ...state, monthYear: action.payload };
        default:
            return state;
    }
};

export default reducer;
