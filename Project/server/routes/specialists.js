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

router.route("/all-details").get(async (req, res) => {
  const staff = await Specialist.find({});

  if (staff) {
    res.json(staff);
  } else {
    res.send("No data found");
  }
});

router.route("/delete/:id").delete(async (req, res) => {
  const id = req.params.id;

  await Specialist.findByIdAndRemove(id)
    .then(() => {
      res.status(200).send({ status: "User deleted" });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .send({ status: "Error with delete user", error: err.message });
    });
});

router.route("/update/:id").put(async (req, res) => {
  const id = req.body.id;
  const name = req.body.name;
  const specialization = req.body.specialization;
  const experience = req.body.experience;

  const updateStaff = {
    name,
    specialization,
    experience,
  };

  await Specialist.findByIdAndUpdate(id, updateStaff)
    .then(() => {
      res.json({ status: "User updated" });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .send({ status: "error with updating data", error: err.message });
    });
});

router.route("/get/:id").get(async (req, res) => {
  let id = req.params.id;

  const specialist = await Specialist.findOne({
    name: id,
  });

  if (specialist) {
    return res.json({ status: "Found User", specialist: specialist });
  } else {
    return res.json({ status: "NotFound User" });
  }
});

module.exports = router;
