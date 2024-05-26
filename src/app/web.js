import express from 'express';

export const web = express();

web.use(express.json());

web.listen(port, () => {
  console.log('server running at http://localhost:' + port);
});
