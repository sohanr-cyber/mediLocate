import { GMAIL, PASSWORD } from '@/config'
import { template } from '@/utility/mail'
import axios from 'axios'
import nodemailer from 'nodemailer'
const from = process.env.FROM

class Message {
    async sendMessage(data) {
        console.log(data)
        const { number, message } = data
        if (!number || !message) {

            return "Missing Number Or Message"
        }
        try {
            const apiUrl = "http://bulksmsbd.net/api/smsapi";

            const payload = {
                api_key: "uO3NSjUcD0xmKkPwu4Rx",
                senderid: "8809617626452",
                number,
                message,
            };
            console.log("A message going to ", number, "with message - ", message)
            return;
            const { data } = await axios.post(apiUrl, payload, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            return (data)
        } catch (error) {
            return error
        }
    }
}

export default Message
