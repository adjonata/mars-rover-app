import Photos from "../models/photos.model";
import { IPhotosQuery } from "../fixtures/photos.integration";
import { Request, Response } from "express";
import { parseISO, differenceInMonths } from "date-fns";

export default {
  async getByPeriod(req: Request, res: Response) {
    let { minDate, maxDate }: IPhotosQuery = req.body;

    if (!minDate || !maxDate) {
      return res.status(400).json({ message: "Invalid period." });
    }

    minDate = parseISO(String(minDate));
    maxDate = parseISO(String(maxDate));

    if (differenceInMonths(maxDate, minDate) > 6) {
      return res.status(400).json({
        message: "The maximum period is 6 months.",
      });
    }

    return await Photos.find()
      .where("earth_date")
      .gt(minDate)
      .lt(maxDate)
      .then((resPhotos) => {
        if (!resPhotos || resPhotos.length < 1) {
          return res.status(400).json({
            message: "No photos in this period.",
          });
        }

        const dataPrepare = resPhotos.map((photo) => {
          photo.src = "https://mars.nasa.gov/msl-raw-images/" + photo.src;

          return photo;
        });
        return res.status(200).json(dataPrepare);
      })
      .catch((errorPhotos) => res.status(500).json(errorPhotos));
  },
};
