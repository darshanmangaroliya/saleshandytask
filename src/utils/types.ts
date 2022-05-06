export type ErrorResponse = {
    errorType: ErrorType;
    errorMessage: string;
    errors: string[] | null;
    errorRaw: any;
    errorsValidation: ErrorValidation[] | null;
    stack?: string;
  };
  
  export type ErrorType = 'General' | 'Raw'  ;
  
  export type ErrorValidation = { [key: string]: string };