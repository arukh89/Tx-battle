import PredictionPanel from '../PredictionPanel';

export default function PredictionPanelExample() {
  return (
    <PredictionPanel 
      gameStatus="waiting"
      onSubmitPrediction={(prediction) => console.log('Prediction submitted:', prediction)}
      timeRemaining={45}
    />
  );
}