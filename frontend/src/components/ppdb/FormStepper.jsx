import { FiCheck } from 'react-icons/fi';

const FormStepper = ({ steps, currentStep }) => {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const isCompleted = currentStep > step.number;
          const isCurrent = currentStep === step.number;

          return (
            <div key={step.number} className="flex items-center flex-1">
              {/* Step Circle */}
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center font-semibold text-sm md:text-base transition-all duration-300 ${
                    isCompleted
                      ? 'bg-green-500 text-white'
                      : isCurrent
                      ? 'bg-primary-600 text-white ring-4 ring-primary-200'
                      : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {isCompleted ? (
                    <FiCheck className="w-5 h-5" />
                  ) : (
                    step.number
                  )}
                </div>
                <span
                  className={`mt-2 text-xs md:text-sm font-medium text-center hidden sm:block ${
                    isCurrent
                      ? 'text-primary-600'
                      : isCompleted
                      ? 'text-green-600'
                      : 'text-gray-500'
                  }`}
                >
                  {step.title}
                </span>
              </div>

              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="flex-1 mx-2 md:mx-4 h-1 bg-gray-200 rounded-full overflow-hidden hidden sm:block">
                  <div
                    className={`h-full transition-all duration-500 ${
                      isCompleted ? 'bg-green-500 w-full' : 'bg-gray-200 w-0'
                    }`}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Mobile Step Title */}
      <div className="mt-4 text-center sm:hidden">
        <p className="text-sm font-medium text-primary-600">
          Step {currentStep}: {steps[currentStep - 1]?.title}
        </p>
      </div>
    </div>
  );
};

export default FormStepper;
