export class ResourceNotFoundError extends Error {
  constructor() {
    super('Resource not found!') // 'super' is a constructor method os class 'Error' and we can send the message of error inside his
  }
} // 'Error' is a native class of javascript
