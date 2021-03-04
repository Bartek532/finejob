import { Request } from "express";
import Joi from "joi";

export const validateLogin = (data: Request) => {
  const schema = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(8).required(),
  });

  return schema.validate(data);
};

export const validateRegister = (data: Request) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(8).required(),
    company: Joi.string().min(3).required(),
  });

  return schema.validate(data);
};

export const validateChangeUserInfo = (data: Request) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().min(6).required().email(),
    oldPassword: Joi.string().min(8).required(),
    newPassword: Joi.string().min(8).required(),
    company: Joi.string().min(3).required(),
  });

  return schema.validate(data);
};

export const validateOffer = (data: Request) => {
  const schema = Joi.object({
    title: Joi.string().required().min(6),
    location: Joi.string().required().min(3),
    salary: Joi.string().required().min(3),
    type: Joi.string().required().min(4),
    description: Joi.string().required().min(10),
    how_to_apply: Joi.string().required().min(6),
    company_url: Joi.string().optional().allow(""),
  });

  return schema.validate(data);
};
