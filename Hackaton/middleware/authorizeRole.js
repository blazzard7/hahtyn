
const authorizeRole = (roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ message: 'Unauthorized' }); // No user authenticated
        }

        const userRole = req.user.status; // Assuming req.user.status holds the user's role

        if (!roles.includes(userRole)) {
            return res.status(403).json({ message: 'Forbidden: Insufficient privileges' }); // User does not have the required role
        }

        next(); // User is authorized
    };
};

export default authorizeRole;