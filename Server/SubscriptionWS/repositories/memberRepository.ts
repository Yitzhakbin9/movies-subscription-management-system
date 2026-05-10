import Member from '../models/memberModel';
import { MemberData, PartialMemberData } from '../models/memberInterface';

const getAllMembers = (filter = {}) => Member.find(filter);

const getMemberById = (id: string) => Member.findById(id);

const createMember = (memberData: MemberData) => Member.create(memberData);

const updateMember = (id: string, memberData: PartialMemberData) =>
  Member.findByIdAndUpdate(id, memberData, {
    new: true,
    runValidators: true,
  });

const replaceMember = (id: string, memberData: MemberData) =>
  Member.findOneAndReplace({ _id: id }, memberData, {
    new: true,
    runValidators: true,
  });

const upsertMemberByEmail = (memberData: MemberData) =>
  Member.findOneAndUpdate(
    { Email: memberData.Email },
    memberData,
    {
      new: true,
      upsert: true,
      runValidators: true,
      setDefaultsOnInsert: true,
    }
  );

const deleteMember = (id: string) => Member.findByIdAndDelete(id);

export {
  getAllMembers,
  getMemberById,
  createMember,
  updateMember,
  replaceMember,
  upsertMemberByEmail,
  deleteMember,
};
