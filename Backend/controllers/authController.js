const { OAuth2Client } = require('google-auth-library');
const jwt = require('jsonwebtoken');
const db = require('../config/db');
require('dotenv').config();

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Google Login
exports.googleLogin = async (req, res) => {
    try {
        const { tokenId } = req.body;

        // Verify token with Google
        const ticket = await client.verifyIdToken({
            idToken: tokenId,
            audience: process.env.GOOGLE_CLIENT_ID
        });

        const payload = ticket.getPayload();
        const { sub, email, name, picture } = payload;

        // Check if user exists
        db.query(
            'SELECT * FROM users WHERE google_id = ?',
            [sub],
            (err, results) => {
                if (err) return res.status(500).json({ message: err });

                if (results.length > 0) {
                    // User exists, generate JWT
                    const token = jwt.sign(
                        { id: results[0].id },
                        process.env.JWT_SECRET,
                        { expiresIn: '7d' }
                    );
                    return res.json({ token, user: results[0] });
                } else {
                    // Create new user
                    const newUser = { google_id: sub, name, email, picture };
                    db.query('INSERT INTO users SET ?', newUser, (err, result) => {
                        if (err) return res.status(500).json({ message: err });

                        const token = jwt.sign(
                            { id: result.insertId },
                            process.env.JWT_SECRET,
                            { expiresIn: '7d' }
                        );
                        return res.json({ token, user: { id: result.insertId, ...newUser } });
                    });
                }
            }
        );

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Google login failed' });
    }
};
