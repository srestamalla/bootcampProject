const Bootcamp = require("../models/Bootcamp");

// @desc        Get all bootcamps
// @route       GET   /api/v1/bootcamps
// @access      Pulblic
exports.getBootcamps = async (req, res, next) => {
  try {
    const bootcamps = await Bootcamp.find();
    res
      .status(200)
      .json({
        success: true,
        msg: `Show all bootcamps`,
        count: bootcamps.length,
        data: bootcamps,
      });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};

// @desc        Get single bootcamp
// @route       GET   /api/v1/bootcamps/:id
// @access      Pulblic
exports.getBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findById(req.params.id);

    if (!bootcamp) {
      console.log("I'm here");
      res.status(400).json({
        success: false,
        msg: `Could not find the bootcamp with id ${res.params.id} `,
      });
      return;
    }

    res.status(200).json({
      success: true,
      msg: `Get bootcamp ${req.params.id}`,
      data: bootcamp,
    });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};

// @desc        Create new bootcamp
// @route       POST   /api/v1/bootcamps
// @access      Private
exports.createBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.create(req.body);
    res
      .status(201)
      .json({ success: true, msg: `Create a bootcamp`, data: bootcamp });
  } catch (err) {
    res.status(400).json({ success: false, message: "Bad Request" });
  }
};

// @desc        Update bootcamp
// @route       PUT   /api/v1/bootcamps/:id
// @access      Private
exports.updateBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!bootcamp) {
      res.status(400).json({ success: false });
      return;
    }
    res.status(201).json({
      success: true,
      msg: `Updated a bootcamp ${req.params.id}`,
      data: bootcamp,
    });
  } catch (err) {
    res.send(400).json({ success: false });
  }
};

// @desc        Delete bootcamp
// @route       DELETE   /api/v1/bootcamps/:id
// @access      Private
exports.deleteBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);
    if (!bootcamp) {
      res.status(400).json({ success: false });
      return;
    }
    res.status(200).json({
      success: "true",
      msg: `Deleted bootcamp ${req.params.id}`,
      data: {},
    });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};
