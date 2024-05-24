import { promisify } from "util";
import Citizen from "../models/Citizen.js";
import jwt from "jsonwebtoken";
import APIFeatures from "../utils/apiFeatures.js";

class AuthController {
  static currentUser = "";

  static sendResponse(res, user, status) {
    const id = user._id;
    const role = user.role;
    const token = jwt.sign({ id, role }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    const attributes = {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_LIFE_SPAN * 24 * 60 * 60 * 1000,
      ),
      httpOnly: true,
    };
    res.cookie("jwt", token, attributes);

    res.status(201).json({
      status,
      token,
      user,
      role,
    });
  }

  static async Signup(req, res, next) {
    try {
      const { username, password } = req.body;
      AuthController.currentUser = username;
      const user = await Citizen.findOne({ username });

      if (user) {
        if (user.isActive == false) {
          return res.status(403).json({
            error: "Your account is inactive. Please contact support",
            status: "auth-failure",
          });
        }
        if (
          !password ||
          !(await user.checkPasswords(password, user.password))
        ) {
          return res
            .status(400)
            .json({ error: "wrong credentials", status: "auth-failure" });
        } else {
          const onlineCitizen = await Citizen.findByIdAndUpdate(
            user._id,
            { $set: { status: "online" } },
            { new: true },
          );

          onlineCitizen.password = undefined;
          req.session.user = onlineCitizen;
          req.session.role = onlineCitizen.role;
          AuthController.sendResponse(res, onlineCitizen, "loged-in");
        }
      } else {
        const newCitizen = await Citizen.create({
          username,
          password,
          status: "online",
          healthStatus: "OK",
          language: "en",
          role: "citizen",
        });
        newCitizen.password = undefined;
        req.session.user = newCitizen;
        AuthController.sendResponse(res, newCitizen, "signed-up");
      }
    } catch (err) {
      res.status(400).json({
        status: "auth-failure",
        error: err.message,
      });
    }
  }

  // static async Signup(req, res, next) {
  //   try {
  //     const { username, password } = req.body;
  //     AuthController.currentUser = username;
  //     const user = await Citizen.findOne({ username });

  //     if (user) {
  //       if (!user.isActive) {
  //         return res.status(403).json({
  //           error: "Your account is inactive. Please contact support",
  //           status: "auth-failure",
  //         });
  //       }
  //       if (
  //         !password ||
  //         !(await user.checkPasswords(password, user.password))
  //       ) {
  //         return res
  //           .status(400)
  //           .json({ error: "wrong credentials", status: "auth-failure" });
  //       } else {
  //         const onlineCitizen = await Citizen.findByIdAndUpdate(
  //           user._id,
  //           { $set: { status: "online" } },
  //           { new: true },
  //         );

  //         onlineCitizen.password = undefined;
  //         req.session.user = onlineCitizen;
  //         req.session.role = onlineCitizen.role;
  //         AuthController.sendResponse(res, onlineCitizen, "loged-in");
  //       }
  //     } else {
  //       // No existing user found, handle signup
  //       if (!username || !password) {
  //         return res.status(400).json({
  //           error: "username and password are required",
  //           status: "auth-failure",
  //         });
  //       }

  //       const newCitizen = await Citizen.create({
  //         username,
  //         password,
  //         status: "online",
  //         healthStatus: "OK",
  //         language: "en",
  //         role: "citizen",
  //       });

  //       newCitizen.password = undefined;
  //       req.session.user = newCitizen;
  //       AuthController.sendResponse(res, newCitizen, "signed-up");
  //     }
  //   } catch (err) {
  //     console.error("Login Error", err);
  //     res.status(400).json({
  //       status: "auth-failure dupplicates",
  //       error: err.message,
  //     });
  //   }
  // }

  static async getHome(req, res, next) {
    try {
      const citizens = await Citizen.find(
        {},
        { _id: 3, username: 1, status: 2, healthStatus: 4, profilePicture:5, isActive: 6 },
      );
      const usernames = citizens.map((Citizen) => Citizen.username);

      res.status(200).json({
        usernames,
        citizens,
      });
    } catch (err) {
      res.status(400).json({
        status: "auth-failure",
        error: err.message,
      });
    }
  }

  static async getAllDirectory(req, res, next) {
    try {
      const features = new APIFeatures(
        Citizen.find({ isActive: true }),
        req.query,
      )
        .sort()
        .fieldLimiting();
      const citizens = await features.query;
      res.status(200).json({
        citizens,
      });
    } catch (err) {
      res.status(400).json({
        status: "auth-failure",
        error: err.message,
      });
    }
  }

  static async getActiveUsers(req, res, next) {
    try {
      const features = new APIFeatures(
        Citizen.find({ isActive: true }),
        req.query,
      )
        .sort()
        .fieldLimiting();
      const citizens = await features.query;
      res.status(200).json({
        citizens,
      });
    } catch (err) {
      res.status(400).json({
        status: "auth-failure",
        error: err.message,
      });
    }
  }
  static async getInactiveUsers(req, res, next) {
    try {
      const features = new APIFeatures(
        Citizen.find({ isActive: false }),
        req.query,
      )
        .sort()
        .fieldLimiting();
      const citizens = await features.query;
      res.status(200).json({
        citizens,
      });
    } catch (err) {
      res.status(400).json({
        status: "auth-failure",
        error: err.message,
      });
    }
  }
  static async logout(req, res) {
    try {
      if (!req.session) {
        return res.status(401).json({
          status: "failure",
          error: "You are not logged in!",
        });
      }

      const expireToken = jwt.sign({}, process.env.JWT_SECRET, {
        expiresIn: 1,
      });
      res.cookie("jwt", expireToken, {
        httpOnly: true,
        expires: new Date(Date.now() + 1),
      });

      const user = await Citizen.findOneAndUpdate(
        { username: AuthController.currentUser },
        { $set: { status: "offline" } },
        { new: true },
      );

      if (!user) {
        console.log("User not found");
      } else {
        console.log("User status set to offline");
      }

      req.session.destroy((err) => {
        if (err) {
          console.error(err);
          return res
            .status(500)
            .json({ status: "failure", error: err.message });
        }
        return res
          .status(200)
          .json({ status: "success", message: "Logged out" });
      });
    } catch (err) {
      console.error(err);
      return res.status(400).json({
        status: "auth-failure",
        error: err.message,
      });
    }
  }

  static async protect(req, res, next) {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies.jwt) {
      token = req.cookies.jwt;
    }

    if (!token) {
      return res.status(403).json({
        status: "auth-failure",
        error: "You are not logged in! Please log in to get access.",
      });
    }

    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    const auth_citizen = await Citizen.findById(decoded.id);

    if (!auth_citizen) {
      return res.status(403).json({
        status: "auth-failure",
        error: "The User belonging to this token does no longer exist",
      });
    }

    req.user = auth_citizen;
    res.locals.user = auth_citizen;
    req.role = auth_citizen.role;
    next();
  }

  static isAdmin(req, res, next) {
    if (req.role === "administrator") {
      return next();
    } else {
      return res.status(403).json({
        status: "auth-failure",
        error: "Access denied. Requires admin role.",
      });
    }
  }

  static ensureActiveUser = async (req, res, next) => {
    if (req.user.isActive) {
      return next();
    } else {
      return res.status(403).json({
        status: "auth-failure",
        error: "Your account is inactive. Please contact support.",
      });
      //return next(new AppError('Your account is inactive. Please contact support', 403));
    }
  };
  static isCoordinator(req, res, next) {
    if (req.role === "coordinator") {
      return next();
    } else {
      return res.status(403).json({
        status: "auth-failure",
        error: "Access denied. Requires coordinator role.",
      });
    }
  }
  static isCoordinatorOrAdmin(req, res, next) {
    if (req.role === "coordinator" || req.role === "administrator") {
      return next();
    } else {
      return res.status(403).json({
        status: "auth-failure",
        error: "Access denied. Requires coordinator or admin role.",
      });
    }
  }
  static isCitizen(req, res, next) {
    if (req.role === "citizen") {
      return next();
    } else {
      return res.status(403).json({
        status: "auth-failure",
        error: "Access denied. Requires citizen role.",
      });
    }
  }

  static async getCitizenById(req, res) {
    const { id } = req.params;

    try {
      const citizen = await Citizen.findById(id);

      if (!citizen) {
        return res.status(404).json({ message: "Citizen not found" });
      }

      res.status(200).json(citizen);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error fetching citizen", error: error.message });
    }
  }

  static async activateAccount(req, res) {
    try {
      const userId = req.params.id;
      const user = await Citizen.findById(userId);
      if (!user) {
        return res.status(404).json({
          message: "User does not exist",
        });
      }
      if (user.isActive) {
        return res.status(400).json({
          message: "User account is already active.",
        });
      }
      const updatedUser = await Citizen.findByIdAndUpdate(
        userId,
        { isActive: true },
        { new: true },
      );
      res.status(200).json({
        message: "User account has been activated.",
        user: updatedUser,
      });
    } catch (error) {
      res.status(500).json({
        message: "Error activating account",
        error: error.message,
      });
    }
  }
  static async deActivateAccount(req, res) {
    try {
      const userId = req.params.id;
      const user = await Citizen.findById(userId);
      if (!user) {
        return res.status(404).json({
          message: "User does not exist",
        });
      }
      if (!user.isActive) {
        return res.status(400).json({
          message: "User account is already inactive.",
        });
      }

      const updatedUser = await Citizen.findByIdAndUpdate(
        userId,
        { isActive: false },
        { new: true },
      );
      res.status(200).json({
        message: "User account has been deactivated.",
        user: updatedUser,
      });
    } catch (error) {
      res.status(500).json({
        message: "Error deactivating account",
        error: error.message,
      });
    }
  }

  static async updateUserRecord(req, res) {
    try {
      const userId = req.params.id;
      const { username, password } = req.body;
      const updates = {};
      if (username) {
        const existingUser = await Citizen.findOne({ username });
        if (existingUser && existingUser._id.toString() !== userId) {
          return res.status(400).json({
            message: "Username already taken.",
          });
        }
        updates.username = username;
      }

      if (password) {
        const salt = await bcrypt.genSalt(12);
        updates.password = await bcrypt.hash(password, salt);
      }
      if (!username && !password) {
        return res.status(400).json({
          message: "No updates provided.",
        });
      }
      const updatedUser = await Citizen.findByIdAndUpdate(userId, updates, {
        new: true,
      }).select("-password");
      res.status(200).json({
        message: "User record has been updated.",
        user: updatedUser,
      });
    } catch (error) {
      res.status(500).json({
        message: "Error updating user record",
        error: error.message,
      });
    }
  }
}
export default AuthController;
