/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getStudent = /* GraphQL */ `
  query GetStudent($id: ID!) {
    getStudent(id: $id) {
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
export const listStudents = /* GraphQL */ `
  query ListStudents(
    $filter: ModelStudentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listStudents(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        status
        room {
          id
          code
          createdAt
          updatedAt
          roomTeacherId
        }
        createdAt
        updatedAt
        roomStudentId
      }
      nextToken
    }
  }
`;
export const getTeacher = /* GraphQL */ `
  query GetTeacher($id: ID!) {
    getTeacher(id: $id) {
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
export const listTeachers = /* GraphQL */ `
  query ListTeachers(
    $filter: ModelTeacherFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTeachers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getRoom = /* GraphQL */ `
  query GetRoom($id: ID!) {
    getRoom(id: $id) {
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
export const listRooms = /* GraphQL */ `
  query ListRooms(
    $filter: ModelRoomFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listRooms(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
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
      nextToken
    }
  }
`;
