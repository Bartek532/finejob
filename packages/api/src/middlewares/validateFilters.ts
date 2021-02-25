import { Request, Response, NextFunction } from "express";

const availableFilters = ["full_time", "q", "location", "page"];

export const validateFilters = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  Object.keys(req.query).forEach(key => {
    if (!availableFilters.includes(key)) {
      return res.status(400).json({ message: "Invalid filters provided" });
    }
  });

  next();
};
