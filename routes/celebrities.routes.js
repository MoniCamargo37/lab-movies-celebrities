const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");

//All Routes here

// GET- create celebrity page
router.get("/celebrities/create", (req, res, next) =>
  res.render("celebrities/new-celebrity")
);

// POST- create celebrity page
router.post("/celebrities/create", async function (req, res) {
  const { name, occupation, catchPhrase, image } = req.body;
  try {
    await Celebrity.create({ name, image, occupation, catchPhrase });
    // redirect to the list of celebrities
    res.redirect("/celebrities");
  } catch (err) {
    // if there is an error, render the new-celebrity view and display the error message
    res.render("celebrities/new-celebrity", { error: err.message });
  }
});

// GET- Celebrities list
router.get("/celebrities", async (req, res, next) => {
  try {
    const celebrities = await Celebrity.find();
    res.render("celebrities/celebrities", { celebrities });
  } catch (err) {
    console.log(err);
  }
});

// GET - Show details of a specific celebrity
router.get("/celebrities/:id", async (req, res, next) => {
  try {
    const celebrity = await Celebrity.findById(req.params.id);
    res.render("celebrities/celebrity-details", { celebrity });
  } catch (err) {
    console.log(err);
    next(err);
  }
});

// GET - Show form to edit a celebrity
router.get("/celebrities/:id/edit", async (req, res, next) => {
  try {
    const celebrity = await Celebrity.findById(req.params.id);
    res.render("celebrities/edit-celebrity", { celebrity });
  } catch (err) {
    console.log(err);
    next(err);
  }
});

// POST - Send form data to update a celebrity
router.post("/celebrities/:id/edit", async (req, res, next) => {
  try {
    const { name, occupation, catchPhrase, image } = req.body;
    const { id } = req.params;
    const updatedCelebrity = await Celebrity.findByIdAndUpdate(
      id,
      { name, occupation, catchPhrase, image },
      { new: true }
    );
    res.redirect("/celebrities");
  } catch (err) {
    console.log(err);
    res.redirect("/celebrities");
  }
});

/* ROUTE /delete/:id */
router.get("/delete/:id", async function (req, res, next) {
  const { id } = req.params;
  try {
    await Celebrity.findByIdAndDelete(id);
    res.redirect("/celebrities");
  } catch (err) {
    next(err);
  }
});

module.exports = router;
