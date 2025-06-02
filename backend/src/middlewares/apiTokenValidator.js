const verifyApiToken = (req, res, next) => {
    const token = req.headers["api-key"];
    if (!token || token !== process.env.APP_API_KEY) {
        return res.status(401).json({ error: "Invalid API token" });
    }
    next();
};

module.exports = { verifyApiToken };
