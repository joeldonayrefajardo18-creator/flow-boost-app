import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { CheckSquare, ArrowRight, BarChart3, Zap, Shield } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();
  const { user, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && user) {
      navigate('/dashboard');
    }
  }, [user, isLoading, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <nav className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl">
            <CheckSquare className="h-6 w-6 text-primary" />
            <span className="bg-gradient-primary bg-clip-text text-transparent">TaskFlow</span>
          </div>
          <Button onClick={() => navigate('/auth')} variant="outline">
            Get Started
          </Button>
        </div>
      </nav>

      <main className="container mx-auto px-4">
        <section className="py-20 text-center animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
            Manage Tasks Like a Pro
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            TaskFlow helps you organize, prioritize, and complete your tasks efficiently with our
            intuitive Kanban board and powerful analytics
          </p>
          <Button onClick={() => navigate('/auth')} size="lg" className="gap-2 group">
            Start for Free
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </section>

        <section className="grid md:grid-cols-3 gap-8 py-20 animate-slide-up" style={{ perspective: '1000px' }}>
          <div className="group relative" style={{ transformStyle: 'preserve-3d' }}>
            <div className="relative p-8 rounded-xl border bg-card/50 backdrop-blur-sm transition-all duration-500 hover:shadow-2xl" 
                 style={{ 
                   transform: 'rotateX(0deg) rotateY(0deg)',
                   transition: 'transform 0.5s ease-out, box-shadow 0.3s ease-out'
                 }}
                 onMouseMove={(e) => {
                   const card = e.currentTarget;
                   const rect = card.getBoundingClientRect();
                   const x = e.clientX - rect.left;
                   const y = e.clientY - rect.top;
                   const centerX = rect.width / 2;
                   const centerY = rect.height / 2;
                   const rotateX = (y - centerY) / 10;
                   const rotateY = (centerX - x) / 10;
                   card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
                 }}
                 onMouseLeave={(e) => {
                   e.currentTarget.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
                 }}>
              <div className="flex flex-col items-center text-center">
                <div className="w-20 h-20 rounded-2xl bg-gradient-primary flex items-center justify-center mb-6 shadow-glow group-hover:scale-110 transition-transform duration-300" 
                     style={{ transform: 'translateZ(50px)' }}>
                  <Zap className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Drag & Drop Kanban</h3>
                <p className="text-muted-foreground">
                  Organize tasks visually with an intuitive drag-and-drop interface across To Do, In Progress, and Completed columns
                </p>
              </div>
            </div>
          </div>

          <div className="group relative" style={{ transformStyle: 'preserve-3d' }}>
            <div className="relative p-8 rounded-xl border bg-card/50 backdrop-blur-sm transition-all duration-500 hover:shadow-2xl"
                 style={{ 
                   transform: 'rotateX(0deg) rotateY(0deg)',
                   transition: 'transform 0.5s ease-out, box-shadow 0.3s ease-out'
                 }}
                 onMouseMove={(e) => {
                   const card = e.currentTarget;
                   const rect = card.getBoundingClientRect();
                   const x = e.clientX - rect.left;
                   const y = e.clientY - rect.top;
                   const centerX = rect.width / 2;
                   const centerY = rect.height / 2;
                   const rotateX = (y - centerY) / 10;
                   const rotateY = (centerX - x) / 10;
                   card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
                 }}
                 onMouseLeave={(e) => {
                   e.currentTarget.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
                 }}>
              <div className="flex flex-col items-center text-center">
                <div className="w-20 h-20 rounded-2xl bg-gradient-accent flex items-center justify-center mb-6 shadow-glow group-hover:scale-110 transition-transform duration-300"
                     style={{ transform: 'translateZ(50px)' }}>
                  <BarChart3 className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Smart Analytics</h3>
                <p className="text-muted-foreground">
                  Track your productivity with visual charts and insights. Monitor completion rates and task distribution
                </p>
              </div>
            </div>
          </div>

          <div className="group relative" style={{ transformStyle: 'preserve-3d' }}>
            <div className="relative p-8 rounded-xl border bg-card/50 backdrop-blur-sm transition-all duration-500 hover:shadow-2xl"
                 style={{ 
                   transform: 'rotateX(0deg) rotateY(0deg)',
                   transition: 'transform 0.5s ease-out, box-shadow 0.3s ease-out'
                 }}
                 onMouseMove={(e) => {
                   const card = e.currentTarget;
                   const rect = card.getBoundingClientRect();
                   const x = e.clientX - rect.left;
                   const y = e.clientY - rect.top;
                   const centerX = rect.width / 2;
                   const centerY = rect.height / 2;
                   const rotateX = (y - centerY) / 10;
                   const rotateY = (centerX - x) / 10;
                   card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
                 }}
                 onMouseLeave={(e) => {
                   e.currentTarget.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
                 }}>
              <div className="flex flex-col items-center text-center">
                <div className="w-20 h-20 rounded-2xl bg-gradient-success flex items-center justify-center mb-6 shadow-glow group-hover:scale-110 transition-transform duration-300"
                     style={{ transform: 'translateZ(50px)' }}>
                  <Shield className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Priority Management</h3>
                <p className="text-muted-foreground">
                  Set priorities and deadlines for tasks. Never miss important deadlines with our smart priority system
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 text-center">
          <div className="max-w-3xl mx-auto p-12 rounded-2xl bg-gradient-primary text-white animate-scale-in">
            <h2 className="text-3xl font-bold mb-4">Ready to boost your productivity?</h2>
            <p className="text-lg mb-6 text-white/90">
              Join thousands of users who organize their work with TaskFlow
            </p>
            <Button
              onClick={() => navigate('/auth')}
              size="lg"
              variant="secondary"
              className="gap-2"
            >
              Get Started Now
              <ArrowRight className="h-5 w-5" />
            </Button>
          </div>
        </section>
      </main>

      <footer className="border-t py-8 mt-20">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>© 2024 TaskFlow. Built with React, TypeScript, and TailwindCSS</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
