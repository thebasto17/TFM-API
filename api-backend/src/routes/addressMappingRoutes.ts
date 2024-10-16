import { Router } from 'express';
import {
  createMappingHandler,
  getMappingHandler,
  updateMappingHandler,
  deleteMappingHandler
} from '../controllers/addressMappingController';

const router = Router();

router.post('/', createMappingHandler);
router.get('/:moneroTxId/:moneroTxKey', getMappingHandler);
router.put('/:moneroTxId/:moneroTxKey', updateMappingHandler);
router.delete('/:moneroTxId/:moneroTxKey', deleteMappingHandler);

export default router;
