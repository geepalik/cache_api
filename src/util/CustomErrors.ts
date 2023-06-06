export class CustomErrors extends Error {  
    
    status: number;

    originalMessage: string;

    constructor (message: string, originalMessage: string, statusCode: number) {
      super(message);
  
      // assign the error class name in your custom error (as a shortcut)
      this.name = this.constructor.name
  
      // capturing the stack trace keeps the reference to your error class
      Error.captureStackTrace(this, this.constructor);
  
      this.status = statusCode;
      this.originalMessage = originalMessage;
    }

    get statusCode() {
        return this.status;
    }
}