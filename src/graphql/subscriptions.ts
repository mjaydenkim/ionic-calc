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
      room {
        id
        name
        teacher {
          id
          name
          email
          createdAt
          updatedAt
          teacherRoomId
          owner
        }
        student {
          nextToken
        }
        code
        createdAt
        updatedAt
        roomTeacherId
        owner
      }
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
      room {
        id
        name
        teacher {
          id
          name
          email
          createdAt
          updatedAt
          teacherRoomId
          owner
        }
        student {
          nextToken
        }
        code
        createdAt
        updatedAt
        roomTeacherId
        owner
      }
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
      room {
        id
        name
        teacher {
          id
          name
          email
          createdAt
          updatedAt
          teacherRoomId
          owner
        }
        student {
          nextToken
        }
        code
        createdAt
        updatedAt
        roomTeacherId
        owner
      }
      createdAt
      updatedAt
      roomStudentId
    }
  }
`;
export const onCreateTeacher = /* GraphQL */ `
  subscription OnCreateTeacher(
    $filter: ModelSubscriptionTeacherFilterInput
    $owner: String
  ) {
    onCreateTeacher(filter: $filter, owner: $owner) {
      id
      name
      email
      room {
        id
        name
        teacher {
          id
          name
          email
          createdAt
          updatedAt
          teacherRoomId
          owner
        }
        student {
          nextToken
        }
        code
        createdAt
        updatedAt
        roomTeacherId
        owner
      }
      createdAt
      updatedAt
      teacherRoomId
      owner
    }
  }
`;
export const onUpdateTeacher = /* GraphQL */ `
  subscription OnUpdateTeacher(
    $filter: ModelSubscriptionTeacherFilterInput
    $owner: String
  ) {
    onUpdateTeacher(filter: $filter, owner: $owner) {
      id
      name
      email
      room {
        id
        name
        teacher {
          id
          name
          email
          createdAt
          updatedAt
          teacherRoomId
          owner
        }
        student {
          nextToken
        }
        code
        createdAt
        updatedAt
        roomTeacherId
        owner
      }
      createdAt
      updatedAt
      teacherRoomId
      owner
    }
  }
`;
export const onDeleteTeacher = /* GraphQL */ `
  subscription OnDeleteTeacher(
    $filter: ModelSubscriptionTeacherFilterInput
    $owner: String
  ) {
    onDeleteTeacher(filter: $filter, owner: $owner) {
      id
      name
      email
      room {
        id
        name
        teacher {
          id
          name
          email
          createdAt
          updatedAt
          teacherRoomId
          owner
        }
        student {
          nextToken
        }
        code
        createdAt
        updatedAt
        roomTeacherId
        owner
      }
      createdAt
      updatedAt
      teacherRoomId
      owner
    }
  }
`;
export const onCreateRoom = /* GraphQL */ `
  subscription OnCreateRoom(
    $filter: ModelSubscriptionRoomFilterInput
    $owner: String
  ) {
    onCreateRoom(filter: $filter, owner: $owner) {
      id
      name
      teacher {
        id
        name
        email
        room {
          id
          name
          code
          createdAt
          updatedAt
          roomTeacherId
          owner
        }
        createdAt
        updatedAt
        teacherRoomId
        owner
      }
      student {
        items {
          id
          name
          email
          status
          createdAt
          updatedAt
          roomStudentId
        }
        nextToken
      }
      code
      createdAt
      updatedAt
      roomTeacherId
      owner
    }
  }
`;
export const onUpdateRoom = /* GraphQL */ `
  subscription OnUpdateRoom(
    $filter: ModelSubscriptionRoomFilterInput
    $owner: String
  ) {
    onUpdateRoom(filter: $filter, owner: $owner) {
      id
      name
      teacher {
        id
        name
        email
        room {
          id
          name
          code
          createdAt
          updatedAt
          roomTeacherId
          owner
        }
        createdAt
        updatedAt
        teacherRoomId
        owner
      }
      student {
        items {
          id
          name
          email
          status
          createdAt
          updatedAt
          roomStudentId
        }
        nextToken
      }
      code
      createdAt
      updatedAt
      roomTeacherId
      owner
    }
  }
`;
export const onDeleteRoom = /* GraphQL */ `
  subscription OnDeleteRoom(
    $filter: ModelSubscriptionRoomFilterInput
    $owner: String
  ) {
    onDeleteRoom(filter: $filter, owner: $owner) {
      id
      name
      teacher {
        id
        name
        email
        room {
          id
          name
          code
          createdAt
          updatedAt
          roomTeacherId
          owner
        }
        createdAt
        updatedAt
        teacherRoomId
        owner
      }
      student {
        items {
          id
          name
          email
          status
          createdAt
          updatedAt
          roomStudentId
        }
        nextToken
      }
      code
      createdAt
      updatedAt
      roomTeacherId
      owner
    }
  }
`;
