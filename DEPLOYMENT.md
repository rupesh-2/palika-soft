# Deployment Guide - Palika Municipal Management System

## Prerequisites

- Node.js 18+ installed
- Vercel account
- GitHub account
- Git installed

## Quick Deploy to Vercel

### Option 1: Deploy via Vercel Dashboard (Recommended for first deployment)

1. **Push your code to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign in with your GitHub account
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will automatically detect it's a Next.js project

3. **Configure Environment Variables** (if needed)
   - In your Vercel project dashboard, go to Settings > Environment Variables
   - Add any required environment variables from `env.example`

4. **Deploy**
   - Click "Deploy"
   - Vercel will build and deploy your application

### Option 2: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```

## CI/CD Pipeline Setup

### 1. GitHub Repository Setup

1. **Create GitHub repository**
   ```bash
   git init
   git remote add origin https://github.com/yourusername/palika-soft.git
   git branch -M main
   git push -u origin main
   ```

2. **Create develop branch**
   ```bash
   git checkout -b develop
   git push -u origin develop
   ```

### 2. Vercel Project Setup

1. **Get Vercel Project ID**
   - Go to your Vercel project dashboard
   - Navigate to Settings > General
   - Copy the Project ID

2. **Get Vercel Organization ID**
   - Go to Vercel dashboard
   - Click on your organization name
   - Copy the Organization ID from the URL or settings

3. **Create Vercel Token**
   - Go to Vercel dashboard > Settings > Tokens
   - Create a new token with appropriate permissions

### 3. GitHub Secrets Configuration

Add these secrets to your GitHub repository (Settings > Secrets and variables > Actions):

- `VERCEL_TOKEN`: Your Vercel API token
- `VERCEL_ORG_ID`: Your Vercel organization ID
- `VERCEL_PROJECT_ID`: Your Vercel project ID

### 4. Branch Protection Rules

Set up branch protection for `main`:
- Go to repository Settings > Branches
- Add rule for `main` branch
- Enable:
  - Require pull request reviews
  - Require status checks to pass
  - Require branches to be up to date

## Deployment Workflow

### Development Workflow

1. **Create feature branch**
   ```bash
   git checkout develop
   git pull origin develop
   git checkout -b feature/your-feature-name
   ```

2. **Make changes and commit**
   ```bash
   git add .
   git commit -m "feat: add new feature"
   git push origin feature/your-feature-name
   ```

3. **Create Pull Request**
   - Create PR from feature branch to `develop`
   - GitHub Actions will run tests and create preview deployment
   - Review and merge

4. **Deploy to Staging**
   - When `develop` is updated, it automatically deploys to staging

### Production Deployment

1. **Create release PR**
   ```bash
   git checkout main
   git pull origin main
   git checkout -b release/v1.0.0
   git merge develop
   git push origin release/v1.0.0
   ```

2. **Create Pull Request**
   - Create PR from release branch to `main`
   - Review and merge

3. **Automatic Production Deployment**
   - When merged to `main`, GitHub Actions automatically deploys to production

## Environment Configuration

### Local Development
```bash
# Copy environment example
cp env.example .env.local

# Install dependencies
npm install

# Run development server
npm run dev
```

### Production Environment Variables

Set these in Vercel dashboard (Settings > Environment Variables):

```env
NEXT_PUBLIC_APP_URL=https://your-app.vercel.app
NEXT_PUBLIC_APP_NAME="Palika Municipal Management System"
NODE_ENV=production
```

## Monitoring and Maintenance

### Health Checks

The application includes health check endpoints:
- `/api/health` - Basic health check
- `/api/status` - Detailed status information

### Performance Monitoring

- Vercel Analytics (built-in)
- Vercel Speed Insights
- Custom monitoring can be added via `_app.tsx`

### Backup Strategy

- Code: GitHub repository
- Database: Regular backups (when database is added)
- Environment variables: Documented in `env.example`

## Troubleshooting

### Common Issues

1. **Build Failures**
   - Check Node.js version compatibility
   - Verify all dependencies are installed
   - Check for TypeScript errors

2. **Deployment Issues**
   - Verify Vercel tokens and IDs
   - Check environment variables
   - Review build logs in Vercel dashboard

3. **Runtime Errors**
   - Check Vercel function logs
   - Verify API routes are working
   - Check client-side console errors

### Support

For deployment issues:
1. Check Vercel documentation
2. Review GitHub Actions logs
3. Check Vercel deployment logs
4. Contact support if needed

## Security Considerations

- Environment variables are encrypted
- HTTPS is enforced
- Security headers are configured in `vercel.json`
- Regular dependency updates
- Code scanning with GitHub Advanced Security (if available)

## Performance Optimization

- Images are optimized with Next.js Image component
- Code splitting is automatic
- Static generation where possible
- CDN distribution via Vercel Edge Network
