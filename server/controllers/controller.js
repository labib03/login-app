import bcrypt from "bcrypt";
import UserModel from "../models/User.model.js";

/** middleware for verify user */
export async function verifyUser(req, res, next) {
  // try {

  //     const { username } = req.method == "GET" ? req.query : req.body;

  //     // check the user existance
  //     let exist = await UserModel.findOne({ username });
  //     if(!exist) return res.status(404).send({ error : "Can't find User!"});
  //     next();

  // } catch (error) {
  //     return res.status(404).send({ error: "Authentication Error"});
  // }
  res.status(201).json("success");
}

/** POST: http://localhost:8080/api/register 
 * @param : {
  "username" : "example123",
  "password" : "admin123",
  "email": "example@gmail.com",
  "firstName" : "bill",
  "lastName": "william",
  "mobile": 8009860560,
  "address" : "Apt. 556, Kulas Light, Gwenborough",
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

    await UserModel.create({
      username,
      password: encryptedPassword,
      profile: profile || "",
      email,
    });

    return res.status(201).json({
      status: "SUCCESS",
      message: "User Register Successfully",
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
  res.json("login route");
}

/** GET: http://localhost:8080/api/user/example123 */
export async function getUser(req, res) {
  res.json("getUser route");
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
  res.json("updateUser route");
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
