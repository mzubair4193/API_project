const express = require('express')
const { Spot, Review, User, SpotImage, Booking, ReviewImage } = require('../../db/models');
const { requireAuth } = require('../../utils/auth')
const router = express.Router()
const { Op } = require("sequelize")
//get all CU bookings
router.get('/current', requireAuth, async (req, res) => {
    const { user } = req
    const timeZone = 'EST'
    const currentUserBookings = await Booking.findAll({
        where: { userId: user.id },
        include: {
            model: Spot, attribute: [
                'id',
                'ownerId',
                'address',
                'city',
                'state',
                'country',
                'lat',
                'lng',
                'name',
                'price',
                'previewImage'
            ]
        }
    })
    // Convert lat, lng, and price to numbers in each Spot
    currentUserBookings.forEach((booking) => {

        const spot = booking.Spot;
        spot.lat = parseFloat(spot.lat);
        spot.lng = parseFloat(spot.lng);
        spot.price = parseFloat(spot.price);

    });
    const options = { timeZone: 'CET', year: 'numeric', month: '2-digit', day: '2-digit' }

    const formatCurrBookings = currentUserBookings.map((booking) => ({
        ...booking.toJSON(),
        startDate: booking.startDate.toLocaleDateString('en-US', options),
        endDate: booking.endDate.toLocaleDateString('en-US', options),
        updatedAt: booking.updatedAt.toLocaleString('en-US', { timeZone }),
        createdAt: booking.createdAt.toLocaleString('en-US', { timeZone })
    }))
    res.status(200).json({ Bookings: formatCurrBookings })
})

//edit a booking
router.put("/:bookingId", requireAuth, async (req, res) => {
    const { startDate, endDate } = req.body;
    const { bookingId } = req.params;
    const { user } = req;
    const timeZone = 'EST'

    //setup for date comparison
    const newStartDate = new Date(startDate).getTime();
    const newEndDate = new Date(endDate).getTime();

    //body validations
    const errorObject = {};

    if (!startDate) {
        errorObject.startDate = "Please provide a valid Start Date";
    }
    if (!endDate) {
        errorObject.endDate = "Please provide a valid End Date";
    }

    if (errorObject.startDate || errorObject.endDate) {
        return res.status(400).json({ message: "Bad Request", errors: errorObject });
    }

    //end must come after start
    if (newEndDate <= newStartDate) {
        return res.status(400).json({
            message: "Bad Request",
            errors: {
                endDate: "endDate cannot come before startDate"
            }
        });
    }

    //past date check
    const currentDate = new Date().getTime();
    const testEndDate = new Date(endDate).getTime();
    if (currentDate >= testEndDate) {
        res.status(403);
        return res.send({
            "message": "Past bookings can't be modified"
        });
    }

    try {
        const booking = await Booking.findByPk(bookingId, {
            attributes: ["id",
                         "spotId",
                         "userId",
                         "startDate",
                         "endDate",
                         "createdAt",
                         "updatedAt"]
        });

        const bookingUserId = booking.dataValues.userId;

        if (booking.dataValues.id === bookingId && user.id === bookingUserId) {
            booking.update({
                startDate,
                endDate
            });
            res.status(200).json(booking);
        } else {
            //get info for current bookings
            const currentBookings = await Booking.findAll({
                where: {
                    spotId: booking.spotId,
                    id: { [Op.not]: booking.id }
                }
            });

            currentBookings.forEach((booking) => {
                //setup for date comparisons
                const bookingStartDate = new Date(booking.dataValues.startDate).getTime();
                const bookingEndDate = new Date(booking.dataValues.endDate).getTime();

                //check if this spot has been booked for these dates
                const errorObject = {};
                // if (newStartDate === newEndDate) {
                //     return res.status(403).json({ message: "Bad Request", errors: { endDate: "endDate cannot come before startDate" } })
                // }
                //start date is during a booking
                if (newStartDate >= bookingStartDate && newStartDate <= bookingEndDate) {
                    errorObject.startDate = "Start date conflicts with an existing booking";
                }
                //end date is during a booking
                if (newEndDate >= bookingStartDate && newEndDate <= bookingEndDate) {
                    errorObject.endDate = "End date conflicts with an existing booking";
                }

                if (newStartDate < bookingStartDate && newEndDate > bookingEndDate) {
                    errorObject.startDate = "Start date conflicts with an existing booking";
                    errorObject.endDate = "End date conflicts with an existing booking";
                }

                if (newStartDate === bookingStartDate) {
                    errorObject.startDate = "Start date conflicts with an existing booking";
                }

                if (newEndDate === bookingEndDate) {
                    errorObject.endDate = "End date conflicts with an existing booking";
                }

                if (errorObject.startDate || errorObject.endDate) {
                    return res.status(403).json({
                        message: "Sorry, this spot is already booked for the specified dates",
                        errors: errorObject
                    });
                }
            });

            //authorization check
            if (user.id === bookingUserId) {
                booking.update({
                    // startDate: startDate.toLocaleDateString('en-US', { timeZone }),
                    // endDate: endDate.toLocaleDateString('en-US', { timeZone })
                    startDate,
                    endDate
                });
            } else {
                return res.status(403).json({
                    message: "Forbidden"
                });
            }

            res.json(booking);
        }
    } catch (error) {
        res.status(404).json({
            "message": "Booking couldn't be found"
        });
    }
});
//delete a booking
router.delete("/:bookingId", requireAuth, async (req, res) => {
    const booking = await Booking.findByPk(req.params.bookingId)
    const { user } = req

    if (!booking) res.status(404).json({ message: "Booking couldn't be found" })

    if (booking.userId !== user.id) return res.status(403).json({ message: "Forbidden" })

    const startDate = booking.startDate
    const currDate = new Date()
    console.log(startDate, currDate)
    if (startDate <= currDate) return res.status(403).json({ message: "Bookings that have already started can't be deleted" })

    await booking.destroy()
    res.status(200).json({ message: "Successfully deleted" })
})
module.exports = router
