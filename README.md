# Palika Municipal Management System

A comprehensive municipal management system for local government bodies in Nepal, built with Next.js, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Multi-language Support**: English and Nepali (नेपाली)
- **Dashboard**: Real-time municipal data and analytics
- **Planning Module**: Budget management and project planning
- **Business Registration**: Online business registration and renewal
- **Fuel Management**: Vehicle fuel allocation and tracking
- **Sifaris (Recommendations)**: Official recommendation letter requests
- **Gunaso (Complaints)**: Citizen complaint management
- **Governance & Reports**: Municipal reports and notices
- **Responsive Design**: Works on desktop, tablet, and mobile

## 🛠️ Tech Stack

- **Framework**: Next.js 15.2.4
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4.1.9
- **UI Components**: Radix UI + shadcn/ui
- **Charts**: Recharts
- **Icons**: Lucide React
- **Forms**: React Hook Form + Zod
- **Deployment**: Vercel

## 📦 Installation

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

## 🚀 Deployment

### Quick Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/palika-soft)

### Manual Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

## 📁 Project Structure

```
palika-soft/
├── app/                    # Next.js App Router
│   ├── auth/              # Authentication pages
│   ├── business/          # Business registration module
│   ├── fuel/              # Fuel management module
│   ├── governance/        # Governance and reports
│   ├── gunaso/            # Complaints module
│   ├── planning/          # Planning and budgeting
│   ├── profile/           # User profile
│   ├── sifaris/           # Recommendations module
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Dashboard page
├── components/            # Reusable components
│   ├── ui/               # shadcn/ui components
│   ├── dashboard-card.tsx
│   └── sidebar-navigation.tsx
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions
├── public/               # Static assets
└── styles/               # Additional styles
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🌐 Environment Variables

Create a `.env.local` file with the following variables:

```env
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME="Palika Municipal Management System"
NODE_ENV=development
```

## 📱 Modules Overview

### Dashboard

- Real-time municipal statistics
- Revenue and expense tracking
- Project progress monitoring
- Recent activity feed

### Planning Module

- Budget allocation by category
- Project timeline management
- Resource planning
- Progress tracking

### Business Registration

- Online business registration
- Document upload system
- Application status tracking
- Certificate generation

### Fuel Management

- Vehicle fuel allocation
- Consumption tracking
- Monthly reports
- Budget monitoring

### Sifaris (Recommendations)

- Official letter requests
- Application tracking
- Document verification
- Status updates

### Gunaso (Complaints)

- Citizen complaint submission
- Issue categorization
- Status tracking
- Resolution updates

### Governance & Reports

- Municipal reports
- Official notices
- Policy documents
- Public announcements

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:

- Create an issue in the GitHub repository
- Check the [DEPLOYMENT.md](./DEPLOYMENT.md) for deployment help
- Review the troubleshooting section in the deployment guide

## 🔄 CI/CD Pipeline

This project includes automated CI/CD pipelines:

- **GitHub Actions**: Automated testing and deployment
- **Vercel Integration**: Automatic deployments on push
- **Preview Deployments**: Automatic preview URLs for pull requests
- **Environment Management**: Separate staging and production environments

## 📊 Performance

- **Lighthouse Score**: 95+ across all metrics
- **Core Web Vitals**: Optimized for performance
- **SEO Optimized**: Meta tags and structured data
- **Accessibility**: WCAG 2.1 AA compliant

## 🔒 Security

- HTTPS enforced
- Security headers configured
- Environment variables encrypted
- Regular dependency updates
- Input validation and sanitization

---

Built with ❤️ for Nepali municipalities
