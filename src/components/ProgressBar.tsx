import { Check } from 'lucide-react';
import * as Progress from '@radix-ui/react-progress';

interface ProgressBarProps {
  currentStep: number;
}

const steps = [
  { id: 1, name: 'Upload Screenshots' },
  { id: 2, name: 'Add Names' },
  { id: 3, name: 'Add Context' },
  { id: 4, name: 'Confirm & Analyze' },
];

export function ProgressBar({ currentStep }: ProgressBarProps) {
  const progress = ((currentStep - 1) / (steps.length - 1)) * 100;

  return (
    <div className="w-full max-w-3xl mx-auto mb-8">
      <Progress.Root
        className="relative overflow-hidden bg-gray-200 rounded-full w-full h-2 mb-4"
        value={progress}
      >
        <Progress.Indicator
          className="bg-red-500 w-full h-full transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${100 - progress}%)` }}
        />
      </Progress.Root>
      <div className="flex justify-between">
        {steps.map((step) => (
          <div
            key={step.id}
            className={`flex flex-col items-center ${
              step.id === currentStep
                ? 'text-red-500'
                : step.id < currentStep
                ? 'text-green-500'
                : 'text-gray-400'
            }`}
          >
            <div className="flex items-center justify-center w-8 h-8 mb-2 rounded-full border-2 border-current">
              {step.id < currentStep ? (
                <Check className="w-5 h-5" />
              ) : (
                <span>{step.id}</span>
              )}
            </div>
            <span className="text-sm text-center">{step.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}