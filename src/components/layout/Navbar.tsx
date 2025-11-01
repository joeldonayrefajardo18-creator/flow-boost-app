import { Link, useLocation } from 'react-router-dom';
import { CheckSquare, BarChart3, Settings, LogOut, Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { useNavigate } from 'react-router-dom';

export const Navbar = () => {
  const location = useLocation();
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    logout();
    navigate('/auth');
  };

  return (
    <nav className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <Link to="/dashboard" className="flex items-center gap-2 font-bold text-xl bg-gradient-primary bg-clip-text text-transparent">
              <CheckSquare className="h-6 w-6 text-primary" />
              TaskFlow
            </Link>

            <div className="hidden md:flex items-center gap-2">
              <Button
                variant={isActive('/dashboard') ? 'default' : 'ghost'}
                size="sm"
                asChild
              >
                <Link to="/dashboard">
                  <CheckSquare className="h-4 w-4 mr-2" />
                  Tasks
                </Link>
              </Button>
              
              <Button
                variant={isActive('/analytics') ? 'default' : 'ghost'}
                size="sm"
                asChild
              >
                <Link to="/analytics">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Analytics
                </Link>
              </Button>

              <Button
                variant={isActive('/settings') ? 'default' : 'ghost'}
                size="sm"
                asChild
              >
                <Link to="/settings">
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </Link>
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
            >
              {theme === 'light' ? (
                <Moon className="h-5 w-5" />
              ) : (
                <Sun className="h-5 w-5" />
              )}
            </Button>

            <div className="hidden md:flex items-center gap-3 px-3 py-1.5 bg-secondary rounded-full">
              <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center text-white font-semibold text-sm">
                {user?.username?.[0]?.toUpperCase()}
              </div>
              <span className="text-sm font-medium">{user?.username}</span>
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={handleLogout}
              title="Logout"
            >
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};
