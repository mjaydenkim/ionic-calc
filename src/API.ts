/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateTeacherInput = {
  id?: string | null,
  name: string,
  email?: string | null,
  teacherRoomId?: string | null,
};

export type ModelTeacherConditionInput = {
  name?: ModelStringInput | null,
  email?: ModelStringInput | null,
  and?: Array< ModelTeacherConditionInput | null > | null,
  or?: Array< ModelTeacherConditionInput | null > | null,
  not?: ModelTeacherConditionInput | null,
  teacherRoomId?: ModelIDInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type Teacher = {
  __typename: "Teacher",
  id: string,
  name: string,
  email?: string | null,
  room?: Room | null,
  createdAt: string,
  updatedAt: string,
  teacherRoomId?: string | null,
};

export type Room = {
  __typename: "Room",
  id: string,
  name: string,
  teacher?: Teacher | null,
  student?: ModelStudentConnection | null,
  code: string,
  createdAt: string,
  updatedAt: string,
  roomTeacherId?: string | null,
  owner?: string | null,
};

export type ModelStudentConnection = {
  __typename: "ModelStudentConnection",
  items:  Array<Student | null >,
  nextToken?: string | null,
};

export type Student = {
  __typename: "Student",
  id: string,
  name: string,
  email: string,
  status: string,
  room?: Room | null,
  createdAt: string,
  updatedAt: string,
  roomStudentId?: string | null,
};

export type UpdateTeacherInput = {
  id: string,
  name?: string | null,
  email?: string | null,
  teacherRoomId?: string | null,
};

export type DeleteTeacherInput = {
  id: string,
};

export type CreateRoomInput = {
  id?: string | null,
  name: string,
  code: string,
  roomTeacherId?: string | null,
};

export type ModelRoomConditionInput = {
  name?: ModelStringInput | null,
  code?: ModelStringInput | null,
  and?: Array< ModelRoomConditionInput | null > | null,
  or?: Array< ModelRoomConditionInput | null > | null,
  not?: ModelRoomConditionInput | null,
  roomTeacherId?: ModelIDInput | null,
};

export type UpdateRoomInput = {
  id: string,
  name?: string | null,
  code?: string | null,
  roomTeacherId?: string | null,
};

export type DeleteRoomInput = {
  id: string,
};

export type CreateStudentInput = {
  id?: string | null,
  name: string,
  email: string,
  status: string,
  roomStudentId?: string | null,
};

export type ModelStudentConditionInput = {
  name?: ModelStringInput | null,
  email?: ModelStringInput | null,
  status?: ModelStringInput | null,
  and?: Array< ModelStudentConditionInput | null > | null,
  or?: Array< ModelStudentConditionInput | null > | null,
  not?: ModelStudentConditionInput | null,
  roomStudentId?: ModelIDInput | null,
};

export type UpdateStudentInput = {
  id: string,
  name?: string | null,
  email?: string | null,
  status?: string | null,
  roomStudentId?: string | null,
};

export type DeleteStudentInput = {
  id: string,
};

export type ModelStudentFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  email?: ModelStringInput | null,
  status?: ModelStringInput | null,
  and?: Array< ModelStudentFilterInput | null > | null,
  or?: Array< ModelStudentFilterInput | null > | null,
  not?: ModelStudentFilterInput | null,
  roomStudentId?: ModelIDInput | null,
};

export type ModelTeacherFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  email?: ModelStringInput | null,
  and?: Array< ModelTeacherFilterInput | null > | null,
  or?: Array< ModelTeacherFilterInput | null > | null,
  not?: ModelTeacherFilterInput | null,
  teacherRoomId?: ModelIDInput | null,
};

export type ModelTeacherConnection = {
  __typename: "ModelTeacherConnection",
  items:  Array<Teacher | null >,
  nextToken?: string | null,
};

export type ModelRoomFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  code?: ModelStringInput | null,
  and?: Array< ModelRoomFilterInput | null > | null,
  or?: Array< ModelRoomFilterInput | null > | null,
  not?: ModelRoomFilterInput | null,
  roomTeacherId?: ModelIDInput | null,
};

export type ModelRoomConnection = {
  __typename: "ModelRoomConnection",
  items:  Array<Room | null >,
  nextToken?: string | null,
};

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC",
}


export type ModelSubscriptionStudentFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  name?: ModelSubscriptionStringInput | null,
  email?: ModelSubscriptionStringInput | null,
  status?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionStudentFilterInput | null > | null,
  or?: Array< ModelSubscriptionStudentFilterInput | null > | null,
};

export type ModelSubscriptionIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionTeacherFilterInput = {
  name?: ModelSubscriptionStringInput | null,
  email?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionTeacherFilterInput | null > | null,
  or?: Array< ModelSubscriptionTeacherFilterInput | null > | null,
};

export type ModelSubscriptionRoomFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  name?: ModelSubscriptionStringInput | null,
  code?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionRoomFilterInput | null > | null,
  or?: Array< ModelSubscriptionRoomFilterInput | null > | null,
};

export type CreateTeacherMutationVariables = {
  input: CreateTeacherInput,
  condition?: ModelTeacherConditionInput | null,
};

export type CreateTeacherMutation = {
  createTeacher?:  {
    __typename: "Teacher",
    id: string,
    name: string,
    email?: string | null,
    room?:  {
      __typename: "Room",
      id: string,
      name: string,
      teacher?:  {
        __typename: "Teacher",
        id: string,
        name: string,
        email?: string | null,
        createdAt: string,
        updatedAt: string,
        teacherRoomId?: string | null,
      } | null,
      student?:  {
        __typename: "ModelStudentConnection",
        nextToken?: string | null,
      } | null,
      code: string,
      createdAt: string,
      updatedAt: string,
      roomTeacherId?: string | null,
      owner?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    teacherRoomId?: string | null,
  } | null,
};

export type UpdateTeacherMutationVariables = {
  input: UpdateTeacherInput,
  condition?: ModelTeacherConditionInput | null,
};

export type UpdateTeacherMutation = {
  updateTeacher?:  {
    __typename: "Teacher",
    id: string,
    name: string,
    email?: string | null,
    room?:  {
      __typename: "Room",
      id: string,
      name: string,
      teacher?:  {
        __typename: "Teacher",
        id: string,
        name: string,
        email?: string | null,
        createdAt: string,
        updatedAt: string,
        teacherRoomId?: string | null,
      } | null,
      student?:  {
        __typename: "ModelStudentConnection",
        nextToken?: string | null,
      } | null,
      code: string,
      createdAt: string,
      updatedAt: string,
      roomTeacherId?: string | null,
      owner?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    teacherRoomId?: string | null,
  } | null,
};

export type DeleteTeacherMutationVariables = {
  input: DeleteTeacherInput,
  condition?: ModelTeacherConditionInput | null,
};

export type DeleteTeacherMutation = {
  deleteTeacher?:  {
    __typename: "Teacher",
    id: string,
    name: string,
    email?: string | null,
    room?:  {
      __typename: "Room",
      id: string,
      name: string,
      teacher?:  {
        __typename: "Teacher",
        id: string,
        name: string,
        email?: string | null,
        createdAt: string,
        updatedAt: string,
        teacherRoomId?: string | null,
      } | null,
      student?:  {
        __typename: "ModelStudentConnection",
        nextToken?: string | null,
      } | null,
      code: string,
      createdAt: string,
      updatedAt: string,
      roomTeacherId?: string | null,
      owner?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    teacherRoomId?: string | null,
  } | null,
};

export type CreateRoomMutationVariables = {
  input: CreateRoomInput,
  condition?: ModelRoomConditionInput | null,
};

export type CreateRoomMutation = {
  createRoom?:  {
    __typename: "Room",
    id: string,
    name: string,
    teacher?:  {
      __typename: "Teacher",
      id: string,
      name: string,
      email?: string | null,
      room?:  {
        __typename: "Room",
        id: string,
        name: string,
        code: string,
        createdAt: string,
        updatedAt: string,
        roomTeacherId?: string | null,
        owner?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      teacherRoomId?: string | null,
    } | null,
    student?:  {
      __typename: "ModelStudentConnection",
      items:  Array< {
        __typename: "Student",
        id: string,
        name: string,
        email: string,
        status: string,
        createdAt: string,
        updatedAt: string,
        roomStudentId?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    code: string,
    createdAt: string,
    updatedAt: string,
    roomTeacherId?: string | null,
    owner?: string | null,
  } | null,
};

export type UpdateRoomMutationVariables = {
  input: UpdateRoomInput,
  condition?: ModelRoomConditionInput | null,
};

export type UpdateRoomMutation = {
  updateRoom?:  {
    __typename: "Room",
    id: string,
    name: string,
    teacher?:  {
      __typename: "Teacher",
      id: string,
      name: string,
      email?: string | null,
      room?:  {
        __typename: "Room",
        id: string,
        name: string,
        code: string,
        createdAt: string,
        updatedAt: string,
        roomTeacherId?: string | null,
        owner?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      teacherRoomId?: string | null,
    } | null,
    student?:  {
      __typename: "ModelStudentConnection",
      items:  Array< {
        __typename: "Student",
        id: string,
        name: string,
        email: string,
        status: string,
        createdAt: string,
        updatedAt: string,
        roomStudentId?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    code: string,
    createdAt: string,
    updatedAt: string,
    roomTeacherId?: string | null,
    owner?: string | null,
  } | null,
};

export type DeleteRoomMutationVariables = {
  input: DeleteRoomInput,
  condition?: ModelRoomConditionInput | null,
};

export type DeleteRoomMutation = {
  deleteRoom?:  {
    __typename: "Room",
    id: string,
    name: string,
    teacher?:  {
      __typename: "Teacher",
      id: string,
      name: string,
      email?: string | null,
      room?:  {
        __typename: "Room",
        id: string,
        name: string,
        code: string,
        createdAt: string,
        updatedAt: string,
        roomTeacherId?: string | null,
        owner?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      teacherRoomId?: string | null,
    } | null,
    student?:  {
      __typename: "ModelStudentConnection",
      items:  Array< {
        __typename: "Student",
        id: string,
        name: string,
        email: string,
        status: string,
        createdAt: string,
        updatedAt: string,
        roomStudentId?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    code: string,
    createdAt: string,
    updatedAt: string,
    roomTeacherId?: string | null,
    owner?: string | null,
  } | null,
};

export type CreateStudentMutationVariables = {
  input: CreateStudentInput,
  condition?: ModelStudentConditionInput | null,
};

export type CreateStudentMutation = {
  createStudent?:  {
    __typename: "Student",
    id: string,
    name: string,
    email: string,
    status: string,
    room?:  {
      __typename: "Room",
      id: string,
      name: string,
      teacher?:  {
        __typename: "Teacher",
        id: string,
        name: string,
        email?: string | null,
        createdAt: string,
        updatedAt: string,
        teacherRoomId?: string | null,
      } | null,
      student?:  {
        __typename: "ModelStudentConnection",
        nextToken?: string | null,
      } | null,
      code: string,
      createdAt: string,
      updatedAt: string,
      roomTeacherId?: string | null,
      owner?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    roomStudentId?: string | null,
  } | null,
};

export type UpdateStudentMutationVariables = {
  input: UpdateStudentInput,
  condition?: ModelStudentConditionInput | null,
};

export type UpdateStudentMutation = {
  updateStudent?:  {
    __typename: "Student",
    id: string,
    name: string,
    email: string,
    status: string,
    room?:  {
      __typename: "Room",
      id: string,
      name: string,
      teacher?:  {
        __typename: "Teacher",
        id: string,
        name: string,
        email?: string | null,
        createdAt: string,
        updatedAt: string,
        teacherRoomId?: string | null,
      } | null,
      student?:  {
        __typename: "ModelStudentConnection",
        nextToken?: string | null,
      } | null,
      code: string,
      createdAt: string,
      updatedAt: string,
      roomTeacherId?: string | null,
      owner?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    roomStudentId?: string | null,
  } | null,
};

export type DeleteStudentMutationVariables = {
  input: DeleteStudentInput,
  condition?: ModelStudentConditionInput | null,
};

export type DeleteStudentMutation = {
  deleteStudent?:  {
    __typename: "Student",
    id: string,
    name: string,
    email: string,
    status: string,
    room?:  {
      __typename: "Room",
      id: string,
      name: string,
      teacher?:  {
        __typename: "Teacher",
        id: string,
        name: string,
        email?: string | null,
        createdAt: string,
        updatedAt: string,
        teacherRoomId?: string | null,
      } | null,
      student?:  {
        __typename: "ModelStudentConnection",
        nextToken?: string | null,
      } | null,
      code: string,
      createdAt: string,
      updatedAt: string,
      roomTeacherId?: string | null,
      owner?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    roomStudentId?: string | null,
  } | null,
};

export type ListStudentsQueryVariables = {
  filter?: ModelStudentFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListStudentsQuery = {
  listStudents?:  {
    __typename: "ModelStudentConnection",
    items:  Array< {
      __typename: "Student",
      id: string,
      name: string,
      email: string,
      status: string,
      room?:  {
        __typename: "Room",
        id: string,
        name: string,
        code: string,
        createdAt: string,
        updatedAt: string,
        roomTeacherId?: string | null,
        owner?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      roomStudentId?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetTeacherQueryVariables = {
  id: string,
};

export type GetTeacherQuery = {
  getTeacher?:  {
    __typename: "Teacher",
    id: string,
    name: string,
    email?: string | null,
    room?:  {
      __typename: "Room",
      id: string,
      name: string,
      teacher?:  {
        __typename: "Teacher",
        id: string,
        name: string,
        email?: string | null,
        createdAt: string,
        updatedAt: string,
        teacherRoomId?: string | null,
      } | null,
      student?:  {
        __typename: "ModelStudentConnection",
        nextToken?: string | null,
      } | null,
      code: string,
      createdAt: string,
      updatedAt: string,
      roomTeacherId?: string | null,
      owner?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    teacherRoomId?: string | null,
  } | null,
};

export type ListTeachersQueryVariables = {
  filter?: ModelTeacherFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListTeachersQuery = {
  listTeachers?:  {
    __typename: "ModelTeacherConnection",
    items:  Array< {
      __typename: "Teacher",
      id: string,
      name: string,
      email?: string | null,
      room?:  {
        __typename: "Room",
        id: string,
        name: string,
        code: string,
        createdAt: string,
        updatedAt: string,
        roomTeacherId?: string | null,
        owner?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      teacherRoomId?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetStudentQueryVariables = {
  id: string,
};

export type GetStudentQuery = {
  getStudent?:  {
    __typename: "Student",
    id: string,
    name: string,
    email: string,
    status: string,
    room?:  {
      __typename: "Room",
      id: string,
      name: string,
      teacher?:  {
        __typename: "Teacher",
        id: string,
        name: string,
        email?: string | null,
        createdAt: string,
        updatedAt: string,
        teacherRoomId?: string | null,
      } | null,
      student?:  {
        __typename: "ModelStudentConnection",
        nextToken?: string | null,
      } | null,
      code: string,
      createdAt: string,
      updatedAt: string,
      roomTeacherId?: string | null,
      owner?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    roomStudentId?: string | null,
  } | null,
};

export type GetRoomQueryVariables = {
  id: string,
};

export type GetRoomQuery = {
  getRoom?:  {
    __typename: "Room",
    id: string,
    name: string,
    teacher?:  {
      __typename: "Teacher",
      id: string,
      name: string,
      email?: string | null,
      room?:  {
        __typename: "Room",
        id: string,
        name: string,
        code: string,
        createdAt: string,
        updatedAt: string,
        roomTeacherId?: string | null,
        owner?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      teacherRoomId?: string | null,
    } | null,
    student?:  {
      __typename: "ModelStudentConnection",
      items:  Array< {
        __typename: "Student",
        id: string,
        name: string,
        email: string,
        status: string,
        createdAt: string,
        updatedAt: string,
        roomStudentId?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    code: string,
    createdAt: string,
    updatedAt: string,
    roomTeacherId?: string | null,
    owner?: string | null,
  } | null,
};

export type ListRoomsQueryVariables = {
  filter?: ModelRoomFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListRoomsQuery = {
  listRooms?:  {
    __typename: "ModelRoomConnection",
    items:  Array< {
      __typename: "Room",
      id: string,
      name: string,
      teacher?:  {
        __typename: "Teacher",
        id: string,
        name: string,
        email?: string | null,
        createdAt: string,
        updatedAt: string,
        teacherRoomId?: string | null,
      } | null,
      student?:  {
        __typename: "ModelStudentConnection",
        nextToken?: string | null,
      } | null,
      code: string,
      createdAt: string,
      updatedAt: string,
      roomTeacherId?: string | null,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetRoomByCodeQueryVariables = {
  code: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelRoomFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type GetRoomByCodeQuery = {
  getRoomByCode?:  {
    __typename: "ModelRoomConnection",
    items:  Array< {
      __typename: "Room",
      id: string,
      name: string,
      teacher?:  {
        __typename: "Teacher",
        id: string,
        name: string,
        email?: string | null,
        createdAt: string,
        updatedAt: string,
        teacherRoomId?: string | null,
      } | null,
      student?:  {
        __typename: "ModelStudentConnection",
        nextToken?: string | null,
      } | null,
      code: string,
      createdAt: string,
      updatedAt: string,
      roomTeacherId?: string | null,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type OnCreateStudentSubscriptionVariables = {
  filter?: ModelSubscriptionStudentFilterInput | null,
};

export type OnCreateStudentSubscription = {
  onCreateStudent?:  {
    __typename: "Student",
    id: string,
    name: string,
    email: string,
    status: string,
    room?:  {
      __typename: "Room",
      id: string,
      name: string,
      teacher?:  {
        __typename: "Teacher",
        id: string,
        name: string,
        email?: string | null,
        createdAt: string,
        updatedAt: string,
        teacherRoomId?: string | null,
      } | null,
      student?:  {
        __typename: "ModelStudentConnection",
        nextToken?: string | null,
      } | null,
      code: string,
      createdAt: string,
      updatedAt: string,
      roomTeacherId?: string | null,
      owner?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    roomStudentId?: string | null,
  } | null,
};

export type OnUpdateStudentSubscriptionVariables = {
  filter?: ModelSubscriptionStudentFilterInput | null,
};

export type OnUpdateStudentSubscription = {
  onUpdateStudent?:  {
    __typename: "Student",
    id: string,
    name: string,
    email: string,
    status: string,
    room?:  {
      __typename: "Room",
      id: string,
      name: string,
      teacher?:  {
        __typename: "Teacher",
        id: string,
        name: string,
        email?: string | null,
        createdAt: string,
        updatedAt: string,
        teacherRoomId?: string | null,
      } | null,
      student?:  {
        __typename: "ModelStudentConnection",
        nextToken?: string | null,
      } | null,
      code: string,
      createdAt: string,
      updatedAt: string,
      roomTeacherId?: string | null,
      owner?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    roomStudentId?: string | null,
  } | null,
};

export type OnDeleteStudentSubscriptionVariables = {
  filter?: ModelSubscriptionStudentFilterInput | null,
};

export type OnDeleteStudentSubscription = {
  onDeleteStudent?:  {
    __typename: "Student",
    id: string,
    name: string,
    email: string,
    status: string,
    room?:  {
      __typename: "Room",
      id: string,
      name: string,
      teacher?:  {
        __typename: "Teacher",
        id: string,
        name: string,
        email?: string | null,
        createdAt: string,
        updatedAt: string,
        teacherRoomId?: string | null,
      } | null,
      student?:  {
        __typename: "ModelStudentConnection",
        nextToken?: string | null,
      } | null,
      code: string,
      createdAt: string,
      updatedAt: string,
      roomTeacherId?: string | null,
      owner?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    roomStudentId?: string | null,
  } | null,
};

export type OnCreateTeacherSubscriptionVariables = {
  filter?: ModelSubscriptionTeacherFilterInput | null,
  id?: string | null,
};

export type OnCreateTeacherSubscription = {
  onCreateTeacher?:  {
    __typename: "Teacher",
    id: string,
    name: string,
    email?: string | null,
    room?:  {
      __typename: "Room",
      id: string,
      name: string,
      teacher?:  {
        __typename: "Teacher",
        id: string,
        name: string,
        email?: string | null,
        createdAt: string,
        updatedAt: string,
        teacherRoomId?: string | null,
      } | null,
      student?:  {
        __typename: "ModelStudentConnection",
        nextToken?: string | null,
      } | null,
      code: string,
      createdAt: string,
      updatedAt: string,
      roomTeacherId?: string | null,
      owner?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    teacherRoomId?: string | null,
  } | null,
};

export type OnUpdateTeacherSubscriptionVariables = {
  filter?: ModelSubscriptionTeacherFilterInput | null,
  id?: string | null,
};

export type OnUpdateTeacherSubscription = {
  onUpdateTeacher?:  {
    __typename: "Teacher",
    id: string,
    name: string,
    email?: string | null,
    room?:  {
      __typename: "Room",
      id: string,
      name: string,
      teacher?:  {
        __typename: "Teacher",
        id: string,
        name: string,
        email?: string | null,
        createdAt: string,
        updatedAt: string,
        teacherRoomId?: string | null,
      } | null,
      student?:  {
        __typename: "ModelStudentConnection",
        nextToken?: string | null,
      } | null,
      code: string,
      createdAt: string,
      updatedAt: string,
      roomTeacherId?: string | null,
      owner?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    teacherRoomId?: string | null,
  } | null,
};

export type OnDeleteTeacherSubscriptionVariables = {
  filter?: ModelSubscriptionTeacherFilterInput | null,
  id?: string | null,
};

export type OnDeleteTeacherSubscription = {
  onDeleteTeacher?:  {
    __typename: "Teacher",
    id: string,
    name: string,
    email?: string | null,
    room?:  {
      __typename: "Room",
      id: string,
      name: string,
      teacher?:  {
        __typename: "Teacher",
        id: string,
        name: string,
        email?: string | null,
        createdAt: string,
        updatedAt: string,
        teacherRoomId?: string | null,
      } | null,
      student?:  {
        __typename: "ModelStudentConnection",
        nextToken?: string | null,
      } | null,
      code: string,
      createdAt: string,
      updatedAt: string,
      roomTeacherId?: string | null,
      owner?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    teacherRoomId?: string | null,
  } | null,
};

export type OnCreateRoomSubscriptionVariables = {
  filter?: ModelSubscriptionRoomFilterInput | null,
  owner?: string | null,
};

export type OnCreateRoomSubscription = {
  onCreateRoom?:  {
    __typename: "Room",
    id: string,
    name: string,
    teacher?:  {
      __typename: "Teacher",
      id: string,
      name: string,
      email?: string | null,
      room?:  {
        __typename: "Room",
        id: string,
        name: string,
        code: string,
        createdAt: string,
        updatedAt: string,
        roomTeacherId?: string | null,
        owner?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      teacherRoomId?: string | null,
    } | null,
    student?:  {
      __typename: "ModelStudentConnection",
      items:  Array< {
        __typename: "Student",
        id: string,
        name: string,
        email: string,
        status: string,
        createdAt: string,
        updatedAt: string,
        roomStudentId?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    code: string,
    createdAt: string,
    updatedAt: string,
    roomTeacherId?: string | null,
    owner?: string | null,
  } | null,
};

export type OnUpdateRoomSubscriptionVariables = {
  filter?: ModelSubscriptionRoomFilterInput | null,
  owner?: string | null,
};

export type OnUpdateRoomSubscription = {
  onUpdateRoom?:  {
    __typename: "Room",
    id: string,
    name: string,
    teacher?:  {
      __typename: "Teacher",
      id: string,
      name: string,
      email?: string | null,
      room?:  {
        __typename: "Room",
        id: string,
        name: string,
        code: string,
        createdAt: string,
        updatedAt: string,
        roomTeacherId?: string | null,
        owner?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      teacherRoomId?: string | null,
    } | null,
    student?:  {
      __typename: "ModelStudentConnection",
      items:  Array< {
        __typename: "Student",
        id: string,
        name: string,
        email: string,
        status: string,
        createdAt: string,
        updatedAt: string,
        roomStudentId?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    code: string,
    createdAt: string,
    updatedAt: string,
    roomTeacherId?: string | null,
    owner?: string | null,
  } | null,
};

export type OnDeleteRoomSubscriptionVariables = {
  filter?: ModelSubscriptionRoomFilterInput | null,
  owner?: string | null,
};

export type OnDeleteRoomSubscription = {
  onDeleteRoom?:  {
    __typename: "Room",
    id: string,
    name: string,
    teacher?:  {
      __typename: "Teacher",
      id: string,
      name: string,
      email?: string | null,
      room?:  {
        __typename: "Room",
        id: string,
        name: string,
        code: string,
        createdAt: string,
        updatedAt: string,
        roomTeacherId?: string | null,
        owner?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      teacherRoomId?: string | null,
    } | null,
    student?:  {
      __typename: "ModelStudentConnection",
      items:  Array< {
        __typename: "Student",
        id: string,
        name: string,
        email: string,
        status: string,
        createdAt: string,
        updatedAt: string,
        roomStudentId?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    code: string,
    createdAt: string,
    updatedAt: string,
    roomTeacherId?: string | null,
    owner?: string | null,
  } | null,
};
