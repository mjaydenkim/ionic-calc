/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateStudent = /* GraphQL */ `
  subscription OnCreateStudent($filter: ModelSubscriptionStudentFilterInput) {
    onCreateStudent(filter: $filter) {
      id
      name
      status
      room {
        id
        teacher {
          id
          name
          email
          createdAt
          updatedAt
          teacherRoomId
        }
        student {
          nextToken
        }
        code
        createdAt
        updatedAt
        roomTeacherId
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
      status
      room {
        id
        teacher {
          id
          name
          email
          createdAt
          updatedAt
          teacherRoomId
        }
        student {
          nextToken
        }
        code
        createdAt
        updatedAt
        roomTeacherId
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
      status
      room {
        id
        teacher {
          id
          name
          email
          createdAt
          updatedAt
          teacherRoomId
        }
        student {
          nextToken
        }
        code
        createdAt
        updatedAt
        roomTeacherId
      }
      createdAt
      updatedAt
      roomStudentId
    }
  }
`;
export const onCreateTeacher = /* GraphQL */ `
  subscription OnCreateTeacher($filter: ModelSubscriptionTeacherFilterInput) {
    onCreateTeacher(filter: $filter) {
      id
      name
      email
      room {
        id
        teacher {
          id
          name
          email
          createdAt
          updatedAt
          teacherRoomId
        }
        student {
          nextToken
        }
        code
        createdAt
        updatedAt
        roomTeacherId
      }
      createdAt
      updatedAt
      teacherRoomId
    }
  }
`;
export const onUpdateTeacher = /* GraphQL */ `
  subscription OnUpdateTeacher($filter: ModelSubscriptionTeacherFilterInput) {
    onUpdateTeacher(filter: $filter) {
      id
      name
      email
      room {
        id
        teacher {
          id
          name
          email
          createdAt
          updatedAt
          teacherRoomId
        }
        student {
          nextToken
        }
        code
        createdAt
        updatedAt
        roomTeacherId
      }
      createdAt
      updatedAt
      teacherRoomId
    }
  }
`;
export const onDeleteTeacher = /* GraphQL */ `
  subscription OnDeleteTeacher($filter: ModelSubscriptionTeacherFilterInput) {
    onDeleteTeacher(filter: $filter) {
      id
      name
      email
      room {
        id
        teacher {
          id
          name
          email
          createdAt
          updatedAt
          teacherRoomId
        }
        student {
          nextToken
        }
        code
        createdAt
        updatedAt
        roomTeacherId
      }
      createdAt
      updatedAt
      teacherRoomId
    }
  }
`;
export const onCreateRoom = /* GraphQL */ `
  subscription OnCreateRoom($filter: ModelSubscriptionRoomFilterInput) {
    onCreateRoom(filter: $filter) {
      id
      teacher {
        id
        name
        email
        room {
          id
          code
          createdAt
          updatedAt
          roomTeacherId
        }
        createdAt
        updatedAt
        teacherRoomId
      }
      student {
        items {
          id
          name
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
    }
  }
`;
export const onUpdateRoom = /* GraphQL */ `
  subscription OnUpdateRoom($filter: ModelSubscriptionRoomFilterInput) {
    onUpdateRoom(filter: $filter) {
      id
      teacher {
        id
        name
        email
        room {
          id
          code
          createdAt
          updatedAt
          roomTeacherId
        }
        createdAt
        updatedAt
        teacherRoomId
      }
      student {
        items {
          id
          name
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
    }
  }
`;
export const onDeleteRoom = /* GraphQL */ `
  subscription OnDeleteRoom($filter: ModelSubscriptionRoomFilterInput) {
    onDeleteRoom(filter: $filter) {
      id
      teacher {
        id
        name
        email
        room {
          id
          code
          createdAt
          updatedAt
          roomTeacherId
        }
        createdAt
        updatedAt
        teacherRoomId
      }
      student {
        items {
          id
          name
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
    }
  }
`;
