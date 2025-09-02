import { Router } from 'express'; 
import currency from './currency';

const router = Router(); 
router.use('/currency', currency);

export default router;
