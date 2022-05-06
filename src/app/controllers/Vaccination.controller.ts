import { NextFunction, Request, Response } from "express";
import { CustomError } from "../../utils/customError";
import { getRepository } from "typeorm";
import { User } from "../models/User";
import { Vaccinations } from "../models/Vaccination ";

export const addUservaccinationEntry = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { AdharCardNumber } = req.body;
  const userRepository = getRepository(User);

  try {
    const user = await userRepository.findOne({ where: { AdharCardNumber } });
    if (!user) {
      const customError = new CustomError(
        404,
        "General",
        `User with adharcardnumber:${AdharCardNumber} not found.`,
        ["User not found."]
      );
      return next(customError);
    }
  
    try {
      let newEntry = new Vaccinations()
      newEntry.user = user
      console.log(newEntry)
      const Result = await getRepository(Vaccinations).save(newEntry);

       return res.send(Result);
    } catch (err) {
      const customError = new CustomError(400, 'Raw', `User  can't added`, null, err);
      return next(customError);
    }

  } catch (err) {
    const customError = new CustomError(400, "Raw", "Error", null, err);
    return next(customError);
  }
 
};
