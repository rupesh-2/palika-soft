# Palika Municipal Management System

A comprehensive, bilingual municipal management system designed specifically for local government bodies in Nepal. This modern web application streamlines municipal operations, citizen services, and administrative processes through an intuitive, responsive interface.

## 🌟 Project Overview

The Palika Municipal Management System is a full-stack web application built to digitize and modernize municipal operations in Nepal. It provides a unified platform for managing various aspects of municipal governance including planning, business registration, fuel management, citizen services, and administrative reporting.

### Key Features

- **🌐 Bilingual Interface**: Full support for English and Nepali (नेपाली) languages
- **📊 Real-time Dashboard**: Live municipal statistics and analytics
- **📋 Planning & Budgeting**: Comprehensive project and budget management
- **🏢 Business Registration**: Digital business registration and renewal system
- **⛽ Fuel Management**: Vehicle fuel allocation and consumption tracking
- **📝 Sifaris System**: Digital recommendation letter processing
- **📢 Complaint Management**: Citizen grievance redressal system
- **📈 Governance Reports**: Municipal reports and official notices
- **📱 Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **🔒 Role-based Access**: Different access levels for citizens, staff, and officers

## 🏗️ Architecture & Technology Stack

### Frontend

- **Framework**: Next.js 15.2.4 (App Router)
- **Language**: TypeScript 5.x
- **Styling**: Tailwind CSS 4.1.9
- **UI Components**: Radix UI + shadcn/ui
- **State Management**: React Hooks + Context
- **Charts**: Recharts for data visualization
- **Icons**: Lucide React
- **Forms**: React Hook Form + Zod validation

### Backend & Deployment

- **Runtime**: Node.js 18+
- **Deployment**: Vercel
- **CI/CD**: GitHub Actions
- **Environment**: Environment variables with Vercel integration

### Development Tools

- **Package Manager**: npm
- **Linting**: ESLint
- **Type Checking**: TypeScript
- **Version Control**: Git

## 📁 Project Structure

```
palika-soft/
├── 📂 app/                          # Next.js App Router
│   ├── 📂 auth/                     # Authentication pages
│   │   ├── 📂 login/               # Login page
│   │   └── 📂 signup/              # Registration page
│   ├── 📂 business/                 # Business registration module
│   │   ├── page.tsx                # Main business page
│   │   └── loading.tsx             # Loading state
│   ├── 📂 fuel/                     # Fuel management module
│   │   ├── page.tsx                # Main fuel page
│   │   └── loading.tsx             # Loading state
│   ├── 📂 governance/               # Governance and reports
│   │   ├── page.tsx                # Main governance page
│   │   └── loading.tsx             # Loading state
│   ├── 📂 gunaso/                   # Complaints module
│   │   ├── page.tsx                # Main complaints page
│   │   └── loading.tsx             # Loading state
│   ├── 📂 planning/                 # Planning and budgeting
│   │   └── page.tsx                # Main planning page
│   ├── 📂 profile/                  # User profile management
│   │   └── page.tsx                # Profile page
│   ├── 📂 sifaris/                  # Recommendations module
│   │   ├── page.tsx                # Main sifaris page
│   │   └── loading.tsx             # Loading state
│   ├── 📄 globals.css              # Global styles and Tailwind imports
│   ├── 📄 layout.tsx               # Root layout component
│   └── 📄 page.tsx                 # Dashboard homepage
│
├── 📂 components/                   # Reusable React components
│   ├── 📂 ui/                      # shadcn/ui components
│   │   ├── 📄 badge.tsx           # Badge component
│   │   ├── 📄 button.tsx          # Button component
│   │   ├── 📄 card.tsx            # Card component
│   │   ├── 📄 checkbox.tsx        # Checkbox component
│   │   ├── 📄 input.tsx           # Input component
│   │   ├── 📄 label.tsx           # Label component
│   │   ├── 📄 progress.tsx        # Progress bar component
│   │   ├── 📄 select.tsx          # Select dropdown component
│   │   ├── 📄 skeleton.tsx        # Loading skeleton component
│   │   ├── 📄 tabs.tsx            # Tabs component
│   │   ├── 📄 textarea.tsx        # Textarea component
│   │   ├── 📄 toast.tsx           # Toast notification component
│   │   └── 📄 toaster.tsx         # Toast container component
│   ├── 📄 dashboard-card.tsx       # Dashboard module cards
│   ├── 📄 sidebar-navigation.tsx   # Main navigation sidebar
│   └── 📄 theme-provider.tsx       # Theme context provider
│
├── 📂 hooks/                       # Custom React hooks
│   └── 📄 use-toast.ts            # Toast notification hook
│
├── 📂 lib/                         # Utility functions and configurations
│   └── 📄 utils.ts                # Common utility functions
│
├── 📂 public/                      # Static assets
│   ├── 📄 placeholder-logo.png    # Placeholder logo
│   ├── 📄 placeholder-logo.svg    # SVG logo
│   ├── 📄 placeholder-user.jpg    # Default user avatar
│   ├── 📄 placeholder.jpg         # General placeholder image
│   └── 📄 placeholder.svg         # SVG placeholder
│
├── 📂 styles/                      # Additional stylesheets
│   └── 📄 globals.css             # Additional global styles
│
├── 📂 .github/                     # GitHub configuration
│   └── 📂 workflows/              # GitHub Actions workflows
│       ├── 📄 ci-cd.yml           # Main CI/CD pipeline
│       └── 📄 preview.yml         # Preview deployment workflow
│
├── 📄 .gitignore                   # Git ignore rules
├── 📄 components.json              # shadcn/ui configuration
├── 📄 DEPLOYMENT.md               # Deployment guide
├── 📄 env.example                 # Environment variables template
├── 📄 next-env.d.ts              # Next.js TypeScript definitions
├── 📄 next.config.mjs            # Next.js configuration
├── 📄 package.json                # Project dependencies and scripts
├── 📄 postcss.config.mjs          # PostCSS configuration
├── 📄 README.md                   # This file
├── 📄 tsconfig.json               # TypeScript configuration
└── 📄 vercel.json                 # Vercel deployment configuration
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18.0.0 or higher
- npm 8.0.0 or higher
- Git

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/palika-soft.git
   cd palika-soft
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   ```bash
   cp env.example .env.local
   # Edit .env.local with your configuration
   ```

4. **Run the development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 📱 Module Descriptions

### 🏠 Dashboard

The central hub providing an overview of all municipal operations:

- Real-time statistics and KPIs
- Revenue and expense tracking
- Project progress monitoring
- Recent activity feed
- Weather widget for local conditions
- Quick action buttons for common tasks

### 📋 Planning Module

Comprehensive project and budget management:

- Budget allocation by category (Infrastructure, Education, Healthcare, etc.)
- Project timeline management with Gantt-style views
- Resource planning and allocation
- Progress tracking with visual indicators
- Add new project plans with detailed specifications

### 🏢 Business Registration

Digital business registration and management system:

- Multi-step registration process
- Document upload and verification
- Application status tracking
- Certificate generation and download
- QR code generation for business verification
- Renewal management and notifications

### ⛽ Fuel Management

Vehicle fuel allocation and consumption tracking:

- Monthly fuel allocation planning
- Vehicle-wise consumption tracking
- Budget monitoring and alerts
- Consumption reports and analytics
- Fuel request processing
- Historical data analysis

### 📝 Sifaris (Recommendations)

Digital recommendation letter processing:

- Online application submission
- Document verification workflow
- Status tracking and notifications
- Letter generation and delivery
- Application history management
- Multi-language support for official documents

### 📢 Gunaso (Complaints)

Citizen grievance redressal system:

- Complaint submission with categorization
- Issue tracking and status updates
- Resolution timeline management
- Citizen feedback collection
- Complaint analytics and reporting
- Escalation management

### 📈 Governance & Reports

Municipal reports and official communications:

- Municipal reports and publications
- Official notices and announcements
- Policy document management
- Public information dissemination
- Report generation and distribution
- Archive management

## 🌐 Internationalization (i18n)

The application supports both English and Nepali languages:

- **Language Toggle**: Available in the sidebar navigation
- **Dynamic Content**: All text content switches between languages
- **Form Labels**: Input fields and form elements are bilingual
- **Error Messages**: Validation and error messages in both languages
- **Date Formats**: Localized date and time formatting

## 🔐 Authentication & Authorization

The system supports multiple user types with role-based access:

- **Citizens**: Access to public services and complaint submission
- **Municipal Staff**: Access to operational modules and data entry
- **Municipal Officers**: Full access to all modules and administrative functions

## 🎨 Design System

Built with a consistent design system using shadcn/ui components:

- **Color Palette**: Primary blue (#1F4E79), accent yellow (#FFC107)
- **Typography**: Inter font family with proper hierarchy
- **Components**: Consistent button styles, cards, forms, and navigation
- **Responsive**: Mobile-first design with breakpoint optimization
- **Accessibility**: WCAG 2.1 AA compliant with proper ARIA labels

## 📊 Data Visualization

Interactive charts and analytics using Recharts:

- **Bar Charts**: Revenue vs expenses comparison
- **Pie Charts**: Budget distribution by department
- **Progress Bars**: Project completion tracking
- **Line Charts**: Trend analysis over time
- **Responsive**: Charts adapt to different screen sizes

## 🚀 Deployment

### Quick Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/palika-soft)

### Manual Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions including:

- Vercel configuration
- GitHub Actions CI/CD setup
- Environment variable management
- Domain configuration

## 🔄 CI/CD Pipeline

Automated deployment pipeline with GitHub Actions:

- **Automated Testing**: Linting, type checking, and build verification
- **Preview Deployments**: Automatic preview URLs for pull requests
- **Staging Environment**: Automatic deployment from develop branch
- **Production Deployment**: Automatic deployment from main branch
- **Environment Management**: Separate configurations for different environments

## 🛡️ Security Features

- **HTTPS Enforcement**: All traffic encrypted
- **Security Headers**: XSS protection, content type options
- **Input Validation**: Client and server-side validation
- **Environment Variables**: Secure configuration management
- **Dependency Scanning**: Regular security updates

## 📈 Performance Optimization

- **Code Splitting**: Automatic route-based code splitting
- **Image Optimization**: Next.js Image component with WebP support
- **Static Generation**: Pre-rendered pages where possible
- **CDN Distribution**: Global edge network via Vercel
- **Bundle Analysis**: Optimized JavaScript bundles

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Use conventional commit messages
- Ensure responsive design compatibility
- Add proper error handling
- Include bilingual support for new features
- Write meaningful commit messages

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support & Documentation

- **Issues**: Create an issue in the GitHub repository
- **Deployment Help**: Check [DEPLOYMENT.md](./DEPLOYMENT.md)
- **Documentation**: Inline code comments and component documentation
- **Community**: GitHub Discussions for questions and ideas

## 🔮 Roadmap

### Phase 1 (Current)

- ✅ Core modules implementation
- ✅ Bilingual support
- ✅ Responsive design
- ✅ Basic authentication

### Phase 2 (Planned)

- 🔄 Database integration
- 🔄 Advanced authentication
- 🔄 File upload system
- 🔄 Email notifications

### Phase 3 (Future)

- 📋 Mobile app development
- 📋 Advanced analytics
- 📋 API documentation
- 📋 Third-party integrations

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Icons from [Lucide React](https://lucide.dev/)
- Charts from [Recharts](https://recharts.org/)
- Deployed on [Vercel](https://vercel.com/)

---

**Built with ❤️ for Nepali municipalities**

_Empowering local governance through digital transformation_
