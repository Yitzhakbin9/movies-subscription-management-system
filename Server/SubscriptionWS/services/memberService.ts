import axios from 'axios';
import { MemberData, PartialMemberData } from '../models/memberInterface';
import * as memberRepository from '../repositories/memberRepository';
import * as subscriptionRepository from '../repositories/subscriptionRepository';
import ApiError from '../utils/apiError';
import validateObjectId from '../utils/validateObjectId';

type ExternalMember = {
  name: string;
  email: string;
  address?: {
    city?: string;
  };
};

const MEMBERS_WS_URL = 'https://jsonplaceholder.typicode.com/users';

const getAllMembers = (filter: Record<string, unknown> = {}) =>
  memberRepository.getAllMembers(filter);

const getMemberById = async (id: string) => {
  validateObjectId(id, 'Member id');
  const member = await memberRepository.getMemberById(id);

  if (!member) {
    throw new ApiError('Member not found', 404);
  }

  return member;
};

const createMember = (memberData: MemberData) =>
  memberRepository.createMember(memberData);

const updateMember = async (id: string, memberData: PartialMemberData) => {
  validateObjectId(id, 'Member id');
  const member = await memberRepository.updateMember(id, memberData);

  if (!member) {
    throw new ApiError('Member not found', 404);
  }

  return member;
};

const replaceMember = async (id: string, memberData: MemberData) => {
  validateObjectId(id, 'Member id');
  const member = await memberRepository.replaceMember(id, memberData);

  if (!member) {
    throw new ApiError('Member not found', 404);
  }

  return member;
};

const deleteMember = async (id: string) => {
  validateObjectId(id, 'Member id');

  // Prevent deleting a member that is still referenced by subscriptions.
  const hasSubscriptions = await subscriptionRepository.hasSubscriptionForMember(id);

  if (hasSubscriptions) {
    throw new ApiError('Cannot delete member with existing subscriptions', 409);
  }

  const member = await memberRepository.deleteMember(id);

  if (!member) {
    throw new ApiError('Member not found', 404);
  }

  return member;
};

// Pull members from the external WS and upsert them into the local Members collection.
const syncMembers = async () => {
  let response;

  try {
    response = await axios.get<ExternalMember[]>(MEMBERS_WS_URL);
  } catch (error) {
    throw new ApiError(`Failed to fetch members from external WS: ${(error as Error).message}`, 502);
  }

  const syncedMembers = await Promise.all(
    response.data.map((member) =>
      memberRepository.upsertMemberByEmail({
        Name: member.name,
        Email: member.email,
        City: member.address?.city || '',
      })
    )
  );

  return {
    synced: syncedMembers.length,
    members: syncedMembers,
  };
};

export {
  getAllMembers,
  getMemberById,
  createMember,
  updateMember,
  replaceMember,
  deleteMember,
  syncMembers,
};
