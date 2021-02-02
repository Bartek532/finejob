import { Request } from "express";
import Joi from "joi";

export const validateLogin = (data: Request) => {
  const schema = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(8).required()
  });

  return schema.validate(data);
};

export const validateRegister = (data: Request) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(8).required()
  });

  return schema.validate(data);
};
