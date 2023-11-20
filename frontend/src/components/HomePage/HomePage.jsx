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
                <div className='imgContainer'>
                    <div className='toolTip' title={spot.name}>
                        <img src={spot.previewImage} className='prevImg' />
                    </div>
                </div>
                <div className='locaPrice'>
                    <p className='location'>{spot.city}, {spot.state}</p>
                    <p className='price'>${spot.price}.00</p>
                </div>
                <div className='reviewSection'>
                    <div className='reviews'>
                        < i className='fa-solid fa-star'></i>{spot.avgRating ? <p>{spot.avgRating}</p> : <p>New</p>}
                    </div>
                </div>
            </NavLink >
        </div >
    ))
    return (
        <div className='pageReturn'>
            <div className='home'>{spotsContainer}</div>
        </div>
    )
}

export default HomePage
