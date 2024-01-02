import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { useEffect } from "react";
import { deleteExistingReview, fetchReviews } from "../../store/reviews";
import { spotDetailsFetch } from "../../store/spots";
import './DeleteReview.css'

function DeleteReview({ spot, review }) {
    const dispatch = useDispatch()
    const { closeModal } = useModal()


    useEffect(() => {
        dispatch(fetchReviews(spot.id))
    }, [dispatch, spot]);

    const deleteReview = () => {

        dispatch(deleteExistingReview(review.id))
        dispatch(spotDetailsFetch(spot.id))
        closeModal()
    }

    const cancelDelete = () => {

        closeModal()
    }

    if (!review) return null

    return (
        <div className='deleteReviewModal'>
            <h2 className='confirmationTitle '>Confirm Delete</h2>
            <p className="confirmation">Are you sure you want to delete this review?</p>
            <button className="deleteConfirm red" onClick={deleteReview}>
                Yes (Delete Review)
            </button>
            <button className="cancelDelete" onClick={cancelDelete}>
                No (Keep Review)
            </button>
        </div>
    )

}

export default DeleteReview
