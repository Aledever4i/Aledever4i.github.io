/// <binding ProjectOpened='Watch - Development' />
const prod = require("./webpack.prod.js");
const dev = require("./webpack.dev.js");


if (process.env.NODE_ENV === "development") {
    module.exports = dev;
}
else if (process.env.NODE_ENV === "production") {
    module.exports = prod;
}
else {
    console.error("Something wrong: ", process.env.NODE_ENV);
}