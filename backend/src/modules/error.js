
function formatError(statusCode, message){
    class error {
        constructor(code, message) {
            this.code = code;
            this.message = message;
        }

    }
    return new error(statusCode, message);
}

module.exports = formatError;
