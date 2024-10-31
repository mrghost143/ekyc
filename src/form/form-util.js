export const handleFormSubmission = (success=true) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            success ? resolve("Operation was successful!") : reject("Operation failed.");
        }, 500);
    });
};