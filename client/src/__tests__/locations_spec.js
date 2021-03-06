import deepFreeze from 'deep-freeze';

import { locationsReducer } from '../reducers/locationsReducer';
import { FETCH_LOCATIONS_DATA_SUCCESS, FETCH_LOCATIONS_DATA_FAILURE, SET_ITINERARY_DATA, SET_FETCHING} from '../actions/types';

it("updates the location data", function(){
    const initialState = {
        data: {}
    };
    const action = {
        type: FETCH_LOCATIONS_DATA_SUCCESS,
        data: {
            food: ["yum yum"]
        }
    };
    const finalState = {
        data: {
            food: ["yum yum"]
        },
        isFetching: false
    };
    deepFreeze(initialState);
    deepFreeze(action);
    
    
    expect(locationsReducer(initialState, action)).toEqual(finalState);
})

it("updates the error in the state on failure", function(){
    const initialState = {
        data: {},
        error: null
    };
    const action = {
        type: FETCH_LOCATIONS_DATA_FAILURE,
        error: "There was an error while fetching"
    };
    const finalState = {
        data: {},
        error: "There was an error while fetching",
        isFetching: false
    };
    deepFreeze(initialState);
    deepFreeze(action);
    
    
    expect(locationsReducer(initialState, action)).toEqual(finalState);
})

import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)
import fetchMock from 'fetch-mock'
import { fetchLocationsData } from '../actions/locationsActions';

describe('async actions', () => {
    afterEach(() => {
        fetchMock.reset();
    })
    it('creates FETCH LCATIONS DATA SUCCESS upon successful status 200', () => {
        fetchMock.post(`/api/itinerary/start`, {
            status: 200,
            body: {
                locations: {food: [], sights: []}, itinerary: "bunny"
            }
        })
        const expectedActions = [{
            type: SET_FETCHING
        },
            {
            type: SET_ITINERARY_DATA,
            data: "bunny"
        },
        {
            type: FETCH_LOCATIONS_DATA_SUCCESS,
            data: {food: [], sights: []}
        }]
        const store = mockStore({
            locations: {}
        })

        return store.dispatch(fetchLocationsData()).then(() => {
            // return of async actions
            expect(store.getActions()).toEqual(expectedActions)
        })
    })
})