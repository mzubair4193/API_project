const express = require('express')
const { Spot, Review, User, SpotImage, Booking, ReviewImage } = require('../../db/models');
const { requireAuth } = require('../../utils/auth')
const router = express.Router()

router.delete("/:imageId", requireAuth, async (req, res) => {
    const { user } = req
    const image = await ReviewImage.findByPk(req.params.imageId, {
        include: { model: Review, attributes: ['userId'] }
    })
    if (!image || !image.Review) {
        res.status(404).json({ message: "Review Image couldn't be found" })
        return
    }

    if (image.Review.userId !== user.id) {
        res.status(403).json({ message: "Forbidden" })
        return
    }

    await image.destroy()
    res.status(200).json({ message: "Successfully deleted" })
})


module.exports = router
