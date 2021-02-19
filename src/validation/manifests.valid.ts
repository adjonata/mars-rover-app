import { celebrate, Joi, Segments } from "celebrate";

export default {
  findByCams: celebrate({
    [Segments.BODY]: Joi.object().keys({
      cameras: Joi.array().min(1).max(10).required()
    })
  }),
  findOneManifest: celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      date: Joi.string().min(10).max(20).optional(),
      sol: Joi.number().min(0).max(200000).optional()
    })
  })
};
