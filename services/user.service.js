class UserService {
    findOne = async (username) => {
        // // Validate if user exist in our database
        const user = await User.findOne({ email });
        return user
    }
}