# Smart ATS - Frontend

A modern, responsive React application for AI-powered resume analysis and optimization. This application helps job seekers optimize their resumes for Applicant Tracking Systems (ATS) by providing detailed analysis, match scores, and actionable recommendations.

## 🚀 Features

### Core Functionality

- **Resume Analysis**: Upload PDF resumes and get AI-powered insights
- **Job Matching**: Compare resumes against job descriptions
- **Match Score**: Get percentage-based compatibility scores
- **Missing Keywords**: Identify important keywords missing from your resume
- **Profile Summary**: AI-generated professional summary suggestions

### User Management

- **User Authentication**: Secure login and registration system
- **User Dashboard**: Track analysis history and statistics
- **Profile Management**: Manage account settings and preferences
- **Review History**: Save and access previous resume analyses

### Responsive Design

- **Mobile-First**: Optimized for all screen sizes
- **Modern UI**: Clean, professional interface using Tailwind CSS
- **Accessibility**: WCAG compliant with proper focus management
- **Touch-Friendly**: Optimized for mobile and tablet interactions

### Additional Features

- **PDF Export**: Download analysis reports as PDF
- **Social Sharing**: Share results with others
- **Email Reports**: Send analysis via email
- **Real-time Updates**: Live analysis progress tracking

## 🛠️ Tech Stack

- **Framework**: React 18 with TypeScript
- **Routing**: React Router DOM v6
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **HTTP Client**: Axios
- **Icons**: Lucide React
- **Charts**: Recharts
- **PDF Generation**: jsPDF
- **File Upload**: React Dropzone
- **Notifications**: React Hot Toast
- **Build Tool**: Vite

## 📦 Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd Smart_ATS
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Setup**

   ```bash
   cp .env.example .env
   ```

   Update the `.env` file with your configuration:

   ```env
   VITE_API_URL=http://localhost:5000
   VITE_APP_NAME=Smart ATS
   VITE_ENV=development
   ```

4. **Start the development server**

   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Basic UI components (Button, Input, Card, etc.)
│   ├── Header.tsx      # Navigation header
│   ├── Footer.tsx      # Footer component
│   ├── Layout.tsx      # Main layout wrapper
│   └── ...
├── pages/              # Page components
│   ├── HomePage.tsx    # Landing and analysis page
│   ├── LoginPage.tsx   # User login
│   ├── SignUpPage.tsx  # User registration
│   ├── DashboardPage.tsx # User dashboard
│   ├── ProfilePage.tsx # User profile management
│   └── NotFoundPage.tsx # 404 error page
├── contexts/           # React contexts
│   └── AuthContext.tsx # Authentication context
├── services/           # API services
│   ├── api.ts         # Resume analysis API
│   ├── authAPI.ts     # Authentication API
│   └── reviewAPI.ts   # Review management API
├── store/              # State management
│   └── analysisStore.ts # Analysis state (Zustand)
├── types/              # TypeScript type definitions
│   └── index.ts
└── App.tsx            # Main app component
```

## 🎨 Design System

### Colors

- **Primary**: Blue (600-700)
- **Secondary**: Indigo (600-700)
- **Success**: Green (500-600)
- **Warning**: Yellow (500-600)
- **Error**: Red (500-600)
- **Gray Scale**: Gray (50-900)

### Typography

- **Font Family**: System fonts (Inter, SF Pro, etc.)
- **Responsive Sizing**: Mobile-first approach
- **Font Weights**: 400 (normal), 500 (medium), 600 (semibold), 700 (bold)

### Components

All components follow a consistent design pattern with:

- Proper spacing using Tailwind's spacing scale
- Consistent border radius (lg, xl)
- Hover and focus states
- Loading and disabled states
- Mobile-responsive design

## 🔐 Authentication

The app includes a complete authentication system:

- **Registration**: Email/password with validation
- **Login**: Secure authentication with JWT tokens
- **Protected Routes**: Automatic redirection for unauthenticated users
- **Token Management**: Automatic token refresh and storage
- **Profile Management**: Update user information

## 📱 Responsive Design

The application is built with a mobile-first approach:

- **Breakpoints**: sm (640px), md (768px), lg (1024px), xl (1280px)
- **Navigation**: Collapsible mobile menu
- **Touch Targets**: Minimum 44px for mobile interactions
- **Safe Areas**: Support for device safe areas
- **Flexible Layouts**: Grid and flexbox for responsive layouts

## 🧪 Testing

Run the linter:

```bash
npm run lint
```

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Manual Build

```bash
npm run build
```

The `dist` folder contains the production build.

## 🔧 Configuration

### Environment Variables

- `VITE_API_URL`: Backend API URL
- `VITE_APP_NAME`: Application name
- `VITE_ENV`: Environment (development/production)
- `VITE_DEBUG_MODE`: Enable debug logging

### Tailwind Configuration

The app uses a custom Tailwind configuration with:

- Extended color palette
- Custom spacing scale
- Responsive typography utilities
- Custom component classes

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:

- Create an issue in the repository
- Contact the development team
- Check the documentation

---

Built with ❤️ using React and TypeScript
