import { celebrate, Joi, Segments } from "celebrate";

export default {
  getByPeriod: celebrate({
    [Segments.BODY]: Joi.object().keys({
      minDate: Joi.string().min(10).max(20).required(),
      maxDate: Joi.string().min(10).max(20).required(),
      cameras: Joi.array().min(1).max(10).optional()
    })
  }),
  photosSync: celebrate({
    [Segments.BODY]: Joi.object().keys({
      minDate: Joi.string().min(10).max(20).required(),
      maxDate: Joi.string().min(10).max(20).required(),
    })
  })
};
