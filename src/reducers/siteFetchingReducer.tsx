import {SiteFetching} from "../types/index";
import {SITE_IDLE, SITE_IS_FETCHING} from "../actions/index";

function SiteFetchingReducer(state: SiteFetching, action): SiteFetching{
	switch (action.type){
		case SITE_IS_FETCHING:
			return {
				...state,
				isFetching: true
			};
		case SITE_IDLE:
			return{
				...state,
				isFetching: false,
			};
		default:
			return {
				isFetching: false
			}
	}
}
export default SiteFetchingReducer;