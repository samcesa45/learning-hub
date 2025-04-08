"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const logger_1 = __importDefault(require("./utils/logger"));
const config_1 = __importDefault(require("./utils/config"));
const middleware_1 = __importDefault(require("./utils/middleware"));
const auth_1 = __importDefault(require("./routes/auth"));
const contact_1 = __importDefault(require("./routes/contact"));
const profile_1 = __importDefault(require("./routes/profile"));
const authenticationToken_1 = __importDefault(require("./utils/authenticationToken"));
mongoose_1.default.set('strictQuery', false);
// logger.info('connecting to ', config.MONGODB_URI!)
mongoose_1.default.connect(config_1.default.MONGODB_URI)
    .then(() => {
    logger_1.default.info('connected to MongoDB');
})
    .catch((error) => {
    logger_1.default.error('error connecting to MongoDB', error.message);
});
app.use((0, cors_1.default)());
app.use(express_1.default.static('dist'));
app.use(express_1.default.json());
app.use(middleware_1.default.requestLogger);
app.use("/api/auth", auth_1.default);
app.use('/api/contact', authenticationToken_1.default, contact_1.default);
app.use('/api/user', authenticationToken_1.default, profile_1.default);
app.use(middleware_1.default.unknownEndpoint);
app.use(middleware_1.default.errorHandler);
exports.default = app;
