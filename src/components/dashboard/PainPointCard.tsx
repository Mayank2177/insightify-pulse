import { AlertCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface PainPointCardProps {
  title: string;
  mentions: number;
  sentiment: number;
  trend: "up" | "down";
}

const PainPointCard = ({ title, mentions, sentiment, trend }: PainPointCardProps) => {
  return (
    <div className="p-6 rounded-xl border-2 border-destructive/20 bg-gradient-card hover:shadow-lg transition-all">
      <div className="flex items-start gap-4">
        <div className="p-3 rounded-lg bg-destructive/10">
          <AlertCircle className="w-6 h-6 text-destructive" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Volume</span>
              <span className="font-medium">{mentions} mentions this week</span>
            </div>
            <div className="space-y-1">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Sentiment</span>
                <span className="font-medium text-destructive">{sentiment}% Negative</span>
              </div>
              <Progress value={sentiment} className="h-2 bg-destructive/10" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PainPointCard;
