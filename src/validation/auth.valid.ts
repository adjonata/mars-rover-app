import { celebrate, Joi, Segments } from "celebrate";

export default {
  login: celebrate({
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().min(6).max(35).required(),
      password: Joi.string().min(3).max(25).required()
    })
  }),
  register: celebrate({
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().min(6).max(35).required(),
      password: Joi.string().min(3).max(25).required(),
      username: Joi.string().min(4).max(25).required()
    })
  })
};
