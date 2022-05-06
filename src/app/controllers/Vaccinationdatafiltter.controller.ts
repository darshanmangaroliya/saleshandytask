import { NextFunction, Request, Response } from "express";
import { CustomError } from "../../utils/customError";
import {
  getConnection,
} from "typeorm";

export const filltervaccinationdata = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    day,
    month,
    year,
    daily,
    monthly,
    yearly,
    state,
    startDate,
    endDate,
  } = req.query;
  console.log(state);
  try {
    if (daily) {
      const data = await getConnection()
        .query(`select count(*) as result from saleshandy.vaccinations
      where MONTH(vaccinatedAt)=MONTH(${month})
      and YEAR(vaccinatedAt)=YEAR(${year})group by(${day});`);

      res.send({ data });
    }

    if (monthly) {
      const data = await getConnection()
        .query(`select count(*) as result from saleshandy.vaccinations
      where YEAR(vaccinatedAt)=YEAR(${year})group by(${month});`);

      res.send({ data });
    }

    if (yearly) {
      const data = await getConnection().query(
        `select count(*) as result from saleshandy.vaccinations group by(${year});`
      );

      res.send({ data });
    }
    if (state) {
      const data = await getConnection().query(
        `select * from saleshandy.vaccinations inner join user on vaccinations.userId = user.id where State = "${state}"`
      );

      res.send({ data });
    }

    if (startDate && endDate) {
      const data = await getConnection().query(
        `select * from  saleshandy.vaccinations  where date( vaccinatedAt) between "${startDate}" and "${endDate}";`
      );

      res.send({ data });
    }
  } catch (err) {
    const customError = new CustomError(400, "Raw", "Error", null, err);
    return next(customError);  }
};
