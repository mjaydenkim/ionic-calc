/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

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
      createdAt
      updatedAt
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
      createdAt
      updatedAt
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
      createdAt
      updatedAt
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
      name
      teacher {
        id
        name
        email
        room {
          nextToken
        }
        createdAt
        updatedAt
      }
      student {
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
      code
      createdAt
      updatedAt
      teacherRoomId
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
      name
      teacher {
        id
        name
        email
        room {
          nextToken
        }
        createdAt
        updatedAt
      }
      student {
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
      code
      createdAt
      updatedAt
      teacherRoomId
    }
  }
`;
export const createStudent = /* GraphQL */ `
  mutation CreateStudent(
    $input: CreateStudentInput!
    $condition: ModelStudentConditionInput
  ) {
    createStudent(input: $input, condition: $condition) {
      id
      name
      email
      status
      history
      room {
        id
        name
        # teacher {
        #   id
        #   name
        #   email
        #   createdAt
        #   updatedAt
        # }
        student {
          nextToken
        }
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
export const updateStudent = /* GraphQL */ `
  mutation UpdateStudent(
    $input: UpdateStudentInput!
    $condition: ModelStudentConditionInput
  ) {
    updateStudent(input: $input, condition: $condition) {
      id
      name
      email
      status
      history
      room {
        id
        name
        # teacher {
        #   id
        #   name
        #   email
        #   createdAt
        #   updatedAt
        # }
        student {
          nextToken
        }
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
export const deleteStudent = /* GraphQL */ `
  mutation DeleteStudent(
    $input: DeleteStudentInput!
    $condition: ModelStudentConditionInput
  ) {
    deleteStudent(input: $input, condition: $condition) {
      id
      name
      email
      status
      history
      room {
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
      createdAt
      updatedAt
      roomStudentId
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
      name
      teacher {
        id
        name
        email
        room {
          nextToken
        }
        createdAt
        updatedAt
      }
      student {
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
      code
      createdAt
      updatedAt
      teacherRoomId
    }
  }
`;
