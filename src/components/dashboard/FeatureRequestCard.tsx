import { Lightbulb } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface FeatureRequestCardProps {
  title: string;
  mentions: number;
  sentiment: number;
}

const FeatureRequestCard = ({ title, mentions, sentiment }: FeatureRequestCardProps) => {
  return (
    <div className="p-6 rounded-xl border-2 border-primary/20 bg-gradient-card hover:shadow-lg transition-all">
      <div className="flex items-start gap-4">
        <div className="p-3 rounded-lg bg-primary/10">
          <Lightbulb className="w-6 h-6 text-primary" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Requests</span>
              <span className="font-medium">{mentions} mentions</span>
            </div>
            <div className="space-y-1">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Interest</span>
                <span className="font-medium text-primary">{sentiment}% Positive</span>
              </div>
              <Progress value={sentiment} className="h-2 bg-primary/10" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureRequestCard;
