"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signout = exports.signin = exports.signinForm = void 0;
const passport_1 = __importDefault(require("passport"));
const signinForm = (req, res) => {
    res.render('auth/auth-form', {
        errors: null,
        isAuthenticated: req.isAuthenticated(),
        currentUser: req.user,
    });
};
exports.signinForm = signinForm;
const signin = (req, res, next) => {
    passport_1.default.authenticate('local', (err, user, info) => {
        if (err) {
            next(err);
        }
        else if (!user) {
            res.render('auth/auth-form', {
                errors: [info.message],
                isAuthenticated: req.isAuthenticated(),
                currentUser: req.user,
            });
        }
        else {
            req.login(user, (err) => {
                if (err) {
                    next(err);
                }
                else {
                    res.redirect('/tweets');
                }
            });
        }
    })(req, res, next);
};
exports.signin = signin;
const signout = (req, res) => {
    req.logout();
    res.redirect('/auth/signin/form');
};
exports.signout = signout;
