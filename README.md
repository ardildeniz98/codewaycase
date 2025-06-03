📱 Mobile Configuration Panel - API & Frontend
This project provides a configuration management panel for mobile applications. It includes a deployed backend (Node.js + Firebase) and a frontend interface where users can sign in and view/edit data.

🌐 Deployed URLs
🔐 Sign In Page
Access the sign-in page here:
👉 https://frontend-pi-nine-52.vercel.app/signin

Use the following credentials:

Email: ardildeniz98@gmail.com

Password: 123456

🚀 Deployment Stack
Layer	Tool Used
Frontend	Vercel
Backend	Render

⚠️ Note: Since Render uses a free-tier service, the backend might enter "sleep mode" when idle. The first request can take a few seconds to respond.

🧪 Test API Routes
🔧 1. Panel Configuration Data
Returns an array of panel configuration objects, each containing fields such as createdAt.

Endpoint:
GET https://backend-yak8.onrender.com/panel-config

Headers:
Authorization: Bearer <idToken> (Requires Firebase Auth token)

You must sign in via the frontend to obtain a valid token to fetch this route.

📄 2. Key-Value Pairs (Public)
Returns a public map of key-value configuration data.
No authentication required.

Endpoint:
GET https://backend-yak8.onrender.com/config

Headers:
api-key: 123456

Example curl Request:

curl -H "api-key: 123456" https://backend-yak8.onrender.com/config
⚙️ Local Development
You can clone the repositories and run the project locally:

git clone https://github.com/ardildeniz98/frontend.git
git clone https://github.com/ardildeniz98/backend.git


