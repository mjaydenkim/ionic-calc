/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createStudent = /* GraphQL */ `
  mutation CreateStudent(
    $input: CreateStudentInput!
    $condition: ModelStudentConditionInput
  ) {
    createStudent(input: $input, condition: $condition) {
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
export const updateStudent = /* GraphQL */ `
  mutation UpdateStudent(
    $input: UpdateStudentInput!
    $condition: ModelStudentConditionInput
  ) {
    updateStudent(input: $input, condition: $condition) {
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
export const deleteStudent = /* GraphQL */ `
  mutation DeleteStudent(
    $input: DeleteStudentInput!
    $condition: ModelStudentConditionInput
  ) {
    deleteStudent(input: $input, condition: $condition) {
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
export const createTeacher = /* GraphQL */ `
  mutation CreateTeacher(
    $input: CreateTeacherInput!
    $condition: ModelTeacherConditionInput
  ) {
    createTeacher(input: $input, condition: $condition) {
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
export const updateTeacher = /* GraphQL */ `
  mutation UpdateTeacher(
    $input: UpdateTeacherInput!
    $condition: ModelTeacherConditionInput
  ) {
    updateTeacher(input: $input, condition: $condition) {
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
export const deleteTeacher = /* GraphQL */ `
  mutation DeleteTeacher(
    $input: DeleteTeacherInput!
    $condition: ModelTeacherConditionInput
  ) {
    deleteTeacher(input: $input, condition: $condition) {
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
export const createRoom = /* GraphQL */ `
  mutation CreateRoom(
    $input: CreateRoomInput!
    $condition: ModelRoomConditionInput
  ) {
    createRoom(input: $input, condition: $condition) {
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
export const updateRoom = /* GraphQL */ `
  mutation UpdateRoom(
    $input: UpdateRoomInput!
    $condition: ModelRoomConditionInput
  ) {
    updateRoom(input: $input, condition: $condition) {
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
export const deleteRoom = /* GraphQL */ `
  mutation DeleteRoom(
    $input: DeleteRoomInput!
    $condition: ModelRoomConditionInput
  ) {
    deleteRoom(input: $input, condition: $condition) {
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
