"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const router = express_1.Router();
router.get('/signin/form', auth_controller_1.signinForm);
router.post('/signin', auth_controller_1.signin);
router.get('/signout', auth_controller_1.signout);
exports.default = router;
