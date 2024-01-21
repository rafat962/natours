const nodemailer = require('nodemailer')


exports.sendmailWelcom = async options =>{
    const transporter = nodemailer.createTransport({
        host:process.env.EMAIL_HOST,
        port:process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD,
        },
    })
    mailOption = {
        to: options.email,
        from: 'rafat kamel mohamed',
        subject: 'Welcome to Our Community!',
        text: `Hello ${options.username || 'Pro'},\n\nThank you for signing up! We're thrilled to welcome you to our community. Get ready for an exciting journey ahead.\n\nBest regards,\nRafat Kamel Mohamed`
    }
    
    await transporter.sendMail(mailOption)
}

exports.sendmailreset = async options =>{
    const transporter = nodemailer.createTransport({
        host:process.env.EMAIL_HOST,
        port:process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD,
        },
    })
    mailOption = {
        to: options.email,
        from: 'rafat kamel mohamed',
        subject: 'Reset Password',
        text: `You can reset your password from here: http://127.0.0.1:8000/api/v1/users/resetPassword2/${options.token}`
    }
    
    await transporter.sendMail(mailOption)
}
