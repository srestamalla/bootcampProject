const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Bootcamp = require("../models/Bootcamp");
const geocoder = require("../utils/geocoder");

// @desc        Get all bootcamps
// @route       GET   /api/v1/bootcamps
// @access      Pulblic
exports.getBootcamps = asyncHandler(async (req, res, next) => {
  let query;
  let queryStr = JSON.stringify(req.query);
  queryStr = queryStr.replace(
    /\b(gt|gte|lt|lte|in)\b/g,
    (match) => `$${match}`
  );
  query = Bootcamp.find(JSON.parse(queryStr));
  console.log(queryStr);
  const bootcamps = await query;
  res.status(200).json({
    success: true,
    msg: `Show all bootcamps`,
    count: bootcamps.length,
    data: bootcamps,
  });
});

// @desc        Get single bootcamp
// @route       GET   /api/v1/bootcamps/:id
// @access      Pulblic
exports.getBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findById(req.params.id);

  if (!bootcamp) {
    next(new ErrorResponse(`Bootcamp not found with id ${req.params.id}`, 404));
    return;
  }

  res.status(200).json({
    success: true,
    msg: `Get bootcamp ${req.params.id}`,
    data: bootcamp,
  });
});

// @desc        Create new bootcamp
// @route       POST   /api/v1/bootcamps
// @access      Private
exports.createBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.create(req.body);
  res
    .status(201)
    .json({ success: true, msg: `Create a bootcamp`, data: bootcamp });
});

// @desc        Update bootcamp
// @route       PUT   /api/v1/bootcamps/:id
// @access      Private
exports.updateBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!bootcamp) {
    next(new ErrorResponse(`Bootcamp not found with id ${req.params.id}`, 404));
    return;
  }
  res.status(201).json({
    success: true,
    msg: `Updated a bootcamp ${req.params.id}`,
    data: bootcamp,
  });
});

// @desc        Delete bootcamp
// @route       DELETE   /api/v1/bootcamps/:id
// @access      Private
exports.deleteBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);
  if (!bootcamp) {
    next(new ErrorResponse(`Bootcamp not found with id ${req.params.id}`, 404));
    return;
  }
  res.status(200).json({
    success: "true",
    msg: `Deleted bootcamp ${req.params.id}`,
    data: {},
  });
});

// @desc        Get bootcamps within a radius
// @route       GET   /api/v1/bootcamps/radius/:zipcode/:distance
// @access      Private
exports.getBootcampsInRadius = asyncHandler(async (req, res, next) => {
  const { zipcode, distance } = req.params;

  // Get lattitude/longitude from geocoder
  const loc = await geocoder.geocode(zipcode);
  const lat = loc[0].latitude;
  const lng = loc[0].longitude;

  // Calcutale radius using radians
  // Divide distance by radius  of Earth
  // Radius of earth = 3,963 miles 6,378 km
  const radius = distance / 3963;
  const bootcamps = await Bootcamp.find({
    location: { $geoWithin: { $centerSphere: [[lng, lat], radius] } },
  });
  res.status(200).json({
    success: true,
    count: bootcamps.length,
    data: bootcamps,
  });
  //Come back to this cause it's not finding any bootcamps with this logic
});
