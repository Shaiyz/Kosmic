const router = require("express").Router();
const { Video } = require("../models");

/**
 * @route		POST /video
 ** @desc		Insert video records
 * @body		{ title ,thumbnail, createdBy }
 */

router.post("/", (req, res, next) => {
   Video.create(req.body)
    .then((doc) => {
      res.status(200).json({ data: doc, message: "Video  Saved" });
    })
    .catch((error) => {
      res.status(500).json({ message: error.message });
    });
});

/**
 * @route		GET /video
 * @desc		Fetch video records
 */

router.get("/", (req, res, next) => {
  let query = {};
  if ("_id" in req.query) query._id = req.query._id;
  if ("title" in req.query) query.title = req.query.title;
  if ("createdBy" in req.query) query.createdBy = req.query.createdBy;

  Video.find(query)
    .exec()
    .then((doc) => {
      res.status(200).json({ data: doc });
    })
    .catch((error) => {
      res.status(500).json({ message: error.message });
    });
});

/**
 * @route		PUT /video/:video_id
 * @desc		Edit video records
 */

router.put("/:video_id", (req, res, next) => {
  Video.findByIdAndUpdate(req.params.video_id, req.body, { new: true })
    .then((doc) => {
      res.status(200).json({ data: doc, message: "Video Updated" });
    })
    .catch((error) => {
      res.status(500).json({ message: error.message });
    });
});

/**
 * @route		delete /video/:video_id
 * @desc		Del video record
 */

router.delete("/:video_id", (req, res, next) => {
  Video.findByIdAndDelete(req.params.video_id)
    .then((doc) => {
      res.status(200).json({ data: doc, message: "Video Deleted" });
    })
    .catch((error) => {
      res.status(500).json({ message: error.message });
    });
});

module.exports = router;
