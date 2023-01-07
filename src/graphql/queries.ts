/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

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
        email
        status
        history
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
        nextToken
      }
      createdAt
      updatedAt
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
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getStudent = /* GraphQL */ `
  query GetStudent($id: ID!) {
    getStudent(id: $id) {
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
      createdAt
      updatedAt
      roomStudentId
    }
  }
`;
export const getRoom = /* GraphQL */ `
  query GetRoom($id: ID!) {
    getRoom(id: $id) {
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
          # teacherRoomId
        }
        student {
          items {
            id
            name
            email
            history
            status
            createdAt
            updatedAt
          }
        }
        code
        createdAt
        updatedAt
        teacherRoomId
      }
      nextToken
    }
  }
`;
export const getRoomByCode = /* GraphQL */ `
  query GetRoomByCode(
    $code: String!
    $sortDirection: ModelSortDirection
    $filter: ModelRoomFilterInput
    $limit: Int
    $nextToken: String
  ) {
    getRoomByCode(
      code: $code
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        name
        code
        createdAt
        updatedAt
        teacherRoomId
      }
      nextToken
    }
  }
`;
