const router = require("express").Router();
const { Collaborator } = require("../models");

/**
 * @route		POST /collaborator 
 ** @desc		Insert collaborator records
 * @body		{ title ,thumbnail }
 */

router.post("/", (req, res, next) => {
   Collaborator.create(req.body)
    .then((doc) => {
      res.status(200).json({ data: doc, message: "Collaborator  Saved" });
    })
    .catch((error) => {
      console.log(error.message)
      res.status(500).json({ message: error.message });
    });
});

/**
 * @route		GET /collaborator
 * @desc		Fetch collaborator records
 */

router.get("/", (req, res, next) => {
  let query = {};
  if ("_id" in req.query) query._id = req.query._id;
  if ("role" in req.query) query.role = req.query.role;
  if ("createdBy" in req.query) query.createdBy = req.query.createdBy;

  Collaborator.find(query)
    .exec()
    .then((doc) => {
      res.status(200).json({ data: doc });
    })
    .catch((error) => {
      res.status(500).json({ message: error.message });
    });
});

/**
 * @route		PUT /collaborator/:collaborator_id
 * @desc		Edit collaborator records
 */

router.put("/:collaborator_id", (req, res, next) => {
  Collaborator.findByIdAndUpdate(req.params.collaborator_id, req.body, { new: true })
    .then((doc) => {
      res.status(200).json({ data: doc, message: "Collaborator Updated" });
    })
    .catch((error) => {
      res.status(500).json({ message: error.message });
    });
});

/**
 * @route		delete /collaborator/:collaborator_id
 * @desc		Del collaborator record
 */

router.delete("/:collaborator_id", (req, res, next) => {
  Collaborator.findByIdAndDelete(req.params.collaborator_id)
    .then((doc) => {
      res.status(200).json({ data: doc, message: "Collaborator Deleted" });
    })
    .catch((error) => {
      res.status(500).json({ message: error.message });
    });
});

module.exports = router;
