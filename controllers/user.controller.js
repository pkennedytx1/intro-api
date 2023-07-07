class User {
    login = () => {
        // Get user input
        const { email, password } = req.body;

        // Validate user input
        if (!(email && password)) {
            res.status(400).send("All input is required");
        }
        // // Validate if user exist in our database
        // const user = await User.findOne({ email });
        // call the findOne service

        // if (user && (await bcrypt.compare(password, user.password))) {
        //     // Create JWT token
        //     const token = jwt.sign(
        //         { user_id: user._id, email },
        //         process.env.TOKEN_KEY,
        //         { expiresIn: "2h"}
        //     );

        //     // Return token to client
        //     return res.status(200).json(token);
        // }
        // auth service
        // Return error when invalid
        return res.status(400).send("Invalid Credentials");
    }

    signup = () => {
        
    }
}

export default User;