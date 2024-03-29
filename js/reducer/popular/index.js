import Types from '../../action/types';

const defaultState = {}
/**
 * popular: {
 *  java: {
 *      items: [],
 *      isLoading: false,
 *  },
 *  ios: {
 *      items: [],
 *      isLoading: false,
 *  }
 * }
 * state树，横向扩展
 * 1.如何动态的设置store,和动态的获取store(难点：storekey不固定)
 * @param {*} state 
 * @param {*} action 
 */
export default function onAction(state = defaultState, action) {
    switch(action.type) {
        case Types.LOAD_POPULAR_SUCCESS:
            return {
                ...state,
                [action.storeName] : {
                    ...[action.storeName],
                    items: action.items,
                    isLoading: false
                }
            }
        case Types.POPULAR_REFRESH:
            return {
                ...state,
                [action.storeName] : {
                    ...[action.storeName],
                    isLoading: true
                }
            }
            case Types.LOAD_POPULAR_FAIL:
                    return {
                        ...state,
                        [action.storeName] : {
                            ...[action.storeName],
                            isLoading: false
                        }
                    }
        default:
            return state;
    }
}