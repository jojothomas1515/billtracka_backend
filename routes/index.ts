import { Router, Request, Response } from 'express';

const defaultRouter: Router = Router();

defaultRouter.get('/status', (req: Request, res: Response) => {
    return res.json({ status: 'alive', message: 'it a wonderful day' });
});

export default defaultRouter;
