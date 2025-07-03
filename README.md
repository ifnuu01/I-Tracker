# I-Tracker 📊

**I-Tracker** adalah aplikasi web untuk manajemen produktivitas yang memungkinkan pengguna untuk melacak kategori, topik, tugas, dan proyek secara terorganisir. Aplikasi ini dibangun menggunakan **Laravel 12** dengan **React (Inertia.js)** dan menggunakan **Tailwind CSS** untuk styling.

## 🚀 Fitur Utama

### 📈 Dashboard Analytics

- **Overview Statistik**: Tampilan real-time untuk total tasks, projects, dan tingkat completion
- **Grafik Produktivitas**: Visualisasi data aktivitas harian dalam bentuk area chart
- **Recent Topics**: Daftar topik terbaru yang dibuat
- **Progress Tracking**: Progress bar untuk tasks dan projects

### 📋 Manajemen Categories

- **CRUD Operations**: Create, Read, Update, Delete categories
- **User-specific**: Setiap user memiliki categories yang terpisah
- **Validation**: Input validation dengan error handling

### 🎯 Manajemen Topics

- **Category-based**: Topics dikategorikan berdasarkan categories yang dibuat
- **Status Tracking**: Pending, In Progress, Completed
- **Target Date**: Setting tanggal target untuk setiap topic
- **Description**: Optional description untuk detail topic

### ✅ Manajemen Tasks

- **Topic-linked**: Tasks terhubung dengan topics tertentu
- **Priority System**: Low, Medium, High priority levels
- **Status Tracking**: Done/Not Done dengan visual indicators
- **Note System**: Optional notes untuk setiap task

### 💼 Manajemen Projects

- **Comprehensive Details**: Name, description, target date
- **Link Management**: Demo link dan repository link
- **Status & Priority**: Multi-level status dan priority system
- **Topic Integration**: Projects terhubung dengan topics

## 🛠️ Teknologi yang Digunakan

### Backend

- **Laravel 12** - PHP Framework
- **Inertia.js** - Modern monolith architecture
- **SQLite** - Database (development)
- **Eloquent ORM** - Database relationships

### Frontend

- **React 18** - JavaScript library
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Headless component library
- **Recharts** - Chart library untuk analytics
- **Lucide React** - Icon library

### Tools & Development

- **Vite** - Build tool dan dev server
- **Pest** - Testing framework
- **ESLint** - JavaScript linting
- **Prettier** - Code formatting

## 📊 Database Structure

### Tables

1. **users** - User management dengan authentication
2. **categories** - Kategori untuk mengorganisir topics
3. **topics** - Topik utama yang dapat berisi tasks dan projects
4. **tasks** - Task individu dengan priority dan status
5. **projects** - Project dengan detail lengkap dan links

### Relationships

```
User
├── Categories (1:n)
│   └── Topics (1:n)
│       ├── Tasks (1:n)
│       └── Projects (1:n)
```

## 🎨 User Interface

### Layout & Navigation

- **Responsive Design**: Mobile-first approach dengan Tailwind CSS
- **Sidebar Navigation**: Easy access ke semua modules
- **Breadcrumb Navigation**: Contextual navigation path
- **Modern UI Components**: Menggunakan Radix UI dan custom components

### Theme & Styling

- **Dark/Light Mode Ready**: Support untuk theme switching
- **Consistent Design System**: Unified color palette dan typography
- **Interactive Elements**: Hover states, transitions, dan animations
- **Alert System**: User feedback dengan toast notifications

## 🔒 Security Features

### Authentication

- **Laravel Breeze**: Built-in authentication system
- **Protected Routes**: Middleware protection untuk authenticated users
- **User Ownership**: Data isolation per user
- **CSRF Protection**: Laravel's built-in CSRF protection

### Authorization

- **Ownership Checking**: Users hanya dapat mengakses data mereka sendiri
- **Resource Protection**: Controller-level authorization
- **Route Protection**: Middleware untuk route protection

## 📁 Project Structure

```
I-Tracker/
├── app/
│   ├── Http/
│   │   ├── Controllers/          # API Controllers
│   │   ├── Middleware/           # Custom middleware
│   │   └── Requests/             # Form request validation
│   └── Models/                   # Eloquent models
├── database/
│   ├── migrations/               # Database schema
│   └── seeders/                  # Database seeders
├── resources/
│   ├── js/
│   │   ├── components/           # Reusable React components
│   │   ├── layouts/              # Layout components
│   │   ├── pages/                # Page components
│   │   └── types/                # TypeScript type definitions
│   └── css/                      # Styling files
├── routes/                       # Application routes
└── tests/                        # Test files
```

## 🚀 Installation & Setup

### Prerequisites

- **PHP 8.2+**
- **Composer**
- **Node.js 18+**
- **NPM/Yarn**

### Steps

1. **Clone Repository**

```bash
git clone https://github.com/ifnuu01/I-Tracker.git
cd I-Tracker
```

2. **Install PHP Dependencies**

```bash
composer install
```

3. **Install Node Dependencies**

```bash
npm install
```

4. **Environment Setup**

```bash
cp .env.example .env
php artisan key:generate
```

5. **Database Setup**

```bash
php artisan migrate
php artisan db:seed  # Optional: untuk sample data
```

6. **Build Assets**

```bash
npm run build
# atau untuk development
npm run dev
```

7. **Start Development Server**

```bash
php artisan serve
```

## 💻 Development Commands

### Frontend Development

```bash
npm run dev          # Start Vite dev server
npm run build        # Build for production
npm run build:ssr    # Build with SSR
npm run lint         # Run ESLint
npm run format       # Format with Prettier
```

### Backend Development

```bash
php artisan serve                    # Start Laravel server
php artisan migrate                  # Run migrations
php artisan make:controller <name>   # Create controller
php artisan make:model <name>        # Create model
php artisan make:request <name>      # Create form request
```

### Testing

```bash
php artisan test     # Run all tests
./vendor/bin/pest    # Run Pest tests
```

## 📊 API Endpoints

### Resource Routes

- **Categories**: `/categories` (index, create, store, show, edit, update, destroy)
- **Topics**: `/topics` (index, create, store, show, edit, update, destroy)
- **Tasks**: `/tasks` (index, create, store, show, edit, update, destroy)
- **Projects**: `/projects` (index, create, store, show, edit, update, destroy)
- **Dashboard**: `/dashboard` (analytics dan statistics)

### Authentication Routes

- **Login**: `/login`
- **Register**: `/register`
- **Password Reset**: `/forgot-password`, `/reset-password`
- **Email Verification**: `/email/verify`

## 🔧 Configuration

### Database Configuration

Edit `.env` file untuk database settings:

```env
DB_CONNECTION=sqlite
DB_DATABASE=/absolute/path/to/database.sqlite
```

### Application Settings

```env
APP_NAME="I-Tracker"
APP_ENV=local
APP_DEBUG=true
APP_URL=http://localhost:8000
```

## 📈 Analytics Features

### Dashboard Metrics

- **Task Completion Rate**: Persentase tasks yang telah diselesaikan
- **Project Progress**: Status progress dari semua projects
- **Daily Activity**: Grafik aktivitas harian tasks dan projects
- **Recent Activity**: List aktivitas terbaru

### Chart & Visualization

- **Area Chart**: Visualisasi data produktivitas 7 hari terakhir
- **Progress Bars**: Visual progress untuk tasks dan projects
- **Status Indicators**: Color-coded status untuk quick identification
- **Interactive Tooltips**: Detailed information pada chart hover

## 🎯 Usage Examples

### Creating a Workflow

1. **Create Category** (e.g., "Web Development")
2. **Create Topic** under category (e.g., "E-commerce Project")
3. **Add Tasks** to topic (e.g., "Setup Laravel", "Design Database")
4. **Create Project** linked to topic (e.g., "Online Store")
5. **Track Progress** via dashboard analytics

### Managing Tasks

- Set **priority levels** untuk task organization
- Add **detailed notes** untuk context
- Mark tasks as **done/not done**
- Monitor progress via **dashboard metrics**

## 🤝 Contributing

### Development Guidelines

1. **Code Style**: Follow PSR-12 untuk PHP, Prettier untuk JavaScript/TypeScript
2. **Testing**: Write tests untuk new features
3. **Documentation**: Update documentation untuk changes
4. **Git Workflow**: Use feature branches dan pull requests

### Commit Convention

```
feat: add new task priority system
fix: resolve dashboard chart rendering issue
docs: update API documentation
refactor: optimize database queries
test: add unit tests for task controller
```

## 📄 License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**I-Tracker** dikembangkan sebagai solusi modern untuk manajemen produktivitas dan project tracking.

---
