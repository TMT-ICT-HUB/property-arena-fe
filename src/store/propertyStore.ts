import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
// import { PropertyFormData } from '@/types';
import { PROPERTY_SERVICE } from '@/services/property';
import { PropertyFormData } from '@/types/property';
import { MediaItem } from '@/components/property/PropertyGalleryStep';

interface PropertyStore {
  // Form data state
  formData: PropertyFormData;
  currentStep: string;
  isSubmitting: boolean;

  // Actions
  updateFormData: (stepData: Partial<PropertyFormData>) => void;
  setCurrentStep: (step: string) => void;
  resetForm: () => void;
  submitProperty: () => Promise<void>;

  // Validation
  isStepValid: (step: string) => boolean;
  canProceedToStep: (step: string) => boolean;
}

const initialFormData: PropertyFormData = {
  title: '',
  propertyType: '',
  address: '',
  description: '',
  price: 0,
  oldPrice: 0,
  pricePrefixText: 'For Sale',
  pricePostfixText: '',
  propertyId: '',
  status: 'For Sale',
  landAreaPostfix: '',
  garagesOrParkingSpaces: 0,
  landArea: 0,
  location: '',
  bedroom: '',
  media: [],
  features: [],
  agentId: '',
  reviewNotes: '',
  agentDisplayOption: 'none',
  selectedAgentId: '',
};

export const usePropertyStore = create<PropertyStore>()(
  devtools(
    (set, get) => ({
      formData: initialFormData,
      currentStep: 'Basic',
      isSubmitting: false,

      updateFormData: (stepData) => {
        set((state) => ({
          formData: { ...state.formData, ...stepData }
        }));
      },

      setCurrentStep: (step) => {
        set({ currentStep: step });
      },

      resetForm: () => {
        set({
          formData: initialFormData,
          currentStep: 'Basic',
          isSubmitting: false
        });
      },

      submitProperty: async () => {
        const { formData } = get();

        set({ isSubmitting: true });

        try {
          console.log("Form data: ", formData)
          const response = await PROPERTY_SERVICE.createProperty({
            propertyData: formData
          });

          // Handle successful submission
          console.log('Property created successfully:', response);

          // Reset form or redirect
          get().resetForm();

          // You might want to navigate to the property page or show success message
          // window.location.href = `/property/${response.id}`;

        } catch (error) {
          console.error('Failed to create property:', error);
          throw error;
        } finally {
          set({ isSubmitting: false });
        }
      },

      // Validation helpers
      isStepValid: (step) => {
        const { formData } = get();

        switch (step) {
          case 'Basic':
            return (
              formData.title.trim() !== '' &&
              formData.address.trim() !== '' &&
              formData.description.trim() !== '' &&
              formData.price > 0 &&
              formData.pricePrefixText.trim() !== '' &&
              formData.pricePostfixText.trim() !== '' &&
              formData.propertyId.trim() !== '' &&
              formData.status.trim().toLowerCase() !== '' &&
              formData.propertyType.trim().toLowerCase() !== ''
            );
          case 'Gallery':
            return formData.media.length > 0;
          case 'Features':
            return formData.features.length > 0;
          case 'Agent & Review':
            return true;
          default:
            return false;
        }
      },      

      canProceedToStep: (targetStep) => {
        const steps = ['Basic', 'Gallery', 'Features', 'Agent & Review'];
        const currentIndex = steps.indexOf(get().currentStep);
        const targetIndex = steps.indexOf(targetStep);

        // Can always go back
        if (targetIndex <= currentIndex) return true;

        // Can only proceed if current step is valid
        return get().isStepValid(get().currentStep);
      }
    }),
    { name: 'property-store' }
  )
);
