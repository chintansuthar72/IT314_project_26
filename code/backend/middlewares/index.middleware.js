// import middlewares
const { verifyToken } = require("./authJwt.middleware");

// export middleware
module.exports = {
    verifyToken,
};
