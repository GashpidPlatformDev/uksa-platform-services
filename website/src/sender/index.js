import { api_key, api_url, webmail_usr } from "components/structures";

const credentials = { username: webmail_usr, password: api_key };

async function getAuthToken() {
    try {
        const response = await fetch(`${api_url}/generate-token`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(credentials)
        });
        
        if (!response.ok) {
            throw new Error("Error in authentication");
        }
        
        const data = await response.json();
        return data.token;
    } catch (error) {
        console.error("Error getting the token:", error);
        return null;
    }
}

export async function sendEmail(to, sender, title, subject, defaultBody=null, htmlBody=null) {
    const emailData = {
        messageText: defaultBody,
        messageHTML: htmlBody,
        fromEmail: sender,
        subject: subject,
        fromTitle: title,
        to: to
    };

    try {
        const token = await getAuthToken();
        if (!token) {
            console.error("Could not get the token");
            return;
        }
        
        const response = await fetch(`${api_url}/send-email`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(emailData)
        });

        if (response.ok) {
            console.log("Correo enviado con éxito. Redirigiendo...");
            window.location.href = emailData.redirectUrl;
        } else {
            const errorData = await response.json();
            console.error("Error:", errorData);
        }
    } catch (error) {
        console.error("Error sending mail:", error);
    }
}
