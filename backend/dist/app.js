"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const auth_1 = __importDefault(require("./routes/auth"));
const authUser_1 = __importDefault(require("./authorisedRoute/authUser"));
const auth2_1 = __importDefault(require("./routes/auth2"));
const dbConfig_1 = __importDefault(require("./database/dbConfig"));
const port = 8000;
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use('/api/', auth_1.default);
app.use('/api/', authUser_1.default);
app.use('/api/user', auth2_1.default);
dbConfig_1.default.sync()
    .then(() => {
    console.log('Database synchronized');
})
    .catch((err) => {
    console.error('Error synchronizing database:', err);
});
app.listen(port, () => {
    console.log(`now listening on port ${port}`);
});
