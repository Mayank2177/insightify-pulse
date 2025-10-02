import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { TrendingUp, Sparkles, Target, Zap } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-10"></div>
        
        <div className="container mx-auto px-6 py-24 relative">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">
                AI-Powered Feedback Analytics
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
              Turn User Feedback Into
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                {" "}Actionable Insights
              </span>
            </h1>

            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Insightify analyzes feedback from multiple sources, identifies pain points,
              and surfaces feature requests—all in 60 seconds.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/auth">
                <Button variant="gradient" size="lg" className="text-lg px-8">
                  Start Free Trial
                  <TrendingUp className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link to="/auth">
                <Button variant="outline" size="lg" className="text-lg px-8">
                  Log In
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="p-6 rounded-xl bg-gradient-card border-2 border-border hover:shadow-lg transition-all">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <Target className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Identify Pain Points
            </h3>
            <p className="text-muted-foreground">
              AI automatically categorizes and prioritizes the most critical user issues
            </p>
          </div>

          <div className="p-6 rounded-xl bg-gradient-card border-2 border-border hover:shadow-lg transition-all">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <Sparkles className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Surface Feature Requests
            </h3>
            <p className="text-muted-foreground">
              Discover what users want most with sentiment analysis and trend tracking
            </p>
          </div>

          <div className="p-6 rounded-xl bg-gradient-card border-2 border-border hover:shadow-lg transition-all">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <Zap className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              60-Second Insights
            </h3>
            <p className="text-muted-foreground">
              Get actionable insights instantly without reading through hundreds of reviews
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
