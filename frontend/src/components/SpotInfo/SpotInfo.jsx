import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { spotDetailsFetch } from "../../store/spots";
import { useParams } from "react-router-dom";
import './SpotInfo.css'
import Reviews from "../Reviews/Reviews";

function SpotInfo() {
    const dispatch = useDispatch()
    const { spotId } = useParams()
    const spot = useSelector((state) => state.spots.currSpot)
    console.log(spot)

    // if (spot.id !== parseInt(spotId)) return null;
    useEffect(() => {
        dispatch(spotDetailsFetch(spotId))
    }, [dispatch, spotId])
    if (!spot) return null
    if (!spot.SpotImages) return null;
    if (spot.id !== parseInt(spotId)) return null;
    const showAlert = () => {
        alert("Feature Coming Soon")
    }
    let reviewsLabel;
    if (spot.numReviews === 1) reviewsLabel = 'Review'
    if (spot.numReviews > 1) reviewsLabel = 'Reviews'
    let revNum = spot.numReviews
    if (spot.numReviews === 0) revNum = ''
    let separator = '•'
    if (!spot.numReviews) separator = ''

    return (
        <div className='spotInfoContainer'>
            <h1 className='spotName'>{spot.name}</h1>
            <div className='spotLocation'>{spot.city}, {spot.state}, {spot.country}</div>
            <div className='imageContainer'>
                <div> <img src={spot.SpotImages[0].url} className='mainImg' /> </div>
                <div className='otherImages'>
                    <div className='firstSet'>
                        {spot.SpotImages[1] && <img src={spot.SpotImages[1].url} id='allImages' className='image1' />}
                        {spot.SpotImages[2] && <img src={spot.SpotImages[2].url} id='allImages' className='image2' />}
                    </div>
                    <div className='otherImgs2'>
                        {spot.SpotImages[3] && <img src={spot.SpotImages[3].url} id='allImages' className='image3' />}
                        {spot.SpotImages[4] && <img src={spot.SpotImages[4].url} id='allImages' className='image4' />}
                    </div>
                </div>
            </div>
            <div className='descriptionResponse'>
                <div className='bodyContainer'>

                    <div className='details'>
                        <h2 className='ownerName'>Hosted by {spot.Owner.firstName} {spot.Owner.lastName}</h2>
                        <p className='description'>{spot.description}</p>
                    </div>
                    <div className='reserve'>
                        <div className='notReserve'>
                            <div className='reserveInfo'>
                                <div className='priceReviews'> ${spot.price} night </div>
                                <div className='reviewInfo'>
                                    < i className='fa-solid fa-star'>{separator}</i>{typeof spot.avgRating === 'number' ? (<p>{parseFloat(spot.avgRating).toFixed(1)}</p>) : (<p>New</p>)}
                                    <div className='reviewCount'>•  {revNum}{reviewsLabel}</div>
                                </div>
                            </div>
                        </div>
                        <button className="reserveBtn" onClick={showAlert}>Reserve</button>
                    </div>
                </div>
            </div>
            <Reviews spotId={spotId} />
        </div>
    )
}


export default SpotInfo
