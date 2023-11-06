const { Op } = require("sequelize");
const queryFilters = async (req, res, next) => {
    let { page, size, minLat, maxLat, minLng, maxLng, minPrice, maxPrice } =
        req.query;
    let where = {
        lat: {
            [Op.between]: [minLat || -180.1, maxLat || 180.1],
        },
        lng: {
            [Op.between]: [minLng || -180.1, maxLng || 180.1],
        },
        price: {
            [Op.between]: [minPrice || 0.01, maxPrice || 1000000.01],
        },
    };
    let tripped = false;
    const errorObject = {};
    errorObject.message = "Bad Request";
    errorObject.errorObjectors = {};
    //   function isNumber(value) {
    //     return typeof value === "number";
    //   }
    if (page && page < 1) {
        errorObject.errorObjectors.page = "Page must be greater than or equal to 1";
        tripped = true;
    }
    if (size && size < 1) {
        errorObject.errorObjectors.size = "Size must be greater than or equal to 1";
        tripped = true;
    }
    if (maxLat && maxLat > 90 || maxLat && maxLat < -90) {
        errorObject.errorObjectors.maxLat = "Maximum latitude is invalid";
        tripped = true;
    }
    if (minLat && minLat < -90 || minLat && minLat > 90) {
        errorObject.errorObjectors.minLat = "Minimum latitude is invalid";
        tripped = true;
    }
    if (maxLng && maxLng > 180 || maxLng && maxLng < -180) {
        errorObject.errorObjectors.maxLng = "Maximum longitude is invalid";
        tripped = true;
    }
    if (minLng && minLng < -180 || minLng && minLng > 180) {
        errorObject.errorObjectors.minLng = "Minimum longitude is invalid";
        tripped = true;
    }
    if (minPrice && minPrice < 0) {
        errorObject.errorObjectors.minPrice = "Minimum price must be greater than or equal to 0";
        tripped = true;
    }
    if (maxPrice && maxPrice < 0) {
        errorObject.errorObjectors.maxPrice = "Maximum price must be greater than or equal to 0";
        tripped = true;
    }
    if ((page && isNaN(page)) || (page && page > 10) || !page) page = 1;
    if ((size && isNaN(size)) || (size && size > 20) || !size) size = 20;
    page = parseInt(page);
    size = parseInt(size);
    let limit = size;
    let offset = size * (page - 1);

    req.pagination = {
        limit,
        offset,
        size,
        page,
        where,
    };
    if (tripped) {
        errorObject.status = 400;
        next(errorObject);
    }

    next();
};
module.exports = queryFilters;
