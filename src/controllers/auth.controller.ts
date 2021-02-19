import Auth, { IAuthLogin, IAuth } from "@models/auth.model";
import { Request, Response } from "express";
import * as crypt from "@utils/crypt";
import jwt from "jsonwebtoken";

export default {
  async login(req: Request, res: Response) {
    const { email, password }: IAuthLogin = req.body;

    if (!email || !password) {
      return res.status(401).json({
        message: "Invalid login."
      });
    }

    return await Auth.findOne({ email })
      .then(async user => {
        if (user) {
          const comparePassword = await crypt.compare(password, user.password);

          if (comparePassword) {
            const { _id: id, email, username } = user;
            const token = jwt.sign({ id }, String(process.env.SECRET), {
              expiresIn: 7200
            });

            return res.status(200).json({
              user: {
                id,
                email,
                username
              },
              token
            });
          } else {
            return res.status(400).json({
              message: "Invalid password"
            });
          }
        } else {
          return res.status(404).json({
            message: "User not found."
          });
        }
      })
      .catch(err => {
        return res.status(500).json(err);
      });
  },

  async register(req: Request, res: Response) {
    const { email, password, username }: IAuth = req.body;

    if (!email || !password || !username) {
      return res.status(401).json({
        message: "Invalid register."
      });
    }

    let passwordHash: string = "";

    await crypt.generate(password, 12).then(hash => {
      if (hash && typeof hash === "string") {
        passwordHash = hash;
      }
    });

    if (!passwordHash) {
      return res.status(501).json({
        message: "Problems in generate password hash"
      });
    }

    const toCreate = {
      email,
      password: passwordHash,
      username
    };

    const findFirst = await Auth.find({ email, username });

    if (findFirst.length > 0) {
      return res.status(403).json({
        message: "This email or username is already in use"
      });
    }

    return await Auth.create(toCreate)
      .then(async user => {
        const { id, email, username } = user;

        const token = jwt.sign({ id }, String(process.env.SECRET), {
          expiresIn: 7200
        });

        return res.status(200).json({
          user: {
            id,
            email,
            username
          },
          token
        });
      })
      .catch(err => {
        return res.status(500).json(err);
      });
  },
  logout(req: Request, res: Response) {
    return res.json({ auth: false, token: "" });
  }
};
