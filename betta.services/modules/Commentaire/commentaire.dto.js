const yup = require("yup");

// add article data transfer object
exports.addDto = async (req, res, next) => {
  try {
    console.log(req.body);
    const schema = yup.object().shape({
      commentaireText: yup.string().required(),
      isPrivate: yup.boolean(),
      isArchived: yup.boolean(),
      createdBy: yup.string().required().min(6),
    });
    await schema.validate(req.body);
    next();
  } catch (error) {
    res.json({ error: error.message });
  }
};
// update article data transfer object
exports.updateDto = async (req, res, next) => {
  try {
    const schema = yup.object().shape({
        commentaireText: yup.string().required(),
        isPrivate: yup.boolean(),
        isArchived: yup.boolean(),
        createdBy: yup.string().required().min(6),
    });
    await schema.validate(req.body);
    next();
  } catch (error) {
    res.json({ error: error.message });
  }
};

