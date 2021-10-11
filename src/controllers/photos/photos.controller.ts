import Photos from "@/models/photos.model";
import { Request, Response } from "express";
import { parseISO, differenceInMonths, differenceInDays } from "date-fns";

interface IGetByPeriodRequest extends Request {
  body: {
    minDate?: string;
    maxDate?: string;
    cameras?: string[];
  };
}

interface IGetBySolRequest extends Request {
  params: {
    sol: string;
  };
}

export default {
  async getByPeriod(req: IGetByPeriodRequest, res: Response) {
    let { minDate, maxDate, cameras } = req.body;

    if (!minDate || !maxDate) {
      return res.status(400).json({ message: "Invalid period." });
    }

    const [minDateISO, maxDateISO] = [parseISO(minDate), parseISO(maxDate)];

    if (differenceInMonths(maxDateISO, minDateISO) > 2) {
      return res.status(401).json({
        message: "The maximum period is 2 months."
      });
    }

    if (differenceInDays(maxDateISO, minDateISO) < 1) {
      return res.status(401).json({
        message: "The minimum period is one day."
      });
    }

    const query: {
      camera?: object;
      earth_date: object;
    } = {
      earth_date: {
        $gte: minDateISO,
        $lte: maxDateISO
      }
    };

    if (cameras && cameras.length > 0) {
      query["camera"] = {
        $in: cameras
      };
    }

    const photos = await Photos.find(query).then((response) => {
      return response.map((photo) => {
        photo.src = "https://mars.nasa.gov/" + photo.src;
        return photo;
      });
    });

    return res
      .set("Total-Photos", String(photos.length))
      .status(200)
      .json(photos);
  },

  async getBySol(req: IGetBySolRequest, res: Response) {
    const sol = parseInt(req.params.sol);

    const photos = await Photos.find({ sol }).then((docs) => {
      return docs.map((doc) => {
        doc.src = "https://mars.nasa.gov/" + doc.src;
        return doc;
      });
    });

    return res.status(200).json(photos);
  }
};
