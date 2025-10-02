import Navigation from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, ThumbsDown, ThumbsUp, Minus } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface FeedbackItem {
  id: number;
  source: "Play Store" | "App Store" | "CSV";
  sentiment: "positive" | "negative" | "neutral";
  theme: string;
  comment: string;
  date: string;
}

const mockFeedback: FeedbackItem[] = [
  {
    id: 1,
    source: "Play Store",
    sentiment: "negative",
    theme: "App Crash on Checkout",
    comment: "The app keeps crashing whenever I try to checkout. Very frustrating!",
    date: "2025-09-28",
  },
  {
    id: 2,
    source: "App Store",
    sentiment: "positive",
    theme: "Great UI",
    comment: "Love the clean interface! Easy to navigate and very intuitive.",
    date: "2025-09-27",
  },
  {
    id: 3,
    source: "CSV",
    sentiment: "negative",
    theme: "Slow Loading Times",
    comment: "Pages take forever to load. Need better performance optimization.",
    date: "2025-09-27",
  },
  {
    id: 4,
    source: "Play Store",
    sentiment: "neutral",
    theme: "Feature Request",
    comment: "Would be nice to have dark mode. Otherwise, decent app.",
    date: "2025-09-26",
  },
];

const Inbox = () => {
  const [selectedFeedback, setSelectedFeedback] = useState<FeedbackItem | null>(
    mockFeedback[0]
  );

  const getSentimentIcon = (sentiment: FeedbackItem["sentiment"]) => {
    switch (sentiment) {
      case "positive":
        return <ThumbsUp className="w-4 h-4 text-success" />;
      case "negative":
        return <ThumbsDown className="w-4 h-4 text-destructive" />;
      default:
        return <Minus className="w-4 h-4 text-warning" />;
    }
  };

  const getSentimentBadge = (sentiment: FeedbackItem["sentiment"]) => {
    const variants = {
      positive: "bg-success/10 text-success border-success/20",
      negative: "bg-destructive/10 text-destructive border-destructive/20",
      neutral: "bg-warning/10 text-warning border-warning/20",
    };
    return variants[sentiment];
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container mx-auto px-6 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground mb-2">Feedback Inbox</h1>
          <p className="text-muted-foreground">View and analyze raw user feedback</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sidebar - Feedback List */}
          <div className="lg:col-span-1">
            <Card className="p-4 bg-gradient-card border-2">
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search feedback..."
                  className="pl-10"
                />
              </div>

              <div className="space-y-2">
                {mockFeedback.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setSelectedFeedback(item)}
                    className={cn(
                      "w-full text-left p-3 rounded-lg border-2 transition-all hover:shadow-md",
                      selectedFeedback?.id === item.id
                        ? "border-primary bg-accent"
                        : "border-transparent bg-card hover:bg-accent/50"
                    )}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline" className="text-xs">
                        {item.source}
                      </Badge>
                      {getSentimentIcon(item.sentiment)}
                    </div>
                    <p className="text-sm font-medium text-foreground line-clamp-2">
                      {item.comment}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">{item.date}</p>
                  </button>
                ))}
              </div>
            </Card>
          </div>

          {/* Main - Feedback Detail */}
          <div className="lg:col-span-2">
            {selectedFeedback ? (
              <Card className="p-6 bg-gradient-card border-2">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <Badge
                      variant="outline"
                      className={cn("mb-2", getSentimentBadge(selectedFeedback.sentiment))}
                    >
                      {selectedFeedback.sentiment}
                    </Badge>
                    <h2 className="text-2xl font-bold text-foreground mb-2">
                      {selectedFeedback.theme}
                    </h2>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>Source: {selectedFeedback.source}</span>
                      <span>•</span>
                      <span>{selectedFeedback.date}</span>
                    </div>
                  </div>
                  {getSentimentIcon(selectedFeedback.sentiment)}
                </div>

                <div className="prose max-w-none">
                  <p className="text-foreground leading-relaxed">
                    {selectedFeedback.comment}
                  </p>
                </div>

                <div className="mt-6 p-4 bg-accent/30 rounded-lg border border-border">
                  <h3 className="font-semibold text-sm text-foreground mb-2">
                    AI Analysis
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    This feedback has been automatically categorized under "
                    {selectedFeedback.theme}" based on keyword analysis and sentiment
                    detection.
                  </p>
                </div>
              </Card>
            ) : (
              <Card className="p-12 flex items-center justify-center">
                <p className="text-muted-foreground">Select feedback to view details</p>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Inbox;
