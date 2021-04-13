import Photos from "@/models/photos.model";
import { Request, Response } from "express";
import { parseISO, differenceInMonths, differenceInDays } from "date-fns";

export default {
  async getByPeriod(req: Request, res: Response) {
    let { minDate, maxDate, cameras } = req.body;

    if (!minDate || !maxDate) {
      return res.status(400).json({ message: "Invalid period." });
    }

    minDate = parseISO(String(minDate));
    maxDate = parseISO(String(maxDate));

    if (differenceInMonths(maxDate, minDate) > 2) {
      return res.status(401).json({
        message: "The maximum period is 2 months."
      });
    }

    if (differenceInDays(maxDate, minDate) < 1) {
      return res.status(401).json({
        message: "The minimum period is one day."
      });
    }

    const afterFirstDate = (date: Date): number =>
      differenceInDays(date, new Date(2012, 7, 6));

    if (afterFirstDate(minDate) < 0 || afterFirstDate(maxDate) < 0) {
      return res.status(401).json({
        message: "The start date is 2020-08-06."
      });
    }

    const query: {
      camera?: object;
      earth_date: object;
    } = {
      earth_date: {
        $gte: minDate,
        $lte: maxDate
      }
    };

    if (cameras && cameras.length > 0) {
      query["camera"] = {
        $in: cameras
      };
    }

    return await Photos.find(query)
      .then(resPhotos => {
        if (!resPhotos || resPhotos.length < 1) {
          return res.status(404).json({
            message: "No photos in this period."
          });
        }

        const dataPrepare = resPhotos.map(photo => {
          photo.src = "https://mars.nasa.gov/msl-raw-images/" + photo.src;

          return photo;
        });
        return res.status(200).json(dataPrepare);
      })
      .catch(errorPhotos => res.status(500).json(errorPhotos));
  }
};
