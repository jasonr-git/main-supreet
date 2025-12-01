# Supreet Souharda Bank - Web Application

A modern banking web application built with React.js, featuring both client-facing website and admin dashboard.

## 🏗️ Project Structure

```
supreet-souharda/
├── client/                 # Client-facing website
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/     # Reusable components
│   │   │   ├── layout/     # Layout components (Header, Footer, Navbar)
│   │   │   ├── forms/      # Form components
│   │   │   ├── ui/         # UI components (Cards, Buttons, etc.)
│   │   │   └── features/   # Feature-specific components
│   │   ├── pages/          # Page components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── services/       # API services and utilities
│   │   ├── constants/      # Constants and configuration
│   │   ├── assets/         # Images, fonts, icons
│   │   └── styles/         # Global styles
│   └── package.json
├── admin/                  # Admin dashboard
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/     # Reusable admin components
│   │   │   ├── layout/     # Admin layout components
│   │   │   ├── forms/      # Admin forms
│   │   │   └── tables/     # Data tables
│   │   ├── pages/          # Admin pages
│   │   ├── services/       # Admin API services
│   │   └── constants/      # Admin constants
│   └── package.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd supreet-souharda
   ```

2. **Install client dependencies**
   ```bash
   cd client
   npm install
   ```

3. **Install admin dependencies**
   ```bash
   cd ../admin
   npm install
   ```

### Running the Applications

#### Client Application
```bash
cd client
npm start
```
The client app will run on `http://localhost:3000`

#### Admin Dashboard
```bash
cd admin
npm start
```
The admin dashboard will run on `http://localhost:3001`

## 🏛️ Architecture

### Client Application
- **React 18** with functional components and hooks
- **React Router** for navigation
- **Styled Components** for styling
- **Framer Motion** for animations
- **Firebase** for backend services
- **Material-UI** for UI components

### Admin Dashboard
- **React 18** with admin-specific components
- **React Pro Sidebar** for navigation
- **Firebase** for data management
- **SweetAlert2** for notifications

## 📁 Naming Conventions

- **Components**: PascalCase (e.g., `UserProfile.jsx`)
- **Files/Folders**: camelCase (e.g., `userService.js`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `API_ENDPOINTS`)
- **CSS Classes**: kebab-case (e.g., `user-profile`)

## 🔧 Key Features

### Client Features
- Responsive design for all devices
- Banking services information
- Loan and deposit calculators
- Image gallery
- Contact forms
- News and updates
- Chatbot integration
- Multi-language support

### Admin Features
- User management
- Deposit management
- Loan management
- Gallery management
- Progress tracking
- Statistics dashboard
- Secure authentication

## 🛠️ Development Guidelines

1. **Component Structure**: Each component should have its own folder with index file
2. **Import Organization**: Group imports by type (React, third-party, local)
3. **Error Handling**: Implement proper error boundaries and try-catch blocks
4. **Performance**: Use React.memo, useMemo, and useCallback where appropriate
5. **Accessibility**: Follow WCAG guidelines for accessibility

## 📦 Build & Deployment

### Client Build
```bash
cd client
npm run build
```

### Admin Build
```bash
cd admin
npm run build
```

## 🤝 Contributing

1. Follow the established naming conventions
2. Write meaningful commit messages
3. Add proper documentation for new features
4. Test thoroughly before submitting PRs

## 📄 License

This project is licensed under the MIT License.

## 📞 Support

For support and questions, please contact the development team.