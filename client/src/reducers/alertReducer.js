import { REMOVE_ALERT, SET_ALERT} from '../actions/types'
const intialState = []

export default (state=intialState,{type,payload}) => {
    switch (type) {
        case SET_ALERT:    
            return [...state,payload]
        case REMOVE_ALERT:
            return state.filter(alert=>alert.id!==payload)
        default:
            return state
        
    }
}