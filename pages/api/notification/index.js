import axios from 'axios';
import nc from 'next-connect'
const handler = nc()
handler.post(async (req, res) => {
    const { number, message } = req.body;

    if (!number || !message) {
        return res.status(400).json({ error: "Missing number or message parameter." });
    }
    try {
        const apiUrl = "http://bulksmsbd.net/api/smsapi";

        const payload = {
            api_key: "uO3NSjUcD0xmKkPwu4Rx",
            senderid: "8809617626452",
            number,
            message,
        };
        const { data } = await axios.post(apiUrl, payload, {
            headers: {
                "Content-Type": "application/json",
            },
        });

        // Assuming the API returns JSON
        res.status(200).json(data)
    } catch (error) {
        console.error("Error sending SMS:", error?.response?.data || error.message);
        res.status(500).json({
            error: "Failed to send SMS.",
            details: error?.response?.data || error.message,
        });
    }

})
export default handler