const jwt = require("jsonwebtoken");

const protect = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const isCustomAuth = token.lenght < 500;
    let decodedData;
    if (token && isCustomAuth) {
      decodedData = jwt.verify(token, "test");
      req.userId = decodedData?.id;
    } else {
      decodedData = jwt.decode(token);
      req.userId = decodedData?.sub;
    }
    next();
  } catch (error) {
    console.log(error);
  }
};
module.exports = { protect };
