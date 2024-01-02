import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { useState } from "react";
import { deleteCurrSpot } from "../../store/spots";
import './DeleteSpot.css'

function DeleteModal({ spot }) {
    const dispatch = useDispatch()
    const { closeModal } = useModal()
    const [spotExists, setSpotExists] = useState(true)

    const deleteSpotModal = (e) => {
        e.preventDefault()
        dispatch(deleteCurrSpot(spot.id))
        closeModal()
        setSpotExists(false)
    }
    const cancelDelete = (e) => {
        e.preventDefault()
        closeModal()
    }
    return (
        <div>
            {spotExists && (
                <div className='deleteContainer'>
                    <h2 className='confirmText'>Confirm Delete</h2>
                    <p className='confirmationText'>Are you sure you want to remove this spot?</p>
                    <button className='deleteBtn red' onClick={deleteSpotModal}>Yes (Delete Spot)</button>
                    <button className='cancelBtn' onClick={cancelDelete}>No (Keep Spot)</button>
                </div>
            )}
        </div>
    )
}

export default DeleteModal
