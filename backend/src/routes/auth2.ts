import {Router, Request, Response} from 'express';
const router = Router();

router.get('/register2', (req: Request, res: Response) => {
  res.send('auth number 2');
})

export default  router