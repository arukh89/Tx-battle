import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, Target, Plus, Minus } from 'lucide-react';

interface PredictionInputProps {
  onSubmitPrediction?: (prediction: number) => void;
  currentPrediction?: number;
  isSubmitted?: boolean;
  timeRemaining?: number;
  suggestedRange?: { min: number; max: number };
}

export default function PredictionInput({ 
  onSubmitPrediction = (pred) => console.log('Prediction submitted:', pred),
  currentPrediction,
  isSubmitted = false,
  timeRemaining = 300,
  suggestedRange = { min: 2800, max: 3500 }
}: PredictionInputProps) {
  const [prediction, setPrediction] = useState(currentPrediction || 3000);
  const [hasSubmitted, setHasSubmitted] = useState(isSubmitted);

  const handleSubmit = () => {
    if (prediction > 0 && timeRemaining > 0) {
      onSubmitPrediction(prediction);
      setHasSubmitted(true);
      console.log('Prediction submitted:', prediction);
    }
  };

  const adjustPrediction = (delta: number) => {
    setPrediction(prev => Math.max(0, prev + delta));
  };

  const isInRange = prediction >= suggestedRange.min && prediction <= suggestedRange.max;

  return (
    <Card className="p-6 border-electric/20 bg-gradient-to-br from-card to-card/50 hover-elevate" data-testid="card-prediction">
      <div className="space-y-6">
        <div className="text-center">
          <h3 className="text-lg font-mono font-semibold flex items-center justify-center gap-2">
            <Target className="h-5 w-5 text-electric" />
            Your Prediction
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            Guess transactions in next block
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Badge variant={isInRange ? "default" : "destructive"} className="font-mono">
              {isInRange ? (
                <>
                  <TrendingUp className="h-3 w-3 mr-1" />
                  In Range
                </>
              ) : (
                <>
                  <TrendingDown className="h-3 w-3 mr-1" />
                  Outside Range
                </>
              )}
            </Badge>
            <p className="text-xs text-muted-foreground font-mono">
              Suggested: {suggestedRange.min.toLocaleString()}-{suggestedRange.max.toLocaleString()}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button 
              variant="outline" 
              size="icon"
              onClick={() => adjustPrediction(-100)}
              disabled={hasSubmitted || prediction <= 100}
              data-testid="button-decrease"
            >
              <Minus className="h-4 w-4" />
            </Button>
            
            <Input
              type="number"
              value={prediction}
              onChange={(e) => setPrediction(Math.max(0, parseInt(e.target.value) || 0))}
              className="text-center text-2xl font-mono font-bold h-14"
              disabled={hasSubmitted}
              data-testid="input-prediction"
            />
            
            <Button 
              variant="outline" 
              size="icon"
              onClick={() => adjustPrediction(100)}
              disabled={hasSubmitted}
              data-testid="button-increase"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          <Button 
            onClick={handleSubmit}
            disabled={hasSubmitted || timeRemaining <= 0 || prediction <= 0}
            className="w-full h-12 font-mono font-semibold text-lg bg-bitcoin hover:bg-bitcoin/90"
            data-testid="button-submit-prediction"
          >
            {hasSubmitted ? '✓ Prediction Submitted' : 'Submit Prediction'}
          </Button>
        </div>

        {hasSubmitted && (
          <div className="text-center p-4 bg-success/10 rounded-lg border border-success/20">
            <p className="text-success font-mono font-semibold" data-testid="text-prediction-confirmation">
              Prediction: {prediction.toLocaleString()} transactions
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Good luck! Results in {Math.floor(timeRemaining / 60)}:{(timeRemaining % 60).toString().padStart(2, '0')}
            </p>
          </div>
        )}
      </div>
    </Card>
  );
}