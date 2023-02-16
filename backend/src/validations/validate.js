import Joi from "joi";

const createValidation = (req, res, next) => {
  const noteValidation = Joi.object({
    title: Joi.string().required(),
    description: Joi.string(),
  });
  const validation = noteValidation.validate(req.body);
  if (validation.error) {
    return res.status(400).json({
      message: `There was an error: ${validation.error.details[0].message}`,
      error: true,
    });
  }
  return next();
};

const editValidation = (req, res, next) => {
  const editNote = Joi.object({
    title: Joi.string().required(),
    description: Joi.string(),
    archived: Joi.number().integer(),
  });
  const validation = editNote.validate(req.body);
  if (validation.error) {
    return res.status(406).json({
      message: `There was an error: ${validation.error.details[0].message}`,
      data: undefined,
      error: true,
    });
  }
  return next();
};

export default {
  createValidation,
  editValidation,
};
