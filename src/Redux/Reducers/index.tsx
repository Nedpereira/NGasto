const initialState = {
  name: "",
  };
  
  const reducer = (state = initialState, action: any) => {
    switch (action.type) {
      case "SET_NAME":
        return { ...state, name: action.payload };
      default:
        return state;
    }
  };
  
  export default reducer;