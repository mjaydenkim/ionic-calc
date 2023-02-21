/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateStudent = /* GraphQL */ `
  subscription OnCreateStudent($filter: ModelSubscriptionStudentFilterInput) {
    onCreateStudent(filter: $filter) {
      id
      name
      email
      status
      history
      room {
        id
        name
        code
        createdAt
        updatedAt
        teacherRoomId
      }
      # roomId
      createdAt
      updatedAt
      roomStudentId
    }
  }
`;
export const onUpdateStudent = /* GraphQL */ `
  subscription OnUpdateStudent($filter: ModelSubscriptionStudentFilterInput) {
    onUpdateStudent(filter: $filter) {
      id
      name
      email
      status
      history
      room {
        id
        name
        code
        createdAt
        updatedAt
        teacherRoomId
      }
      roomId
      createdAt
      updatedAt
      roomStudentId
    }
  }
`;
export const onDeleteStudent = /* GraphQL */ `
  subscription OnDeleteStudent($filter: ModelSubscriptionStudentFilterInput) {
    onDeleteStudent(filter: $filter) {
      id
      name
      email
      status
      history
      room {
        id
        name
        code
        createdAt
        updatedAt
        teacherRoomId
      }
      roomId
      createdAt
      updatedAt
      roomStudentId
    }
  }
`;
export const onCreateTeacher = /* GraphQL */ `
  subscription OnCreateTeacher(
    $filter: ModelSubscriptionTeacherFilterInput
    $id: String
  ) {
    onCreateTeacher(filter: $filter, id: $id) {
      id
      name
      email
      room {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateTeacher = /* GraphQL */ `
  subscription OnUpdateTeacher(
    $filter: ModelSubscriptionTeacherFilterInput
    $id: String
  ) {
    onUpdateTeacher(filter: $filter, id: $id) {
      id
      name
      email
      room {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteTeacher = /* GraphQL */ `
  subscription OnDeleteTeacher(
    $filter: ModelSubscriptionTeacherFilterInput
    $id: String
  ) {
    onDeleteTeacher(filter: $filter, id: $id) {
      id
      name
      email
      room {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onCreateRoom = /* GraphQL */ `
  subscription OnCreateRoom($filter: ModelSubscriptionRoomFilterInput) {
    onCreateRoom(filter: $filter) {
      id
      name
      teacher {
        id
        name
        email
        createdAt
        updatedAt
      }
      student {
        nextToken
      }
      code
      createdAt
      updatedAt
      teacherRoomId
    }
  }
`;
export const onUpdateRoom = /* GraphQL */ `
  subscription OnUpdateRoom($filter: ModelSubscriptionRoomFilterInput) {
    onUpdateRoom(filter: $filter) {
      id
      name
      teacher {
        id
        name
        email
        createdAt
        updatedAt
      }
      student {
        nextToken
      }
      code
      createdAt
      updatedAt
      teacherRoomId
    }
  }
`;
export const onDeleteRoom = /* GraphQL */ `
  subscription OnDeleteRoom($filter: ModelSubscriptionRoomFilterInput) {
    onDeleteRoom(filter: $filter) {
      id
      name
      teacher {
        id
        name
        email
        createdAt
        updatedAt
      }
      student {
        nextToken
      }
      code
      createdAt
      updatedAt
      teacherRoomId
    }
  }
`;
