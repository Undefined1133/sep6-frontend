const fs = require('fs');
const dotenv = require('dotenv');

let env = {};

if (fs.existsSync('.env')) {
    const envConfig = dotenv.parse(fs.readFileSync('.env'));
    env = envConfig;
}

const nextConfig = {
    reactStrictMode: true,
    env,
};

module.exports = nextConfig;