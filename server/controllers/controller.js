import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import ENV from "../config.js";
import UserModel from "../models/User.model.js";

/** middleware for verify user */
export async function verifyUser(req, res, next) {
  try {
    const { username } = req.method == "GET" ? req.query : req.body;

    // check the user existence
    let exist = await UserModel.findOne({ username });
    if (!exist)
      return res.status(403).json({
        status: "FAILED",
        message: `Sorry user with username ${username} not found`,
      });
    next();
  } catch (error) {
    return res.status(404).send({ error: "Authentication Error" });
  }
}

/** POST: http://localhost:8080/api/register
 * @param : {
  "username" : "example123",
  "password" : "admin123",
  "email": "example@gmail.com",
  "firstName" : "bill",
  "lastName": "william",
  "mobile": 8009860560,
  "address" : "Apt. 556, Klas Light, Gwenborough",
  "profile": ""
}
 */
export async function register(req, res) {
  try {
    const { username, password, profile, email } = req.body;
    // check the existing user
    const existUsername = await UserModel.findOne({ username });
    const existEmail = await UserModel.findOne({ email });
    if (existEmail && existUsername) {
      return res
        .status(302)
        .json({ status: "FAILED", message: "email and username already used" });
    }

    if (existEmail) {
      return res
        .status(302)
        .json({ status: "FAILED", message: "email already used" });
    }

    if (existUsername) {
      return res
        .status(302)
        .json({ status: "FAILED", message: "username already used" });
    }

    // encrypting password
    const encryptedPassword = await bcrypt.hash(password, 10);

    UserModel.create({
      username,
      password: encryptedPassword,
      profile: profile || "",
      email,
    })
      .then(() => {
        return res.status(201).json({
          status: "SUCCESS",
          message: "User Register Successfully",
        });
      })
      .catch((err) => {
        return res.status(404).json({
          status: "Failed",
          message: "Register User Failed",
          error: err,
        });
      });
  } catch (error) {
    return res.status(500).send("something went wrong");
  }
}

/** POST: http://localhost:8080/api/login
 * @param: {
  "username" : "example123",
  "password" : "admin123"
}
 */
export async function login(req, res) {
  const { username, password } = req.body;

  try {
    const user = await UserModel.findOne({ username });

    const comparePassword = await bcrypt.compare(password, user.password);

    if (!comparePassword) {
      return res
        .status(403)
        .json({ status: "FAILED", message: "Wrong password !" });
    }

    //   creating jwt token
    const token = jwt.sign(
      {
        userId: user._id,
        username: user.username,
      },
      ENV.JWT_SECRET,
      { expiresIn: "24h" }
    );

    return res.status(200).send({
      status: "SUCCESS",
      msg: "Login Successful...!",
      username: user.username,
      token,
    });
  } catch (error) {
    return res.status(500).json({
      status: "FAILED",
      message: "Something went wrong",
      error,
    });
  }
}

/** GET: http://localhost:8080/api/user/example123 */
export async function getUser(req, res) {
  const { username } = req.params;

  try {
    const user = await UserModel.findOne({ username });

    if (!user) {
      return res
        .status(403)
        .json({ status: "FAILED", message: "Can't Find the User" });
    }

    /** remove password from user */
    const { password, ...rest } = Object.assign({}, user.toJSON());
    return res.status(201).json({ status: "SUCCESS", data: rest });
  } catch (error) {
    return res.status(404).send({ error: "Cannot Find User Data" });
  }
}

/** PUT: http://localhost:8080/api/updateuser
 * @param: {
  "header" : "<token>"
}
 body: {
    firstName: '',
    address : '',
    profile : ''
}
 */
export async function updateUser(req, res) {
  try {
    const id = req.query.id;

    if (!id) {
      return res
        .status(404)
        .json({ status: "FAILED", message: "ID not found" });
    }

    const body = req.body;

    UserModel.updateOne({ _id: id }, body)
      .then(() => {
        return res.status(200).json({
          status: "SUCCESS",
          message: "Update user success",
        });
      })
      .catch((err) => {
        return res
          .status(404)
          .json({ status: "FAILED", message: "Update failed", err });
      });
  } catch (error) {
    return res.status(401).send({ error });
  }
}

/** GET: http://localhost:8080/api/generateOTP */
export async function generateOTP(req, res) {
  res.json("generateOTP route");
}

/** GET: http://localhost:8080/api/verifyOTP */
export async function verifyOTP(req, res) {
  res.json("verifyOTP route");
}

// successfully redirect user when OTP is valid
/** GET: http://localhost:8080/api/createResetSession */
export async function createResetSession(req, res) {
  res.json("createResetSession route");
}

// update the password when we have valid session
/** PUT: http://localhost:8080/api/resetPassword */
export async function resetPassword(req, res) {
  res.json("reset password route");
}
