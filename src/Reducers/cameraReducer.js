export const defaultState = {
   uri : "",
   width : "",
   height : "",
   exif : "",
   base64: "",
   detection : {},
   loading : false,
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
                loading : false,
            }
        case 'PROCESS_IMAGE_REQUESTED':
            return{
                ...state,
                loading : true,
            }
        case 'PROCESS_IMAGE_SUCCEEDED':
            return{
                ...state,
                loading : false,
                detection : action.data,
                message : "",
            }
        case 'PROCESS_IMAGE_FAILED':
            return{
                ...state,
                loading : false,
                detection : {},
                message : "",
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