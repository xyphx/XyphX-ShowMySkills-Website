# ShowMySkills 🌟

**Showcase Your Talents, Build Your Network, Grow Your Career**

ShowMySkills is a modern web platform built with Next.js that empowers students, professionals, and creators to showcase their skills, experience, and achievements while building meaningful connections within a vibrant community.

## 🚀 Features

### For Users
- **📱 Responsive Design** - Seamless experience across all devices
- **🎨 Profile Creation** - Build comprehensive digital portfolios
- **⭐ Community Recognition** - Star system for peer recognition
- **📄 Resume Management** - Upload and share professional documents
- **🔗 Social Integration** - Connect LinkedIn, GitHub, and Instagram
- **🔍 Discovery** - Find profiles by skills, location, or institution
- **📊 Skills Categorization** - Organize skills by technology domains
- **🎯 Achievement Tracking** - Showcase certifications and accomplishments

### For Developers
- **⚡ Next.js 15** - Latest React framework with App Router
- **🔥 Firebase Integration** - Real-time database and authentication
- **🎨 Tailwind CSS v4** - Modern utility-first styling
- **📸 ImageKit** - Optimized image management
- **🛡️ Type Safety** - JavaScript with JSConfig
- **📱 Mobile-First** - Responsive design patterns

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19
- **Styling**: Tailwind CSS v4, Lucide React Icons
- **Backend**: Firebase (Firestore, Authentication, Storage)
- **Image Management**: ImageKit
- **Image Editing**: React Easy Crop
- **Deployment**: Netlify
- **Package Manager**: npm

## 🚀 Quick Start

### Prerequisites
- Node.js 22.16.0 or higher
- npm 10.8.1 or higher
- Firebase account
- ImageKit account

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ar610/XyphX-ShowMySkills-Website.git
   cd XyphX-ShowMySkills-Website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   
   Create a `.env.local` file in the root directory:
   ```env
   # Firebase Configuration
   NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.firebasestorage.app
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id

   # ImageKit Configuration
   NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
   NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your_endpoint
   IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── [username]/        # Dynamic profile pages
│   ├── about/             # About page
│   ├── api/               # API routes
│   ├── auth/              # Authentication page
│   ├── home/              # Dashboard/home page
│   ├── learnmore/         # Learn more page
│   └── profile-setup/     # Profile creation page
├── components/            # Reusable React components
│   ├── AuthForm.jsx       # Authentication form
│   ├── DashboardCard.jsx  # Profile cards
│   ├── Footer.jsx         # Site footer
│   ├── Homepage.jsx       # Landing page
│   ├── ImageCropper.jsx   # Image editing component
│   ├── Nav.jsx            # Navigation bar
│   ├── ProfileEdit.jsx    # Profile editing
│   ├── ProfileSetup.jsx   # Initial profile setup
│   └── ProtectedRoute.jsx # Route protection
├── config/                # Configuration files
│   ├── firebase.js        # Firebase setup
│   └── imagekit.js        # ImageKit setup
├── contexts/              # React contexts
│   └── AuthContext.js     # Authentication context
├── hooks/                 # Custom React hooks
│   ├── useFileUpload.js   # File upload logic
│   ├── useImageUpload.js  # Image upload logic
│   └── useProfileCheck.js # Profile validation
└── utils/                 # Utility functions
    ├── profileUtils.js    # Profile helpers
    └── skills.js          # Skills categorization
```

## 🎯 Key Features Explained

### Profile System
- **Dynamic URLs**: Each user gets a unique URL (`/username`)
- **Complete Profiles**: Skills, experience, achievements, contact info
- **Resume Upload**: PDF support with download functionality
- **Image Management**: Profile pictures with cropping capabilities

### Community Features
- **Star System**: Users can star profiles they admire
- **Discovery**: Browse profiles by skills, college, or location
- **Responsive Cards**: Mobile-optimized profile cards

### Authentication & Security
- **Firebase Auth**: Secure user authentication
- **Protected Routes**: Authenticated-only areas
- **Profile Ownership**: Users can only edit their own profiles

## 🌐 Deployment

### Netlify Deployment

The project is configured for easy Netlify deployment:

1. **Connect your repository** to Netlify
2. **Set environment variables** in Netlify dashboard
3. **Deploy settings**:
   - Build command: `npm run build`
   - Publish directory: `.next`
   - Node version: `22.16.0`

### Build Configuration

The project includes:
- `netlify.toml` - Netlify configuration
- `.nvmrc` - Node.js version specification
- `tailwind.config.js` - Tailwind CSS configuration

## 🔧 Development Scripts

```bash
# Development server with Turbopack
npm run dev

# Production build
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🏢 About XyphX

ShowMySkills is proudly developed by **XyphX**, a budding service-based tech company with the ambitious vision of transforming into a revolutionary tech product powerhouse. We specialize in creating smart, futuristic, and industry-redefining solutions.

- 🌐 **Website**: [xyphx.com](https://www.xyphx.com/)
- 📧 **Contact**: xyphx.company@gmail.com
- 💼 **LinkedIn**: [XyphX Company](https://www.linkedin.com/company/xyphx/)
- 💻 **GitHub**: [XyphX](https://github.com/xyphx)

## 🆘 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/ar610/XyphX-ShowMySkills-Website/issues) page
2. Create a new issue with detailed information
3. Contact us at xyphx.company@gmail.com

## 🎉 Acknowledgments

- Thanks to all contributors and users
- Built with ❤️ using modern web technologies
- Special thanks to the open-source community

---

**Ready to show your skills?** [Get started today!](https://showmyskills.netlify.app/)

*Empowering creators worldwide to showcase their talents and build meaningful connections.*