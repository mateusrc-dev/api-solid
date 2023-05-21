export class UserAlreadyExistsError extends Error {
  constructor() {
    super('E-mail already exists!') // 'super' is a constructor method os class 'Error' and we can send the message of error inside his
  }
} // 'Error' is a native class of javascript
