import express, { Request, Response } from 'express';
import * as memberService from '../services/memberService';
import ApiError from '../utils/apiError';
import { MemberData } from '../models/memberInterface';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const members = await memberService.getAllMembers(
      req.query as Record<string, string | undefined>
    );
    res.json(members);
  } catch (error) {
    const customError = error as ApiError;
    res.status(customError.status || 500).json({ message: customError.message });
  }
});

// POST /members = manual create of one local record
// POST /members/sync = bulk import/update from external WS
// The main goal of this function is to sync the extrernal WS to our local DB
router.post('/sync', async (_req: Request, res: Response) => {
  try {
    const result = await memberService.syncMembers();
    res.json(result);
  } catch (error) {
    const customError = error as ApiError;
    res.status(customError.status || 500).json({ message: customError.message });
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  try {
    if (!req.params.id) {
      throw new ApiError('ID parameter is required', 400);
    }

    const memberId = String(req.params.id);
    const member = await memberService.getMemberById(memberId);
    res.json(member);
  } catch (error) {
    const customError = error as ApiError;
    res.status(customError.status || 500).json({ message: customError.message });
  }
});

router.post('/', async (req: Request, res: Response) => {
  try {
    const member = await memberService.createMember(req.body as MemberData);
    res.status(201).json(member);
  } catch (error) {
    const customError = error as ApiError;
    res.status(customError.status || 500).json({ message: customError.message });
  }
});

router.patch('/:id', async (req: Request, res: Response) => {
  try {
    if (!req.params.id) {
      throw new ApiError('ID parameter is required', 400);
    }

    const memberId = String(req.params.id);
    const member = await memberService.updateMember(
      memberId,
      req.body as Partial<MemberData>
    );

    res.json(member);
  } catch (error) {
    const customError = error as ApiError;
    res.status(customError.status || 500).json({ message: customError.message });
  }
});

router.put('/:id', async (req: Request, res: Response) => {
  try {
    if (!req.params.id) {
      throw new ApiError('ID parameter is required', 400);
    }

    const memberId = String(req.params.id);
    const member = await memberService.replaceMember(
      memberId,
      req.body as MemberData
    );

    res.json(member);
  } catch (error) {
    const customError = error as ApiError;
    res.status(customError.status || 500).json({ message: customError.message });
  }
});

router.delete('/:id', async (req: Request, res: Response) => {
  try {
    if (!req.params.id) {
      throw new ApiError('ID parameter is required', 400);
    }

    const memberId = String(req.params.id);
    const member = await memberService.deleteMember(memberId);
    res.json(member);
  } catch (error) {
    const customError = error as ApiError;
    res.status(customError.status || 500).json({ message: customError.message });
  }
});

export default router;
