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
    name: Joi.string().min(3).required().max(35),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(8).required(),
    company: Joi.string().min(3).max(30).required(),
  });

  return schema.validate(data);
};

export const validateChangeUserInfo = (data: Request) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required().max(35),
    email: Joi.string().min(6).required().email(),
    oldPassword: Joi.string().min(8).required(),
    newPassword: Joi.string().min(8).required(),
    company: Joi.string().min(3).required().max(30),
  });

  return schema.validate(data);
};

export const validateOffer = (data: Request) => {
  const schema = Joi.object({
    title: Joi.string().required().min(6).max(150),
    city: Joi.string().required().min(3).max(35),
    salary: Joi.number().required().min(3).max(99999),
    experience_level: Joi.string().required().valid("junior", "mid", "senior"),
    body: Joi.string().required().min(10),
    skills: Joi.string().required().min(2),
    company_url: Joi.string().optional().allow(""),
  });

  return schema.validate(data);
};
