"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.profile = exports.signin = exports.signup = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = new user_model_1.default({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        });
        user.password = yield user.encryptPassword(user.password);
        const savedUser = yield user.save();
        if (!savedUser)
            return res.status(400).json("Not found.");
        const token = yield jsonwebtoken_1.default.sign({ _id: savedUser._id }, process.env.SECRET_KEY || "secret_key");
        res.json(token);
    }
    catch (err) {
        console.log(err);
    }
});
exports.signup = signup;
const signin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_model_1.default.findOne({ email: req.body.email });
        if (!user)
            return res.status(400).json("Email or password is wrong.");
        const validPassword = yield user.validatePassword(req.body.password);
        if (!validPassword)
            return res.status(400).json("Invalid password.");
        const token = jsonwebtoken_1.default.sign({ _id: user._id }, process.env.SECRET_KEY || "secret_key", {
            expiresIn: 60 * 60 * 24
        });
        res.header("auth-token", token).json(user);
    }
    catch (err) {
        console.log(err);
    }
});
exports.signin = signin;
const profile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.findById(req.userId).select("-__v -password -createdAt");
    if (!user)
        return res.status(404).json("Not user");
    res.json(user);
});
exports.profile = profile;
//# sourceMappingURL=auth.controller.js.map