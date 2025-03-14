
import { sendEmail } from "./emailService.js";

async function  sendEmailFun (content) {
    // console.log("kkkkkkkkkkkkkkk", content);
    const result = await sendEmail(content);

    if (result.success) {
        return true;
        // res.status(200).json({ message: 'Email sent successfully', message });
    } else {
        return false;
        // res.status(500).json({ message: 'Failed to send email', error });
    }
}

export default sendEmailFun;
