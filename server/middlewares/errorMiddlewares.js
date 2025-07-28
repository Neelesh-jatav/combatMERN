class ErrorHandler extends Error {
    constructor(message, statusCode){
        super(message);
        this.statusCode = statusCode;
    }
}

export const errorMiddlewares =(err, req, res, next) =>{
    err.message = err.message || "Internal Server Error";
    err.statusCode = err.statusCode || 500;

    if(err.code === 11000){
        const statusCode = 400;
        const message = `Duplicate Field Value Entered`; // to prevent duplicate entries
        err = new ErrorHandler(message, statusCode);
    }

    if(err.name === "JsonWebTokenError"){
        const statusCode = 400;
        const message = `Json Web Token is invalid, try again`; // to prevent invalid token
        err = new ErrorHandler(message, statusCode);
    }

    if(err.name === "TokenExpiredError"){
        const statusCode = 400;
        const message = `Json Web Token is expired, try again`; // to prevent expired token
        err = new ErrorHandler(message, statusCode);
    }
    
    if(err.name === "CastError"){
        const statusCode = 400;
        const message = `Resource not found. Invalid: ${err.path}`; // to prevent invalid resource
        err = new ErrorHandler(message, statusCode);
    }
    // console.log(err); use it to find error and status code
    
    const errorMessage = err.errors
        ? Object.values(err.errors)
            .map((value) => value.message)
            .join(" ")
        : err.message;

    return res.status(err.statusCode).json({
        success: false,
        message: errorMessage,
    });
};

export default ErrorHandler;