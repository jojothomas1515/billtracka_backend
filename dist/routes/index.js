import { Router } from 'express';
const defaultRouter = Router();
defaultRouter.get('/status', (req, res) => {
    return res.json({ status: 'alive', message: 'it a wonderful day' });
});
export default defaultRouter;
//# sourceMappingURL=index.js.map