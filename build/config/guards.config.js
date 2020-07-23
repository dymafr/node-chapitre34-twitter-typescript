"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensureAuthenticated = void 0;
exports.ensureAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    }
    else {
        res.redirect('/auth/signin/form');
    }
};
