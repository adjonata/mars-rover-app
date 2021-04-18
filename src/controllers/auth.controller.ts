import Auth, { IAuthLogin, IAuth } from "@/models/auth.model";
import { Request, Response } from "express";
import * as crypt from "@/utils/crypt";
import jwt from "jsonwebtoken";

interface LoginRequest extends Request {
  body: {
    password: string;
    email: string;
  };
}
interface RegisterRequest extends Request {
  body: {
    email: string;
    password: string;
    username: string;
  };
}

export default {
  async login(request: LoginRequest, response: Response) {
    const { email, password } = request.body;

    if (!email || !password) {
      return response.status(401).json({
        message: "Invalid login."
      });
    }

    const user = await Auth.findOne({ email });

    if (!user) {
      return response.status(404).json({
        message: "User not found."
      });
    }

    const comparePassword = await crypt.compare(password, user.password);

    if (!comparePassword) {
      return response.status(400).json({
        message: "Invalid password"
      });
    }

    const { _id: id, username } = user;

    const token = jwt.sign({ id }, String(process.env.SECRET), {
      expiresIn: 7200
    });

    return response.status(200).json({
      user: {
        id,
        email,
        username
      },
      token
    });
  },

  async register(request: RegisterRequest, response: Response) {
    const { email, password, username } = request.body;

    if (!email || !password || !username) {
      return response.status(401).json({
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
      return response.status(501).json({
        message: "Problems in generate password hash"
      });
    }

    const findOneAlreadyInUse = await Auth.findOne({ email });

    if (findOneAlreadyInUse) {
      return response.status(403).json({
        message: "This email is already in use."
      });
    }

    return await Auth.create({
      email,
      password: passwordHash,
      username
    })
      .then(async user => {
        const { id, email, username } = user;

        const token = jwt.sign({ id }, String(process.env.SECRET), {
          expiresIn: 7200
        });

        return response.status(200).json({
          user: {
            id,
            email,
            username
          },
          token
        });
      })
      .catch(err => {
        return response.status(500).json(err);
      });
  },
  logout(request: Request, response: Response) {
    return response.json({ auth: false, token: "" });
  }
};
