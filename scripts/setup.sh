#!/bin/bash

# JetPast Setup Script
echo "🚅 Setting up JetPast FastTrack VIP Services..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ and try again."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version 18+ is required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js $(node -v) detected"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Check if .env.local exists
if [ ! -f .env.local ]; then
    echo "📝 Creating .env.local from template..."
    cp env.example .env.local
    echo "⚠️  Please update .env.local with your actual API keys:"
    echo "   - Supabase URL and keys"
    echo "   - Stripe keys"
    echo "   - Other configuration"
    echo ""
    echo "📖 See README.md for detailed setup instructions"
else
    echo "✅ .env.local already exists"
fi

# Create necessary directories
echo "📁 Creating directories..."
mkdir -p public/images/airports
mkdir -p public/images/services
mkdir -p public/images/avatars

# Run type check
echo "🔍 Running type check..."
npm run type-check

# Run linting
echo "🧹 Running linter..."
npm run lint

echo ""
echo "🎉 Setup complete!"
echo ""
echo "Next steps:"
echo "1. Update .env.local with your API keys"
echo "2. Set up your Supabase database using supabase/schema.sql"
echo "3. Run 'npm run dev' to start the development server"
echo "4. Open http://localhost:3000 in your browser"
echo ""
echo "📚 For more information, see README.md"
