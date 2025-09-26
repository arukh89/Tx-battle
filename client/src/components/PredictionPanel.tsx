import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Clock, CheckCircle } from "lucide-react";

interface PredictionPanelProps {
  gameStatus: "waiting" | "active" | "completed";
  userPrediction?: string;
  onSubmitPrediction?: (prediction: string) => void;
  timeRemaining?: number;
}

export default function PredictionPanel({ 
  gameStatus, 
  userPrediction, 
  onSubmitPrediction,
  timeRemaining = 30
}: PredictionPanelProps) {
  const [prediction, setPrediction] = useState(userPrediction || "");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!prediction.trim()) return;
    
    setIsSubmitting(true);
    console.log('Submitting prediction:', prediction);
    try {
      await onSubmitPrediction?.(prediction);
    } finally {
      setIsSubmitting(false);
    }
  };

  const canSubmit = gameStatus === "waiting" && !userPrediction;
  const hasSubmitted = !!userPrediction;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-primary" />
          Make Your Prediction
        </CardTitle>
        {gameStatus === "active" && (
          <Badge variant="outline" className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {timeRemaining}s
          </Badge>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        {hasSubmitted ? (
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm text-chart-2">
              <CheckCircle className="w-4 h-4" />
              Prediction submitted
            </div>
            <div 
              className="p-3 bg-muted rounded-md text-sm"
              data-testid="text-user-prediction"
            >
              {userPrediction}
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <Textarea
              placeholder="What do you think will happen next? Make your prediction..."
              value={prediction}
              onChange={(e) => setPrediction(e.target.value)}
              disabled={!canSubmit}
              rows={3}
              data-testid="input-prediction"
            />
            <Button 
              onClick={handleSubmit}
              disabled={!canSubmit || !prediction.trim() || isSubmitting}
              className="w-full"
              data-testid="button-submit-prediction"
            >
              {isSubmitting ? "Submitting..." : "Submit Prediction"}
            </Button>
          </div>
        )}
        
        {gameStatus === "completed" && (
          <div className="text-center text-sm text-muted-foreground">
            Game completed - Results are in!
          </div>
        )}
      </CardContent>
    </Card>
  );
}