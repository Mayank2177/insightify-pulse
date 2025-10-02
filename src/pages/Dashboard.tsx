import Navigation from "@/components/Navigation";
import PainPointCard from "@/components/dashboard/PainPointCard";
import FeatureRequestCard from "@/components/dashboard/FeatureRequestCard";
import StatCard from "@/components/dashboard/StatCard";
import { MessageSquare, ThumbsDown, Lightbulb, TrendingUp } from "lucide-react";
import { Card } from "@/components/ui/card";

const Dashboard = () => {
  const painPoints = [
    {
      title: "App Crash on Checkout",
      mentions: 125,
      sentiment: 95,
      trend: "up" as const,
    },
    {
      title: "Slow Loading Times",
      mentions: 89,
      sentiment: 87,
      trend: "up" as const,
    },
    {
      title: "Login Failures",
      mentions: 67,
      sentiment: 92,
      trend: "down" as const,
    },
  ];

  const featureRequests = [
    {
      title: "Dark Mode Support",
      mentions: 156,
      sentiment: 94,
    },
    {
      title: "Offline Mode",
      mentions: 103,
      sentiment: 88,
    },
    {
      title: "Export to PDF",
      mentions: 78,
      sentiment: 85,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
          <p className="text-muted-foreground">Your 60-second insight into user feedback</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <StatCard
            title="Total Feedback"
            value="1,284"
            icon={MessageSquare}
            trend="up"
          />
          <StatCard
            title="Pain Points"
            value="281"
            icon={ThumbsDown}
            sentiment="negative"
            trend="up"
          />
          <StatCard
            title="Feature Requests"
            value="337"
            icon={Lightbulb}
            sentiment="positive"
            trend="up"
          />
          <StatCard
            title="Weekly Growth"
            value="+24%"
            icon={TrendingUp}
            trend="up"
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Top 3 Pain Points */}
          <div>
            <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
              <ThumbsDown className="w-5 h-5 text-destructive" />
              Top 3 User Pain Points
            </h2>
            <div className="space-y-4">
              {painPoints.map((point, idx) => (
                <PainPointCard key={idx} {...point} />
              ))}
            </div>
          </div>

          {/* Top 3 Feature Requests */}
          <div>
            <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-primary" />
              Top 3 Feature Requests
            </h2>
            <div className="space-y-4">
              {featureRequests.map((request, idx) => (
                <FeatureRequestCard key={idx} {...request} />
              ))}
            </div>
          </div>
        </div>

        {/* Feedback Overview Chart */}
        <Card className="p-6 bg-gradient-card border-2">
          <h2 className="text-xl font-bold text-foreground mb-4">Feedback Overview</h2>
          <div className="h-64 flex items-center justify-center text-muted-foreground">
            <div className="text-center">
              <TrendingUp className="w-12 h-12 mx-auto mb-2 text-primary" />
              <p>Weekly feedback volume visualization</p>
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
};

export default Dashboard;
