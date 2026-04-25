const User = require("../models/user.model");

export const register = async (req, res) => {
    try {
        const {name,email, password} = req.body;

        const existingUser = await User.findOne({email});
        if(existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        await User.create({
            name,
            email,
            password: hashedPassword,
        });

        return res.status(201).json({
            success: true,
            message: "User registered successfully"
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: error.message
        })
    }
}


export const login = async (req, res) => {
    try {
        const {email, password} = req.body;

        const user = await User.findOne({email});
        if(!user) {
            return res.status(401).json({
                success: false,
                message: "User is not registered. Please regsiter"
            })
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)
        if(!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials"
            })
        }

        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.status(200).json({
            success: true,
            message: "User logged in successfully",
            token,
            user
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: error.message
        })
    }
}