"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.unFollowUser = exports.followUser = exports.uploadImage = exports.signup = exports.signupForm = exports.userProfile = exports.userList = void 0;
const users_queries_1 = require("../queries/users.queries");
const tweets_queries_1 = require("../queries/tweets.queries");
const path_1 = __importDefault(require("path"));
const multer_1 = __importDefault(require("multer"));
const upload = multer_1.default({
    storage: multer_1.default.diskStorage({
        destination: (_, __, cb) => {
            cb(null, path_1.default.join(__dirname, '../../public/images/avatars'));
        },
        filename: (_, file, cb) => {
            cb(null, `${Date.now()}-${file.originalname}`);
        },
    }),
});
const userList = async (req, res, next) => {
    try {
        const search = req.query.search;
        const users = await users_queries_1.searchUsersPerUsername(search);
        res.render('includes/search-menu', { users });
    }
    catch (e) {
        next(e);
    }
};
exports.userList = userList;
const userProfile = async (req, res, next) => {
    try {
        const username = req.params.username;
        const user = await users_queries_1.findUserPerUsername(username);
        if (user) {
            const tweets = await tweets_queries_1.getUserTweetsFormAuthorId(user._id);
            res.render('tweets/tweet', {
                tweets,
                isAuthenticated: req.isAuthenticated(),
                currentUser: req.user,
                user,
                editable: false,
            });
        }
        else {
            res.redirect('/');
        }
    }
    catch (e) {
        next(e);
    }
};
exports.userProfile = userProfile;
const signupForm = (req, res) => {
    res.render('users/user-form', {
        errors: null,
        isAuthenticated: req.isAuthenticated(),
        currentUser: req.user,
    });
};
exports.signupForm = signupForm;
const signup = async (req, res) => {
    const body = req.body;
    try {
        await users_queries_1.createUser(body);
        res.redirect('/');
    }
    catch (e) {
        res.render('users/user-form', {
            errors: [e.message],
            isAuthenticated: req.isAuthenticated(),
            currentUser: req.user,
        });
    }
};
exports.signup = signup;
exports.uploadImage = [
    upload.single('avatar'),
    async (req, res, next) => {
        try {
            const user = req.user;
            if (user) {
                user.avatar = `/images/avatars/${req.file.filename}`;
                await user.save();
                res.redirect('/');
            }
            else {
                res.end();
            }
        }
        catch (e) {
            next(e);
        }
    },
];
const followUser = async (req, res, next) => {
    try {
        const userId = req.params.userId;
        const [, user] = await Promise.all([
            users_queries_1.addUserIdToCurrentUserFollowing(req.user, userId),
            users_queries_1.findUserPerId(userId),
        ]);
        if (user) {
            res.redirect(`/users/${user.username}`);
        }
        else {
            res.redirect('/');
        }
    }
    catch (e) {
        next(e);
    }
};
exports.followUser = followUser;
const unFollowUser = async (req, res, next) => {
    try {
        const userId = req.params.userId;
        const [, user] = await Promise.all([
            users_queries_1.removeUserIdToCurrentUserFollowing(req.user, userId),
            users_queries_1.findUserPerId(userId),
        ]);
        if (user) {
            res.redirect(`/users/${user.username}`);
        }
        else {
            res.redirect('/');
        }
    }
    catch (e) {
        next(e);
    }
};
exports.unFollowUser = unFollowUser;
