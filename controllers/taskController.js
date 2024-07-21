import taskModel from "../models/taskModel.js";
import userModel from "../models/userModel.js";
import { createTransport } from 'nodemailer';
import dotenv from "dotenv";
dotenv.config();

const sendMail = (email, subject, title, description) => {
    const transporter = createTransport({
        service: 'gmail',
        auth: {
            user: process.env.GMAIL_USERNAME,
            pass: process.env.GMAIL_PASSWORD
        }
    });

    const mailOptions = {
        from: process.env.GMAIL_USERNAME, // Use environment variable here
        to: email,
        subject: subject,
        html: `<h1>Task added successfully</h1><h2>Title: ${title}</h2><h3>Description: ${description}</h3>`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

const addTask = async (req, res) => {
    const { title, description } = req.body;
    const userId = req.user.id;
    try {
        const user = await userModel.findById(userId);
        const newTask = new taskModel({ title, description, completed: false, userId });
        await newTask.save();
        sendMail(user.email, "Task Added", title, description);
        res.status(200).json({ message: "Task added successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const removeTask = async (req, res) => {
    const { id } = req.params; // Changed to req.params for consistency with Express DELETE method
    try {
        await taskModel.findByIdAndDelete(id);
        res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getTask = async (req, res) => {
    try {
        const tasks = await taskModel.find({ userId: req.user.id });
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export { addTask, getTask, removeTask }
