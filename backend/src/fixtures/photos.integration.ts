import { parseISO, differenceInDays } from "date-fns";
import { Request, Response } from "express";
import Photos, { IPhotos } from "../models/photos.model";
import Manifests from "../models/manifests.model";
import MarsApi from "../services/marsApi.service";

export interface IPhotosQuery {
  minDate: string | Date;
  maxDate: string | Date;
}

export interface IPhotosApiResponse {
  id: number;
  sol: number;
  camera: {
    id: number;
    name: string;
    rover_id: number;
    full_name: string;
  };
  img_src: string;
  earth_date: string;
  rover: {
    id: number;
    name: string;
    landing_date: string;
    launch_date: string;
    status: string;
  };
}

export interface IPhotosSuccess {
  timing: string;
  totalPhotos: number;
  photosIds: number[];
}

export default {
  async photosSync(req: Request, res: Response) {
    let { minDate, maxDate }: IPhotosQuery = req.body;

    if (!minDate || !maxDate) {
      return res.status(400).json({ message: "Invalid period." });
    }

    minDate = parseISO(String(minDate));
    maxDate = parseISO(String(maxDate));

    if (differenceInDays(maxDate, minDate) > 365) {
      return res.status(400).json({
        message: "The maximum period is 1 year."
      });
    }

    // let totalPhotos: number = 0;
    // const photosIds: number[] = [];
    // let miliseconds: number = 0;

    // const counter = setInterval(() => {
    //   miliseconds++;
    // }, 100);

    const manifestsRes = await Manifests.find()
      .where("earth_date")
      .gt(minDate)
      .lt(maxDate)
      .exec();

    if (!manifestsRes || manifestsRes.length === 0) {
      return res.json({
        message: "There are no manifests in that period."
      });
    }

    const solsToSync: number[] = [];

    for (let manifest of manifestsRes) {
      // await manifestsRes.map(async manifest => {
      // console.log(manifest);
      await Photos.countDocuments(
        { earth_date: manifest.earth_date },
        function (err, count) {
          if (err) return;

          console.log(count, manifest.total_photos);

          if (count !== manifest.total_photos) {
            console.log("Sol", manifest.sol);
            solsToSync.push(manifest.sol);
          }
        }
      );
      // });
    }
    
    console.log("Sols list", solsToSync);

    if (solsToSync.length === 0) {
      return res.status(201).json({
        message: "All photos from this period have already been synced."
      });
    }

    await solsToSync.map(async sol => {
      const { data } = await MarsApi.get("/rovers/curiosity/photos", {
        params: { sol }
      });

      if (!data || !data.photos || data.photos.length === 0) return;

      const photos: IPhotosApiResponse[] = data.photos;

      const photosIdsToVerify = photos.map((photo, i) => ({
        id_base: photo.id,
        index: i
      }));

      const photosFindInDb = await Photos.find()
        .where("id_base")
        .in(photosIdsToVerify)
        .exec();

      const photosToAdded: Object[] = [];

      for (let photo of photosIdsToVerify) {
        const searchInData = photosFindInDb.findIndex(
          p => p.id_base === photo.id_base
        );

        if (searchInData < 0) {
          const content = photos[photo.index];

          const camera = content.camera.name;
          const src: string = content.img_src.split("msl-raw-images/")[1];

          const toCreate = {
            id_base: content.id,
            earth_date: content.earth_date,
            camera,
            src
          };

          photosToAdded.push(toCreate);
        }
        continue;
      }

      await new Promise(resolve => setTimeout(resolve, 300));

      return await Photos.insertMany(photosToAdded)
        .then(() => {
          return res.status(200).json({
            message: "Success in synchronization!",
            photosAdded: photosToAdded
          });
        })
        .catch(error => {
          return res.status(500).json({
            message: "Synchronization error!",
            error
          });
        });
    });
  }
};

//     return await resMan.map(async man => {
//       await MarsApi.get("/rovers/curiosity/photos", {
//         params: {
//           sol: man.sol
//         }
//       })
//         .then(async ({ data }) => {
//           const photos: IPhotosApiResponse[] = data.photos;

//           if (!photos || photos.length < 1) {
//             return reject(
//               res.status(400).json({
//                 message: "There are no photos in this period."
//               })
//             );
//           }

//           const photosToAdded: Array<Object> = [];

//           for (let photo of photos) {
//             await Photos.findOne({ id_base: photo.id })
//               .then(async resPhotos => {
//                 if (!resPhotos) {
//                   const camera = photo.camera.name;
//                   const src: string = photo.img_src.split(
//                     "msl-raw-images/"
//                   )[1];

//                   const toCreate = {
//                     id_base: photo.id,
//                     earth_date: photo.earth_date,
//                     camera,
//                     src
//                   };

//                   photosToAdded.push(toCreate);
//                   totalPhotos++;
//                   photosIds.push(photo.id);
//                 } else {
//                   return;
//                 }
//               })
//               .catch(errorPhotos => {
//                 console.log(errorPhotos);
//                 return reject(res.status(500).json(errorPhotos));
//               });
//           }
//           return await Photos.insertMany(photosToAdded)
//             .then(() => {
//               clearInterval(counter);

//               const success: IPhotosSuccess = {
//                 timing: `${miliseconds / 10} seconds`,
//                 totalPhotos,
//                 photosIds
//               };

//               return resolve(res.status(200).json(success));
//             })
//             .catch(errorCreate => {
//               return reject(
//                 res.status(500).json({
//                   message: "Synchronization error: create multiple",
//                   errorCreate
//                 })
//               );
//             });
//         })
//         .catch(errorMars => {
//           const message = `Synchronization error: get sol ${man.sol}.`;
//           console.log(message);

//           return reject(
//             res.status(500).json({
//               message,
//               errorMars
//             })
//           );
//         });
//     });
//   });
// })
// .catch(errorMan => res.status(500).json(errorMan));

// return await Manifests.find()
//   .where("earth_date")
//   .gt(minDate)
//   .lt(maxDate)
//   .then(async resMan => {
//     return await new Promise(async (resolve, reject) => {
//       return await resMan.map(async man => {
//         await MarsApi.get("/rovers/curiosity/photos", {
//           params: {
//             sol: man.sol
//           }
//         })
//           .then(async ({ data }) => {
//             const photos: IPhotosApiResponse[] = data.photos;

//             if (!photos || photos.length < 1) {
//               return reject(
//                 res.status(400).json({
//                   message: "There are no photos in this period."
//                 })
//               );
//             }

//             const photosToAdded: Array<Object> = [];

//             for (let photo of photos) {
//               await Photos.findOne({ id_base: photo.id })
//                 .then(async resPhotos => {
//                   if (!resPhotos) {
//                     const camera = photo.camera.name;
//                     const src: string = photo.img_src.split(
//                       "msl-raw-images/"
//                     )[1];

//                     const toCreate = {
//                       id_base: photo.id,
//                       earth_date: photo.earth_date,
//                       camera,
//                       src
//                     };

//                     photosToAdded.push(toCreate);
//                     totalPhotos++;
//                     photosIds.push(photo.id);
//                   } else {
//                     return;
//                   }
//                 })
//                 .catch(errorPhotos => {
//                   console.log(errorPhotos);
//                   return reject(res.status(500).json(errorPhotos));
//                 });
//             }
//             return await Photos.insertMany(photosToAdded)
//               .then(() => {
//                 clearInterval(counter);

//                 const success: IPhotosSuccess = {
//                   timing: `${miliseconds / 10} seconds`,
//                   totalPhotos,
//                   photosIds
//                 };

//                 return resolve(res.status(200).json(success));
//               })
//               .catch(errorCreate => {
//                 return reject(
//                   res.status(500).json({
//                     message: "Synchronization error: create multiple",
//                     errorCreate
//                   })
//                 );
//               });
//           })
//           .catch(errorMars => {
//             const message = `Synchronization error: get sol ${man.sol}.`;
//             console.log(message);

//             return reject(
//               res.status(500).json({
//                 message,
//                 errorMars
//               })
//             );
//           });
//       });
//     });
//   })
//   .catch(errorMan => res.status(500).json(errorMan));
