import { config } from 'dotenv';
config();
import express from 'express';
import session from 'express-session';
import passport from './auth.js';
import { createServer } from 'node:http';
import { Server } from 'socket.io';
import cors from 'cors';

const CLIENT_URL = process.env.REMOTE_URL;

const app = express();

app.use(cors({
  origin: CLIENT_URL,
  credentials: true
}))

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

app.get('/auth/twitch', passport.authenticate('twitch'));
app.get('/auth/twitch/callback',
  passport.authenticate('twitch', { failureRedirect: '/' }),
  (req, res) => {
    console.log(req.user);
    res.redirect(CLIENT_URL);
  }
);

app.get('/api/me', (req, res) => {
  if (req.isAuthenticated()) {
    res.json(req.user);
  } else {
    res.status(401).json({ error: 'Not authenticated' });
  }
});

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: CLIENT_URL
  }
});

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
  socket.on("update-state", (state) => {
    io.emit("update-state", state);
  });
});

httpServer.listen(5892, () => {
  console.log('server running at http://localhost:5892');
});