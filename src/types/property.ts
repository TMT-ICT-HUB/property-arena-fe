import { MediaItem } from "@/components/property/PropertyGalleryStep";

export interface PropertyFormData {
  title: string;
  propertyType: string;
  address: string;
  description: string;
  price: number;
  oldPrice?: number;
  pricePrefixText: string;
  pricePostfixText: string;
  propertyId: string;
  status: string;
  landAreaPostfix: string;
  garagesOrParkingSpaces: number;
  landArea: number;
  location: string;
  bedroom: string;

  // Gallery
  media: MediaItem[];

  // Features
  features: string[];

  // Agent & Review
  agentId?: string;
  agentDisplayOption: 'none',
  selectedAgentId: '',
  reviewNotes: '',
}

export interface CreatePropertyRequest {
  propertyData: PropertyFormData;
}

export interface CreatePropertyResponse {
  id: string;
  message: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  property: any;
}
