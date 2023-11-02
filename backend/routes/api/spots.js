const express = require('express')
const { Spot, Review, User, SpotImage, Booking, ReviewImage } = require('../../db/models');
const { requireAuth } = require('../../utils/auth')
const router = express.Router()
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const queryFilters = require("../../utils/queryfilters");
//err middleware for checking spots
const checkSpotDetails = [
    check('address')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage("Street address is required"),
    check('city')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage("City is required"),
    check('state')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage("State is required"),
    check('country')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage("Country is required"),
    check('lat')
        .exists({ checkFalsy: true })
        .isFloat({ min: -90, max: 90 })
        .withMessage("Latitude is not valid"),
    check('lng')
        .exists({ checkFalsy: true })
        .isFloat({ min: -180, max: 180 })
        .withMessage("Longitude is not valid"),
    check('name')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage("Name is required"),
    check('name')
        .isLength({ max: 50 })
        .withMessage("Name must be less than 50 character"),
    check('description')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage("Description is required"),
    check('price')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage("Price per day is required"),
    handleValidationErrors
]


//Get all spots
router.get("/", queryFilters, async (req, res) => {
    const {
        limit,
        offset,
        size,
        page,
        minLat,
        maxLat,
        minLng,
        maxLng,
        minPrice,
        maxPrice,
        where,
    } = req.pagination;
    const spots = await Spot.unscoped().findAll({
        where,
        include: [
            {
                model: SpotImage,
                attributes: ["url"],
            },
        ],
        limit,
        offset,
    });
    const spotsJSON = spots.map((ele) => ele.toJSON());

    for (let i = 0; i < spotsJSON.length; i++) {
        if (spotsJSON[i].SpotImages[0]) {
            spotsJSON[i].previewImage = spotsJSON[i].SpotImages[0].url;
            delete spotsJSON[i].SpotImages;
        }
        if (!spotsJSON[i].previewImage) {
            spotsJSON[i].previewImage = null;
            delete spotsJSON[i].SpotImages;
        }
    }
    for (let spot of spotsJSON) {
        const sum = await Review.sum("stars", {
            where: {
                spotId: spot.id,
            },
        });
        const total = await Review.count({
            where: {
                spotId: spot.id,
            },
        });
        spot.avgRating = sum / total;
    }
    res.json({ Spots: spotsJSON, page: page, size: size });
});

//Get all Spots owned by CU
router.get('/current', requireAuth, async (req, res) => {
    const currentId = req.user.id
    const spots = await Spot.findAll({
        where: {
            ownerId: currentId,
        },
        include: [Review, SpotImage]
    })
    let addedPropSpots = spots.map(async (spot) => {
        let reviews = spot.toJSON().Reviews
        let starRatings = []
        let reviewArr = []

        reviews.forEach(review => {
            let rating = review.stars
            starRatings.push(rating)
            reviewArr.push(reviews)
        });
        let sum = starRatings.reduce((prevNum, currNum) => prevNum + currNum, 0)
        let avgRating = parseFloat((sum / starRatings.length).toFixed(2))
        spot.avgRating = avgRating
        const spotImage = await SpotImage.findOne({ where: { spotId: spot.id } })
        if (spotImage) {
            spot.previewImage = spotImage.url;
        }
        let rdel = spot.toJSON()
        delete rdel.Reviews
        delete rdel.SpotImages
        return rdel
    });

    addedPropSpots = await Promise.all(addedPropSpots)

    res.status(200).json({
        "Spots": addedPropSpots
    })
})


router.get('/:spotId', async (req, res) => {
    let spot = await Spot.findByPk(req.params.spotId)
    if (!spot) res.status(404).json({ message: "Spot couldn't be found" })
    spot = spot.toJSON()

    //numReviews
    const revs = await Review.findAll({
        where: { spotId: spot.id }
    })
    const numRevs = revs.length

    //avgRating
    let starRatings = []
    revs.forEach((review) => {
        starRatings.push(review.stars)
    })
    let sum = 0
    starRatings.forEach((rating) => {
        sum += rating
    })

    const avgRating = Number((sum / starRatings.length).toFixed(2))

    const spotImage = await SpotImage.findAll({ where: { spotId: spot.id }, attributes: ['id', 'url', 'preview'] })

    const owner = await User.findByPk(spot.ownerId, { attributes: ['id', 'firstName', 'lastName'] })

    if (spotImage.length) spot.previewImage = spotImage[0].url
    spot.numReviews = numRevs
    spot.avgRating = avgRating
    spot.SpotImages = spotImage
    spot.Owner = owner

    res.status(200).json(spot)
})

//create a new spot

router.post('/', requireAuth, checkSpotDetails, async (req, res) => {
    const userId = req.user.id
    const { address, city, state, country, lat, lng, name, description, price } = req.body
    const newSpot = await Spot.create({
        ownerId: userId,
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price
    })
    let spot = newSpot.toJSON()
    // delete spot.avgRating
    // delete spot.previewImage
    res.status(201).json(spot)
})


//create image for a spot

router.post('/:spotId/images', requireAuth, async (req, res) => {
    const spot = await Spot.findByPk(req.params.spotId)
    const { url, preview } = req.body
    if (!spot) {
        res.status(404).json({
            message: "Spot couldn't be found",
        })
    }
    if (spot.ownerId !== req.user.id) {
        res.status(403).json({
            message: "Forbidden"
        })
    }
    if (preview === true) {
        spot.previewImage = url
        await spot.save()
    }
    const newSpotImage = await spot.createSpotImage({
        url, preview
    })
    newSpotImage.toJSON().url = url
    newSpotImage.toJSON().preview = preview
    let img = { id: newSpotImage.id, url, preview }
    await newSpotImage.save()
    res.status(200).json(img)
})

//edit a spot

router.put('/:spotId', requireAuth, checkSpotDetails, async (req, res) => {
    const spot = await Spot.findByPk(req.params.spotId)
    const { address, city, state, country, lat, lng, name, description, price } = req.body
    const { user } = req
    if (!spot) {
        res.status(404).json({
            message: "Spot couldn't be found",
        })
    }
    if (spot.ownerId !== user.id) {
        res.status(403).json({
            message: "Forbidden"
        })
    }

    spot.address = address
    spot.city = city
    spot.state = state
    spot.country = country
    spot.lat = lat
    spot.lng = lng
    spot.name = name
    spot.description = description
    spot.price = price


    await spot.save()
    res.status(200).json(spot)
})


//delete a spot

router.delete('/:spotId', requireAuth, async (req, res) => {
    let spot = await Spot.findByPk(req.params.spotId)
    let { user } = req
    if (!spot) {
        res.status(404).json({
            message: "Spot could not be found."
        })
    }
    if (spot.ownerId !== user.id) {
        res.status(403).json({
            message: "Forbidden"
        })
    } else {
        await spot.destroy()
        res.status(200).json({
            message: "Successfully deleted"
        })
    }
})


//Get all reviews by a Spot's id

router.get('/:spotId/reviews', async (req, res) => {
    let spot = await Spot.findByPk(req.params.spotId)

    if (!spot) {
        res.status(404).json({ message: "Spot couldn't be found" })
    }

    const reviews = await Review.findAll({
        where: { spotId: spot.id },
        include: [{
            model: User, attributes: ['id', 'firstName', 'lastName']
        }, {
            model: ReviewImage,
            attributes: ['id', 'url']
        }]
    })
    res.status(200).json({ Reviews: reviews })
})



// create a review for a spot based on spotId

router.post('/:spotId/reviews', requireAuth, async (req, res) => {
    let spot = await Spot.findByPk(req.params.spotId)

    if (!spot) {
        res.status(404).json({ message: "Spot couldn't be found" })
    }

    const { spotId, review, stars } = req.body
    const { user } = req

    const reviews = await Review.findAll({
        where: { userId: user.id }
    })

    let currRev = false
    reviews.forEach(review => {
        let revJ = review.toJSON()
        if (revJ.spotId == spot.id) {
            currRev = true
        }
    })

    let errors = []
    if (!review) errors.push("Review text is required")
    if (!stars) errors.push("Stars must be an integer from 1 to 5")
    if (errors.length) {
        res.status(400).json({ message: "Validation error", errors })
        return
    }

    if (currRev) {
        res.status(500).json({ message: "User already has a review for this spot" })
    } else {
        const newRev = await spot.createReview({
            userId: user.id,
            spotId, review, stars
        })
        res.status(201).json(newRev)
    }

})

// get all current bookings by spotId
router.get('/:spotId/bookings', requireAuth, async (req, res) => {
    let spot = await Spot.findByPk(req.params.spotId)
    const { user } = req

    if (!spot) {
        res.status(404).json({ message: "Spot couldn't be found" })
    }

    if (spot.ownerId === user.id) {
        const allBookings = await Booking.findAll({
            where: { spotId: spot.id },
            include: { model: User, attributes: ['id', 'firstName', 'lastName'] }
        })
        res.status(200).json({ Bookings: allBookings })
    }
    if (spot.ownerId !== user.id) {
        const allBookings = await Booking.findAll({
            where: { spotId: spot.id },
            attributes: ['spotId', 'startDate', 'endDate']
        })
        res.status(200).json({ Bookings: allBookings })
    }
})

// Create a booking based on a spotId
router.post('/:spotId/bookings', requireAuth, async (req, res) => {
    const { user } = req;
    const userId = user.id;

    const spot = await Spot.findByPk(req.params.spotId);
    const body = req.body;

    if (!spot) {
        return res.status(404).json({ message: "Spot couldn't be found" });
    }

    if (spot.ownerId === user.id) {
        return res.status(403).json({ message: "You cannot make a booking for a spot you own" });
    }

    const bookings = await Booking.findAll({
        where: {
            spotId: spot.id
        }
    });

    const newStart = new Date(body.startDate);
    const newEnd = new Date(body.endDate);

    for (const currBooking of bookings) {
        const currStartDate = new Date(currBooking.startDate);
        const currEndDate = new Date(currBooking.endDate);

        if (newStart.getTime() === currStartDate.getTime() && newEnd.getTime() === currEndDate.getTime()) {
            return res.status(403).json({
                message: "Sorry, this spot is already booked for the specified dates",
                errors: {
                    startDate: "Start date conflicts with an existing booking",
                    endDate: "End date conflicts with an existing booking"
                }
            });
        }

        if (newStart.getTime() === currStartDate.getTime()) {
            return res.status(403).json({
                message: "Sorry, this spot is already booked for the specified dates",
                errors: {
                    startDate: "Start date on an existing start date"
                }
            });
        }

        if (newStart.getTime() === currEndDate.getTime()) {
            return res.status(403).json({
                message: "Sorry, this spot is already booked for the specified dates",
                errors: {
                    startDate: "Start date on an existing end date"
                }
            });
        }

        if (newEnd.getTime() === currStartDate.getTime()) {
            return res.status(403).json({
                message: "Sorry, this spot is already booked for the specified dates",
                errors: {
                    endDate: "End date on an existing start date"
                }
            });
        }

        if (newEnd.getTime() === currEndDate.getTime()) {
            return res.status(403).json({
                message: "Sorry, this spot is already booked for the specified dates",
                errors: {
                    endDate: "End date on an existing end date"
                }
            });
        }

        if (newStart > currStartDate && newEnd < currEndDate) {
            return res.status(403).json({
                message: "Sorry, this spot is already booked for the specified dates",
                errors: {
                    startDate: "Start date conflicts with an existing booking",
                    endDate: "End date conflicts with an existing booking"
                }
            });
        }

        if (newStart >= currStartDate && newStart < currEndDate) {
            return res.status(403).json({
                message: "Sorry, this spot is already booked for the specified dates",
                errors: {
                    startDate: "Start date during an existing booking"
                }
            });
        }

        if (newEnd > currStartDate && newEnd <= currEndDate) {
            return res.status(403).json({
                message: "Sorry, this spot is already booked for the specified dates",
                errors: {
                    endDate: "End date during an existing booking"
                }
            });
        }

        if (newStart <= currStartDate && newEnd >= currEndDate) {
            return res.status(403).json({
                message: "Sorry, this spot is already booked for the specified dates",
                errors: {
                    startDate: "Start date conflicts with an existing booking",
                    endDate: "End date conflicts with an existing booking"
                }
            });
        }
    }

    if (newStart.getTime() === newEnd.getTime()) {
        return res.status(400).json({
            message: "Bad Request",
            errors: {
                startDate: "Start and end date are the same",
                endDate: "Start and end date are the same"
            }
        });
    }

    if (newEnd.getTime() < newStart.getTime()) {
        return res.status(400).json({
            message: "Bad Request",
            errors: {
                endDate: "End date cannot be before start date"
            }
        });
    }

    body.userId = userId;
    body.spotId = spot.id;

    const newBooking = await Booking.create(body);
    res.json(newBooking);
});
module.exports = router
