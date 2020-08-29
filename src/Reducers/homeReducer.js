export const defaultState = {
    is_loading : true,
    name : "",
    urlIcon : "",
    id_ : "",
    nameVi:"",
    description:"",

};
export default function homeReducer(state,action){
    switch (action.type) {   
        case 'GET_DATA_SUCCEEDED':
            break;
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