import { useAnalysisStore } from '../store/analysisStore';

interface StepConfig {
  id: number;
  label: string;
}

const steps: StepConfig[] = [
  { id: 1, label: 'Upload Screenshots' },
  { id: 2, label: 'Add Names' },
  { id: 3, label: 'Add Context' }
];

export function ProgressIndicator() {
  const currentStep = useAnalysisStore((state) => state.currentStep);

  const getStepImage = (stepId: number) => {
    if (stepId < currentStep) {
      return 'https://raw.githubusercontent.com/atareh/WITA/main/completed-progress.png';
    } else if (stepId === currentStep) {
      return 'https://raw.githubusercontent.com/atareh/WITA/main/active-progress.png';
    } else {
      return 'https://raw.githubusercontent.com/atareh/WITA/main/upcoming-progress.png';
    }
  };

  const getStepImageForConfirm = (stepId: number) => {
    // On the confirm page (step 4), show all steps as completed
    if (currentStep === 4) {
      return 'https://raw.githubusercontent.com/atareh/WITA/main/completed-progress.png';
    }
    return getStepImage(stepId);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#f3e9dc] py-6 px-4 border-t border-gray-200">
      <div className="flex items-center justify-between max-w-5xl mx-auto">
        {steps.map((step, index) => (
          <>
            <div className="text-center" key={step.id}>
              <img 
                src={getStepImageForConfirm(step.id)} 
                className="w-14 h-14 mx-auto" 
                alt={`${step.label} step`}
              />
              <p className={`font-bold mt-2 text-xs ${step.id > currentStep && currentStep !== 4 ? 'text-gray-500' : ''}`}>
                {step.label}
              </p>
            </div>
            {index < steps.length - 1 && (
              <div className="h-1 bg-black flex-grow mx-2" />
            )}
          </>
        ))}
      </div>
    </div>
  );
}