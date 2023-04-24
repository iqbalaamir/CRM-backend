exports.userResponse = (users) => {

    userResult = [];

    users.forEach(user => {
        userResult.push({
            id : user._id,
            name : user.name,
            userId : user.userId,
            email : user.email,
            userType : user.userType,
            userStatus : user.userStatus
        });
    });
    return userResult;
}