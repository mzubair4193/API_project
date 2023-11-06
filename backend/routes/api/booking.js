const express = require('express')
const { Spot, Review, User, SpotImage, Booking, ReviewImage } = require('../../db/models');
const { requireAuth } = require('../../utils/auth')
const router = express.Router()
const { Op, Sequelize } = require("sequelize")
//get all CU bookings
router.get('/current', requireAuth, async (req, res) => {
    const { user } = req
    const timeZone = 'America/New_York'
    const currUserBookings = await Booking.findAll({
        where: { userId: user.id },
        include: {
            model: Spot, attributes: [
                'id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'price', 'previewImage'
            ]
        }
    })
    // Convert lat, lng, and price to numbers in each Spot
    currUserBookings.forEach((booking) => {
        // booking.startDate = booking.startDate.toLocaleDateString('en-US', { timeZone })
        // booking.endDate = booking.endDate.toLocaleDateString('en-US', { timeZone })
        // booking.createdAt = booking.createdAt.toLocaleDateString('en-US', { timeZone })
        // booking.updatedAt = booking.updatedAt.toLocaleDateString('en-US', { timeZone })

        const spot = booking.Spot;
        spot.lat = parseFloat(spot.lat);
        spot.lng = parseFloat(spot.lng);
        spot.price = parseFloat(spot.price);
        // spot.createdAt = spot.createdAt.toLocaleDateString('en-US', { timeZone });
        // spot.updatedAt = spot.updatedAt.toLocaleDateString('en-US', { timeZone });
    });
    const options = { timeZone: 'GMT', year: 'numeric', month: '2-digit', day: '2-digit' }

    const formatCurrBookings = currUserBookings.map((booking) => ({
        ...booking.toJSON(),
        startDate: booking.startDate.toLocaleDateString('en-US', options),
        endDate: booking.endDate.toLocaleDateString('en-US', options),
        updatedAt: booking.updatedAt.toLocaleString('en-US', { timeZone }),
        createdAt: booking.createdAt.toLocaleString('en-US', { timeZone })
    }))
    res.status(200).json({ Bookings: formatCurrBookings })
})

// Edit a booking
router.put("/:bookingId", requireAuth, async (req, res) => {
    const { startDate, endDate } = req.body;
    const { bookingId } = req.params;
    const { user } = req;
    const timeZone = 'EST';

    // Setup for date comparison
    const newStartDate = new Date(startDate).getTime();
    const newEndDate = new Date(endDate).getTime();

    // Body validations
    const errorObj = {};

    if (!startDate) {
        errorObj.startDate = "Please provide a valid Start Date";
    }

    if (!endDate) {
        errorObj.endDate = "Please provide a valid End Date";
    }

    if (newEndDate <= newStartDate) {
        errorObj.endDate = "End date must come after the start date";
    }

    if (Object.keys(errorObj).length > 0) {
        return res.status(400).json({
            message: "Bad Request",
            errors: errorObj
        });
    }

    // Past date check
    const currentDate = new Date().getTime();
    const testEndDate = new Date(endDate).getTime();
    if (currentDate >= testEndDate) {
        return res.status(403).json({
            message: "Past bookings can't be modified"
        });
    }

    const booking = await Booking.findByPk(bookingId, {
        attributes: ["id", "spotId", "userId", "startDate", "endDate", "createdAt", "updatedAt"]
    });

    if (!booking) {
        return res.status(404).json({ message: "Booking not found" });
    }

    // Authorization check
    if (user.id !== booking.userId) {
        return res.status(403).json({
            message: "Forbidden"
        });
    }

    // Get other bookings for the same spot
    const currentBookings = await Booking.findAll({
        where: {
            spotId: booking.spotId,
            id: { [Op.not]: booking.id }
        }
    });

    // Check for date conflicts with other bookings
    for (const currentBooking of currentBookings) {
        // Setup for date comparisons
        const bookingStartDate = new Date(currentBooking.startDate).getTime();
        const bookingEndDate = new Date(currentBooking.endDate).getTime();

        if (newStartDate >= bookingStartDate && newStartDate <= bookingEndDate) {
            errorObj.startDate = "Start date conflicts with an existing booking";
            return res.status(403).json({
                message: "Sorry, this spot is already booked for the specified dates",
                errors: errorObj
            });
        }

        if (newEndDate >= bookingStartDate && newEndDate <= bookingEndDate) {
            errorObj.endDate = "End date conflicts with an existing booking";
            return res.status(403).json({
                message: "Sorry, this spot is already booked for the specified dates",
                errors: errorObj
            });
        }

        if (newStartDate < bookingStartDate && newEndDate > bookingEndDate) {
            errorObj.startDate = "Start date conflicts with an existing booking";
            errorObj.endDate = "End date conflicts with an existing booking";
            return res.status(403).json({
                message: "Sorry, this spot is already booked for the specified dates",
                errors: errorObj
            });
        }

        if (newStartDate === bookingStartDate) {
            errorObj.startDate = "Start date conflicts with an existing booking";
            return res.status(403).json({
                message: "Sorry, this spot is already booked for the specified dates",
                errors: errorObj
            });
        }

        if (newEndDate === bookingEndDate) {
            errorObj.endDate = "End date conflicts with an existing booking";
            return res.status(403).json({
                message: "Sorry, this spot is already booked for the specified dates",
                errors: errorObj
            });
        }
    }

    // Update the booking in the database
    booking.startDate = newStartDate;
    booking.endDate = newEndDate;
    await booking.save();

    const options = { timeZone: 'GMT', year: 'numeric', month: '2-digit', day: '2-digit' };
    const formatBooking = {
        ...booking.toJSON(),
        startDate: new Date(booking.startDate).toLocaleString('en-US', options),
        endDate: new Date(booking.endDate).toLocaleString('en-US', options),
        updatedAt: booking.updatedAt.toLocaleString('en-US', { timeZone }),
        createdAt: booking.createdAt.toLocaleString('en-US', { timeZone })
    };

    return res.status(200).json(formatBooking);
});
//delete a booking
router.delete("/:bookingId", requireAuth, async (req, res) => {
    const booking = await Booking.findByPk(req.params.bookingId)
    const { user } = req

    if (!booking) return res.status(404).json({ message: "Booking couldn't be found" })

    if (booking.userId !== user.id) return res.status(403).json({ message: "Forbidden" })

    const startDate = booking.startDate
    const currDate = new Date()
    console.log(startDate, currDate)
    if (startDate <= currDate) return res.status(403).json({ message: "Bookings that have already started can't be deleted" })

    await booking.destroy()
    res.status(200).json({ message: "Successfully deleted" })
})
module.exports = router
