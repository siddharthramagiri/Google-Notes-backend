const errorhandle = (err,req,res,next) => {
    // console.log(res.statusCode)
    if(res.statusCode) {
        statusCode = res.statusCode;
    } else {
        statusCode = 500;
    }

    console.error(err.message);

    if (res.headersSent) {
        return next(err);
    }
    
    // const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
    res.status(statusCode).json({
        success: false,
        message: err.message

    });

    next();

    // switch (res.statusCode) {
    //     case 400 :
    //         res.json( { 
    //             title : "Validation Failed" ,
    //             message : err.message,
    //             stackTrace : err.stack,
    //             success : false, 
    //         } );
    //     case 401:
    //         res.json( { 
    //             title : "UNAUTHORIZED" ,
    //             message : err.message,
    //             stackTrace : err.stack,
    //             success : false,
    //         } );
    //     case 403:
    //         res.json( { 
    //             title : "FORBIDDEN" ,
    //             message : err.message,
    //             stackTrace : err.stack,
    //             success : false,
    //         } );
    //     case 404:
    //         res.json( { 
    //             title : "Not Found" ,
    //             message : err.message,
    //             stackTrace : err.stack,
    //             success : false,
    //         } );
    //     default:
    //         break;
    // };
    // next();
}

module.exports = errorhandle;