import { csrfFetch } from "./csrf";

const GET_ALL_SPOTS = "spots/getAllSpots";
const GET_SPOT_DETAILS = "spots/getSpotDetails";
const GET_ALL_CU_SPOTS = "spots/getAllCUSpots";

const getAllSpots = (payload) => {
    return {
        type: GET_ALL_SPOTS,
        payload
    }
}

const getSpotDetails = (payload) => {
    return {
        type: GET_SPOT_DETAILS,
        payload
    }
}

const getAllCuSpots = (payload) => {
    return {
        type: GET_ALL_CU_SPOTS,
        payload
    }
}


export const getAllSpotsFetch = () => async (dispatch) => {
    const res = await csrfFetch("/api/spots", {
        method: "GET"
    })
    const allSpots = await res.json()
    dispatch(getAllSpots(allSpots))
    return allSpots
}

export const spotDetailsFetch = (spotId) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}`, {
        method: "GET"
    })
    const spotDetails = await res.json()
    dispatch(getSpotDetails(spotDetails))
    return spotDetails
}

export const currentUserSpotsFetch = (userId) => async (dispatch) => {
    const res = await csrfFetch("/api/spots/current", {
        method: "GET"
    })
    const currUserSpots = await res.json()
    dispatch(getAllCuSpots(userId))
    return currUserSpots
}

const initialState = {
    allSpots: {},
    currSpot: {}
}

export const spotsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_SPOTS:
            return { ...state, allSpots: action.payload }
        case GET_SPOT_DETAILS:
            return { ...state, currSpot: action.payload }
        default: return state
    }
}

export default spotsReducer
