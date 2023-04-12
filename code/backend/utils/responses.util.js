exports.successResponse = (res, data, msg = "Success response") => {
    res.status(200).json({
        data: data,
        message: msg,
    });
};

exports.successfullyCreatedResponse = (
    res,
    data,
    msg = "Record created successfully."
) => {
    res.status(201).json({
        data: data,
        message: msg,
    });
};

exports.badRequestResponse = (res, error, msg = "Validation error") => {
    res.status(400).json({
        error: error,
        message: msg,
    });
};

exports.unauthorizedResponse = (res, msg = "Unauthorized") => {
    res.status(401).json({ message: msg });
};

exports.notFoundResponse = (res, msg = "Route Not Found") => {
    res.status(404).json({ message: msg });
};

exports.serverErrorResponse = (res, msg = "Server Error") => {
    res.status(500).json({ message: msg });
};
