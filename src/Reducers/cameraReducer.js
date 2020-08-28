export const defaultState = {
   uri : "",
   width : "",
   height : "",
   exif : "",
   base64: "",

};
export default function homeReducer(state,action){
    switch (action.type) {   
        case 'SET_VALUE_PICTURE':
            return{
                ...state,
                ...action.photo,
            }
        case 'BACK':
            return{
                ...state,
                uri : "",
            }
        case 'GET_DATA_FAILED':
            break;
        case 'SELECT_ITEM':
            return({
                ...state,
                is_loading : false,
                ...action.value,
            })
        default:
            break;
    }
}