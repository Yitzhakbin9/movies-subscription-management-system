import { isValidObjectId } from 'mongoose';
import ApiError from './apiError';

const validateObjectId = (id: string, fieldName = 'id') => {
  if (!isValidObjectId(id)) {
    throw new ApiError(`${fieldName} must be a valid ObjectId`, 400);
  }
};

export default validateObjectId;
