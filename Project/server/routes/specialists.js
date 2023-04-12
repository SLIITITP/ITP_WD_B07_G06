const router = require("express").Router();

let Specialist = require("../models/Specialist");

router.route("/add").post((req, res) => {
  const name = req.body.name;
  const specialization = req.body.specialization;
  const experience = Number(req.body.experience);

  const newSpecialist = new Specialist({
    name,
    specialization,
    experience,
  });

  newSpecialist
    .save()
    .then(() => {
      res.json("Student Added");
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
