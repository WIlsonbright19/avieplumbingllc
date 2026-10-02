export interface ServiceItem {
  id: string;
  title: string;
  category: string;
  shortDesc: string;
  fullDesc: string;
  specs: { label: string; value: string }[];
  image: string;
  actionLabel: string;
}

export interface BookingData {
  serviceId?: string;
  serviceName?: string;
  serviceType?: string;
  fullName: string;
  phone: string;
  address: string;
  urgency: 'routine' | 'priority' | 'emergency' | 'standard';
  notes?: string;
}

export interface InspectionStep {
  id: string;
  title: string;
  headline: string;
  description: string;
  metrics: { label: string; value: string }[];
}
