import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './mongodb/connect.js';
import postRoutes from './routes/postRotes.js';
import dalleRoutes from './routes/dalleRoutes.js';

dotenv.config();

const app = express();
// Add Access Control Allow Origin headers
// app.use((req, res, next) => {
//   res.setHeader(
//     'Access-Control-Allow-Origin',
//     'http://127.0.0.1:5173/create-post'
//   );
//   res.header(
//     'Access-Control-Allow-Headers',
//     'Origin, X-Requested-With, Content-Type, Accept'
//   );
//   next();
// });
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use('/api/v1/post', postRoutes);
app.use('/api/v1/dalle', dalleRoutes);

app.get('/', async (req, res) => {
  res.status(200).json({
    message: 'Hello from ImageGRT!',
  });
});

const startServer = async () => {
  try {
    connectDB(process.env.MONGODB_URL);
    app.listen(8080, () =>
      console.log('Server has started on port http://localhost:8080')
    );
  } catch (error) {
    console.log(error);
  }
};

startServer();
