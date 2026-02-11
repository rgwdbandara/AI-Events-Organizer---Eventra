<img width="1901" height="869" alt="Screenshot 2026-02-11 230624" src="https://github.com/user-attachments/assets/6ca12be9-d560-4708-b922-55831a4d3aec" /># Eventra - AI Events Organizer 🎯

An intelligent event management platform powered by AI that streamlines event creation, organization, and attendee management. Built with modern web technologies and Google's Generative AI.

🌐 **Live Demo**: [https://ai-events-organizer-eventra.vercel.app/](https://ai-events-organizer-eventra.vercel.app/)

## ✨ Features

- 🤖 **AI-Powered Event Planning** - Leverage Google's Generative AI for smart event suggestions and organization
- 👤 **Google OAuth Authentication** - Secure login with Google accounts
- 📱 **QR Code Generation** - Generate QR codes for event tickets and check-ins
- 🎨 **Modern UI/UX** - Beautiful, responsive interface built with React and Tailwind CSS
- ⚡ **Real-time Updates** - Live event updates using Socket.IO
- 🖼️ **Image Management** - Cloudinary integration for event images
- 🔐 **Secure Authentication** - JWT-based authentication with bcrypt password hashing

## 🛠️ Tech Stack

### Frontend
- **React 19.2** - Modern UI library
- **TypeScript** - Type-safe code
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Smooth animations
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **QR Code Libraries** - Multiple QR code generation options

### Backend
- **Node.js & Express 5** - Server framework
- **MongoDB & Mongoose** - Database and ODM
- **Google Generative AI** - AI-powered features
- **Google Auth Library** - OAuth authentication
- **Socket.IO** - Real-time communication
- **Cloudinary** - Image storage and management
- **JWT** - Token-based authentication
- **bcrypt** - Password hashing

## 🚀 Deployment

- **Frontend**: Deployed on Vercel - [https://ai-events-organizer-eventra.vercel.app/](https://ai-events-organizer-eventra.vercel.app/)
- **Backend**: Deployed on Railway

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v16 or higher)
- npm or yarn
- MongoDB (local or Atlas account)
- Google Cloud Console account (for OAuth and AI)
- Cloudinary account

## 🚀 Installation

### 1. Clone the repository
```bash
git clone https://github.com/rgwdbandara/AI-Events-Organizer---Eventra.git
cd AI-Events-Organizer---Eventra
```

### 2. Install root dependencies
```bash
npm install
```

### 3. Install client dependencies
```bash
cd client
npm install
```

### 4. Install server dependencies
```bash
cd ../server
npm install
```

### 5. Environment Variables

Create a `.env` file in the `server` directory with the following variables:

```env
# Server Configuration
PORT=5000

# Database
MONGO_URI=mongodb+srv://wathsala:Wathsala1234@eventracluster.xfowqlh.mongodb.net/eventra?retryWrites=true&w=majority&appName=EventraCluster

# JWT
JWT_SECRET=supersecretkey123

# Cloudinary
CLOUDINARY_CLOUD_NAME=dxjea0mgx
CLOUDINARY_API_KEY=224654662921315
CLOUDINARY_API_SECRET=J2qL7n5QOwzxK_K_QleBYRAEudY

# Hugging Face API
HF_API_KEY=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
```

Create a `.env` file in the `client` directory:

```env
VITE_API_URL=http://localhost:5000
VITE_GOOGLE_CLIENT_ID=your_google_client_id
```

## 🏃 Running the Application

### Development Mode

#### Run the entire application (from root):
```bash
# Terminal 1 - Start the server
cd server
npm run dev

# Terminal 2 - Start the client
cd client
npm run dev
```

The application will be available at:
- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:5000

### Production Mode

#### Build the client:
```bash
cd client
npm run build
```

#### Start the server:
```bash
cd server
npm start
```

## 📁 Project Structure

```
AI-Events-Organizer---Eventra/
├── client/                  # React frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── pages/         # Page components
│   │   ├── utils/         # Utility functions
│   │   └── App.tsx        # Main app component
│   ├── public/            # Static assets
│   └── package.json
│
├── server/                 # Node.js backend
│   ├── config/            # Configuration files
│   ├── middlewares/       # Express middlewares
│   ├── models/            # MongoDB models
│   ├── routes/            # API routes
│   ├── index.js           # Server entry point
│   └── package.json
│
├── package.json           # Root package.json
└── README.md
```

## 🔑 Key Features Breakdown

### AI Integration
The application uses AI to:
- Generate event descriptions
- Suggest event activities
- Provide intelligent event recommendations
- Automate event planning tasks

### Authentication
- Google OAuth 2.0 integration
- JWT-based session management
- Secure password hashing with bcrypt

### QR Code Features
- Generate unique QR codes for events
- QR code scanning for event check-ins
- Multiple QR code rendering options

### Real-time Features
- Live event updates
- Real-time attendee notifications
- Socket.IO powered communication

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 👨‍💻 Author

**rgwdbandara**

## 🙏 Acknowledgments

- Google Generative AI for AI capabilities
- Cloudinary for image management
- The open-source community for amazing libraries

## 📧 Support

For support, please open an issue in the GitHub repository.
---


<img width="1901" height="869" alt="Screenshot 2026-02-11 230624" src="https://github.com/user-attachments/assets/6f04c413-5eee-430c-8161-1423fa9d2395" />

<img width="1894" height="874" alt="Screenshot 2026-02-11 230644" src="https://github.com/user-attachments/assets/6ea8eeec-8594-491e-859e-1ccc64901a41" />

<img width="1899" height="873" alt="Screenshot 2026-02-11 230706" src="https://github.com/user-attachments/assets/d1967c4d-c943-4718-8bee-653f6ac1e8de" />

<img width="1897" height="866" alt="Screenshot 2026-02-11 230724" src="https://github.com/user-attachments/assets/e3cc9ea2-cbcc-4043-89eb-acc8aeab215d" />

<img width="1901" height="863" alt="Screenshot 2026-02-11 230750" src="https://github.com/user-attachments/assets/a40d5df6-ba69-4722-90ff-bb1f18211a5c" />

<img width="1890" height="858" alt="Screenshot 2026-02-11 230740" src="https://github.com/user-attachments/assets/0c8aae76-d11c-4404-a8fd-78d72c40a6c8" />

<img width="1900" height="869" alt="Screenshot 2026-02-11 235201" src="https://github.com/user-attachments/assets/2359296d-836a-4992-9720-e6cc4fd391ea" />
 
<img width="1899" height="870" alt="Screenshot 2026-02-11 235009" src="https://github.com/user-attachments/assets/88a76864-ab7e-4f32-9266-9ad59ddb5761" />

<img width="1894" height="872" alt="Screenshot 2026-02-11 235102" src="https://github.com/user-attachments/assets/e947a9f5-3a35-417f-9155-bddd632b398a" />



Made with ❤️ using React, No![Uploading Screenshot 2026-02-11 230724.png…]()
de.js, and AI
