const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT;
const SECRET_KEY = process.env.SECRET_KEY;

app.use(bodyParser.json());
app.use(cors({
    origin: ['https://www.uksaidiomas.com', 'https://uksaidiomas.com'],
    methods: 'GET,POST',
    allowedHeaders: 'Content-Type, Authorization'
}));

const transporter = nodemailer.createTransport({
    secure: process.env.SMTP_SECURE,
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
});

const users = [
    { username: process.env.ANON_USER, password: process.env.ANON_KEY }
];

app.post('/generate-token', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);
    if (!user) {
        return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    const token = jwt.sign({ username: user.username }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
});

function authenticateToken(req, res, next) {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ error: 'Acceso denegado' });

    jwt.verify(token.replace('Bearer ', ''), SECRET_KEY, (err, user) => {
        if (err) return res.status(403).json({ error: 'Token inválido' });
        req.user = user;
        next();
    });
}

app.post('/send-email', authenticateToken, async (req, res) => {
    const { to, subject, fromTitle, fromEmail, messageText, messageHTML } = req.body;
    if (!to || !subject || !fromTitle || !fromEmail) {
        return res.status(400).json({ error: 'Faltan datos en la solicitud' });
    }

    try {
        const info = await transporter.sendMail({
            from: fromTitle + ' <'+fromEmail+'@uksaidiomas.com>',
            to: to, 
            subject: subject,
            text: messageText,
            html: messageHTML,
          });
        
        console.log("Sender response: ", info);
    } catch (error) {
        res.status(500).json({ error: 'Error enviando el correo', details: error });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});