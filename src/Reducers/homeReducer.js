export const defaultState = {
    is_loading : true,

};
export default function homeReducer(state,action){
    switch (action.type) {   
        case 'GET_DATA_SUCCEEDED':
            break;
        case 'GET_DATA_FAILED':
            break;
        case 'SELECT_VALUE':
            break;
    
        default:
            break;
    }
}