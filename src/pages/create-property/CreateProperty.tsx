import StepTopBar from "./CreatePropertyTopBar";
import { usePropertyStore } from "@/store/propertyStore";
import PropertyGalleryStep from "@/components/property/PropertyGalleryStep";
import PropertyFeaturesStep from "@/components/property/PropertyFeatureStep";
import PropertyAgentReviewStep from "@/components/property/PropertyAgentReviewStep";
import FormFieldBox from "@/components/FormField";

const CreateProperty = () => {
  const {
    formData,
    currentStep,
    isSubmitting,
    updateFormData,
    setCurrentStep,
    submitProperty,
    isStepValid,
    canProceedToStep
  } = usePropertyStore();

  const steps = ['Basic', 'Gallery', 'Features', 'Agent & Review'];
  const currentStepIndex = steps.indexOf(currentStep);
  const isLastStep = currentStepIndex === steps.length - 1;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleInputChange = (field: string, value: any) => {
    updateFormData({ [field]: value });
  };

  const handleNext = () => {
    if (!isLastStep) {
      const nextStep = steps[currentStepIndex + 1];
      setCurrentStep(nextStep);
    }
  };

  const handleSubmit = async () => {
    try {
      await submitProperty();
      // Handle success (show toast, redirect, etc.)
    } catch (error) {
      // Handle error (show error message, etc.)
      console.error('Submission failed:', error);
    }
  };

  return (
    <div className="flex justify-center mt-24">
      <div className="main main-con-style">
        <div className="">
          <h1 className="text-2xl font-semibold mb-6 p-4">Post Property</h1>
          <StepTopBar
            activeStep={currentStep}
            setActiveStep={setCurrentStep}
            canProceedToStep={canProceedToStep}
          />
        </div>

        {/* Content Area - Each tab has its own clean view */}
        <div className="min-h-[500px] pb-20"> {/* Added padding bottom for navigation */}
          {currentStep === "Basic" && (
            <div className="space-y-4 p-[5%]">
              {/* Full Width Fields */}
              <div className="flex flex-wrap gap-4 mb-6">
                 <FormFieldBox label="Property Title" fullWidth>
                   <input
                     type="text"
                    className="w-full shadow-md p-2 rounded-md"
                     value={formData.title}
                    onChange={e => handleInputChange('title', e.target.value)}
                     placeholder="e.g. Spacious Apartment"
                   />
                 </FormFieldBox>
              
                 <FormFieldBox label="Address" fullWidth>
                   <input
                     type="text"
                     className="w-full shadow-md p-2 rounded-md"
                     value={formData.address}
                     onChange={e => handleInputChange('address', e.target.value)}
                     placeholder="Property address"
                   />
                 </FormFieldBox>
              
                 <FormFieldBox label="Description" fullWidth>
                   <textarea
                     className="w-full shadow-md p-2 rounded-md"
                     rows={4}
                     value={formData.description}
                     onChange={e => handleInputChange('description', e.target.value)}
                     placeholder="Property description"
                  />
                 </FormFieldBox>
              </div>

              {/* 3 Columns Grid */}

              <div className="flex flex-wrap gap-4" >
                <FormFieldBox label="Sale or Rent Price">
                  <input
                    type="number"
                    className="w-full shadow-md p-2 rounded-md"
                    value={formData.price}
                    onChange={e => handleInputChange('price', Number(e.target.value))}
                    placeholder="e.g. 500000"
                  />
                </FormFieldBox>

                <FormFieldBox label="Old Price">
                  <input
                    type="number"
                    className="w-full shadow-md p-2 rounded-md"
                    value={formData.oldPrice}
                    onChange={e => handleInputChange('oldPrice', Number(e.target.value))}
                    placeholder="e.g. 600000"
                  />
                </FormFieldBox>

                <FormFieldBox label="Price Prefix Text (Example: Starting from)">
                  <input
                    type="text"
                    className="w-full shadow-md p-2 rounded-md"
                    value={formData.pricePrefixText}
                    onChange={e => handleInputChange('pricePrefixText', e.target.value)}
                    placeholder="Starting from"
                  />
                </FormFieldBox>
                <FormFieldBox label="Price Postfix Text (Example: Per Month)">
                  <input
                    type="text"
                    className="w-full shadow-md p-2 rounded-md"
                    value={formData.pricePostfixText}
                    onChange={e => handleInputChange('pricePostfixText', e.target.value)}
                    placeholder="Per Month"
                  />
                </FormFieldBox>
                <FormFieldBox label="Property ID">
                  <input
                    type="text"
                    className="w-full shadow-md p-2 rounded-md"
                    value={formData.propertyId}
                    onChange={e => handleInputChange('propertyId', e.target.value)}
                    placeholder="Property ID"
                  />
                </FormFieldBox>
                <FormFieldBox label="Property Type">
                  <select
                    className="w-full shadow-md p-2 rounded-md"
                    value={formData.propertyType}
                    onChange={e => handleInputChange('propertyType', e.target.value)}
                  >
                    <option value="sale">Duplex</option>
                    <option value="rent">Land</option>
                    <option value="lease">Apartments</option>
                  </select>
                </FormFieldBox>
                <FormFieldBox label="Status" >
                  <select
                    className="w-full shadow-md p-2 rounded-md"
                    value={formData.status}
                    onChange={e => handleInputChange('status', e.target.value)}
                  >
                    <option value="available" > Available </option>
                    <option value="pending" > Pending </option>
                    < option value="sold" > Sold </option>
                    < option value="rented" > Rented </option>
                  </select>
                </FormFieldBox>
                <FormFieldBox label="Location" >
                  <input
                    className="w-full shadow-md p-2 rounded-md"
                    value={formData.location}
                    onChange={e => handleInputChange('location', e.target.value)}
                    // disabled={true}
                  />conso
                </FormFieldBox>
                <FormFieldBox label="Bedroom" >
                  <select
                    className="w-full shadow-md p-2 rounded-md"
                    value={formData.bedroom}
                    onChange={e => handleInputChange('bedroom', e.target.value)}
                    // disabled={true}
                  >
                    <option value="Available" > Available </option>
                    < option value="Sold" > Sold </option>
                    < option value="Rented" > Rented </option>
                  </select>
                </FormFieldBox>
                < FormFieldBox label="Land Area Postfix" >
                  <input
                    type="number"
                    className="w-full shadow-md p-2 rounded-md"
                    value={formData.landAreaPostfix}
                    onChange={e => handleInputChange('landAreaPostfix', e.target.value)
                    }
                    placeholder=""
                  />
                </FormFieldBox>
                <FormFieldBox label="Garages or Parking spaces">
                  <input
                    type="text"
                    className="w-full shadow-md p-2 rounded-md"
                    value={formData.garagesOrParkingSpaces}
                    onChange={e => handleInputChange('garagesOrParkingSpaces', e.target.value)}
                    placeholder=""
                  />
                </FormFieldBox>
                <FormFieldBox label="Land Area">
                  <input
                    type="text"
                    className="w-full shadow-md p-2 rounded-md"
                    value={formData.landArea}
                    onChange={e => handleInputChange('landArea', e.target.value)}
                    placeholder=""
                  />
                </FormFieldBox>
              </div>
            </div>
          )}

          {currentStep === 'Gallery' && (
            <PropertyGalleryStep
              media={formData.media ?? []}
              onChange={(media) => handleInputChange('media', media)}
            />
          )}

          {currentStep === 'Features' && (
            <PropertyFeaturesStep
              features={formData.features}
              onChange={(list) => handleInputChange('features', list)}
            />
          )}

          {currentStep === "Agent & Review" && (
            <PropertyAgentReviewStep
              agentDisplayOption={formData.agentDisplayOption}
              selectedAgentId={formData.selectedAgentId}
              // reviewNotes={formData.reviewNotes}
              onOptionChange={value => handleInputChange('agentDisplayOption', value)}
              onAgentSelect={id => handleInputChange('selectedAgentId', id)}
              // onReviewNotesChange={notes => handleInputChange('reviewNotes', notes)}
            />
          )}
        </div>

        {/* Navigation Buttons - Fixed at bottom */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4 flex justify-between items-center">
          <div>
            {currentStepIndex > 0 && (
              <button
                onClick={() => setCurrentStep(steps[currentStepIndex - 1])}
                className="px-6 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Previous
              </button>
            )}
          </div>

          <div>
            {!isLastStep ? (
              <button
                onClick={handleNext}
                disabled={!isStepValid(currentStep)}
                className="px-6 py-2 bg-primary-red text-white rounded-md hover:bg-secondary-red disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={isSubmitting || !isStepValid(currentStep)}
                className="px-6 py-2 bg-primary-red text-white rounded-md hover:bg-secondary-red disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Creating Property...' : 'Create Property'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateProperty;