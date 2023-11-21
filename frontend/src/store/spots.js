import { csrfFetch } from "./csrf";

const GET_ALL_SPOTS = "spots/getAllSpots";
const GET_SPOT_DETAILS = "spots/getSpotDetails";
const CREATE_A_SPOT = "spots/createSpot"
const CREATE_SI = "spot/createSI"
const UPDATE_A_SPOT = "spots/updateSpot"
const DELETE_A_SPOT = "spots/deleteSpot"

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
const createSpot = (payload) => {
    return {
        type: CREATE_A_SPOT,
        payload
    }
}

const createSI = (payload) => {
    return {
        type: CREATE_SI,
        payload
    }
}

const updateSpot = (payload) => {
    return {
        type: UPDATE_A_SPOT,
        payload
    }
}

const deleteSpot = (payload) => {
    return {
        type: DELETE_A_SPOT,
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

export const createNewSpot = (payload) => async (dispatch) => {
    const res = await csrfFetch("/api/spots", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    })
    if (res.ok) {
        const spot = await res.json()
        dispatch(createSpot(spot))
        console.log("reducer spot creation: ", spot)
        return spot
    } else {
        const errs = await res.json()
        return errs
    }
}

export const newSpotImage = (img, spotId) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}/images`, {
        method: "POST",
        body: JSON.stringify(img)
    })
    if (res.ok) {
        const newImg = await res.json()
        dispatch(createSI(newImg))
        return newImg
    } else {
        const errs = await res.json()
        return errs
    }
}

export const spotUpdate = (updatedDetails, spotId) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}`, {
        method: "PUT",
        body: JSON.stringify(updatedDetails)
    })
    if (res.ok) {
        const updatedSpot = await res.json()
        dispatch(updateSpot(updatedSpot))
        return updatedSpot
    } else {
        const errs = await res.json()
        return errs
    }
}

export const deleteCurrSpot = (spotId) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}`, {
        method: "DELETE"
    })
    if (res.ok) {
        dispatch(deleteSpot(spotId))
    } else {
        const errs = res.json()
        return errs
    }
}

const initialState = {
    allSpots: {},
    currSpot: {}
}

export const spotsReducer = (state = initialState, action) => {
    const spotsPostCreation = { ...state.allSpots.Spots }
    switch (action.type) {
        case GET_ALL_SPOTS:
            return { ...state, allSpots: action.payload }
        case GET_SPOT_DETAILS:
            return { ...state, currSpot: action.payload }
        case CREATE_A_SPOT:
            return { ...state, allSpots: spotsPostCreation, currSpot: action.payload }
        case UPDATE_A_SPOT:
            spotsPostCreation[action.payload] = action.payload
            return { ...state, allSpots: spotsPostCreation, currSpot: action.payload }
        case DELETE_A_SPOT:
            delete spotsPostCreation[action.payload]
            return { ...state, allSpots: spotsPostCreation }
        default:
            return state
    }
}

export default spotsReducer
