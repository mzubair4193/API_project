import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom"
import { getAllSpotsFetch } from '../../store/spots'
import './HomeMain.css'

function HomePage() {
    const dispatch = useDispatch()
    const spots = useSelector((state) => state.spots.allSpots.Spots)

    useEffect(() => {
        dispatch(getAllSpotsFetch())
    }, [dispatch])


    const spotsContainer = spots?.map((spot) => (
        <div key={spot?.id} className="spotContainer">
            <NavLink to={`/spots/${spot?.id}`}>
                <div className='imageContainer'>
                    <div className='spotName' title={spot.name}>
                        <img src={spot.previewImage} className='prevImg' />
                    </div>
                </div>
                <div className='spotPrice'>
                    <p className='location'>{spot.city}, {spot.state}</p>
                    <p className='price'>${spot.price}.00 night</p>
                </div>
                <div className='reviewsContainer'>
                    <div className='reviews'>
                        < i className='fa-solid fa-star'></i>{spot.avgRating ? <p>{spot.avgRating}</p> : <p>New</p>}
                    </div>
                </div>
            </NavLink >
        </div >
    ))
    return (
        <div className='pageReturn'>
            <div className='homePage'>{spotsContainer}</div>
        </div>
    )
}

export default HomePage
