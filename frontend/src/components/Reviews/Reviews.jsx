import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchReviews } from "../../store/reviews";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import CreateReviewModal from "../CreateReview/CreateReview";
import DeleteReview from "../DeleteReview/DeleteReview";
import './Reviews.css'

function Reviews({ spotId }) {
    const dispatch = useDispatch()

    const spot = useSelector((state) => state.spots.currSpot)
    const currentReviews = useSelector((state) => state.reviews.spot.Reviews)
    const currentUser = useSelector((state) => state.session.user)

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"]

    useEffect(() => {
        dispatch(fetchReviews(spotId))
    }, [dispatch, spotId])

    if (!spot) return null
    if (!currentReviews) return null

    const reviewOrder = [...currentReviews].sort((review, nextReview) => new Date(nextReview.createdAt) - new Date(review.createdAt));

    let ownerCheck = false;
    if (spot && spot.Owner && currentUser) {
        ownerCheck = spot.Owner.id === currentUser.id;
    }

    let reviewsLabel = "Reviews"

    if (currentReviews.length === 1) {
        reviewsLabel = 'Review'
    }

    let notReviewedState = true
    if (currentReviews) {
        for (const currRev of currentReviews) {
            if (currentUser && currRev.User.id === currentUser.id) {
                notReviewedState = false;
                break
            }
        }
    }

    let loggedIn = false
    if (currentUser) loggedIn = true

    if (!currentReviews.length) {
        return (
            <div className='reviewContainer'>
                <div className='reviewHeader'>
                    <i className="fa-solid fa-star"></i>
                    <p className="reviewLabel">New</p>
                </div>
                {loggedIn && !ownerCheck && notReviewedState && (
                    <div className='postReviewContainer'>
                        <OpenModalButton
                            className="postReviewBtn"
                            buttonText="Post a Review"
                            modalComponent={<CreateReviewModal spot={spot} user={currentUser} />}
                        />
                    </div>
                )}
                {!ownerCheck && loggedIn && notReviewedState && <p>Be the first to post a review!</p>}
            </div>
        )
    }

    return (
        <div className="reviewContainer">
            <div className='reviewHeader'>
                <i id='reviewStar' className="fa-solid fa-star"></i>
                <div className='averageStarRating'>{spot.avgRating}</div>
                <div>•</div>
                <div className='reviewNumber'> {spot.numReviews}{reviewsLabel} </div>
            </div>
            {loggedIn && !ownerCheck && notReviewedState && (
                <OpenModalButton
                    className="postReviewBtn"
                    buttonText="Post a Review"
                    modalComponent={<CreateReviewModal spot={spot} user={currentUser} />}
                />
            )}
            <div className='reviewList'>
                {reviewOrder.map((review) => (
                    <div key={review.id} className='individualReview'>
                        <div className='userDisplay'>{review.User.firstName}</div>
                        <div className='date'>
                            <div className='month'>{months[new Date(review.createdAt).getMonth()]}</div>
                            <div className='year'>{review.createdAt.slice(6, 10)}</div>
                        </div>
                        <div className='reviewText'>{review.review}</div>
                        {currentUser && currentUser.id === review.User.id ? (
                            <div className='deleteReviewContainer'>
                                <OpenModalButton
                                    className='deleteReviewBtn'
                                    buttonText='Delete Review'
                                    modalComponent={<DeleteReview review={review} spot={spot} />}
                                />
                            </div>
                        ) : null}
                    </div>

                ))
                }
            </div>
        </div>
    )
}

export default Reviews
