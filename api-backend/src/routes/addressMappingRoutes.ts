import { Router } from 'express';
import {
  createMappingHandler,
  getMappingHandler,
  updateMappingHandler,
  deleteMappingHandler
} from '../controllers/addressMappingController';

import { getMoneroPrice } from '../controllers/coingeckoMappingController';

const router = Router();

router.post('/', createMappingHandler);
router.get('/:randomNumber', getMappingHandler);
router.put('/:randomNumber', updateMappingHandler);
router.delete('/:randomNumber', deleteMappingHandler);
router.get('/price/:assetPrice', getMoneroPrice);

export default router;
