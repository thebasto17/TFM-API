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
router.get('/:ethereumAddress/:randomNumber', getMappingHandler);
router.put('/:ethereumAddress/:randomNumber', updateMappingHandler);
router.delete('/:ethereumAddress/:randomNumber', deleteMappingHandler);
router.get('/monero-price', getMoneroPrice);

export default router;
