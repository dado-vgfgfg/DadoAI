export type ModuleType = 'loyalty' | 'invitation' | 'menu';

export interface StudioProject {
  id: string;
  type: ModuleType;
  name: string;
  payload: Record<string, unknown>;
  updatedAt: string;
}

export interface LoyaltyPayload {
  businessName: string;
  rewardPoints: number;
  qrJoinUrl: string;
  customerMiniPage: string;
}

export interface InvitationPayload {
  title: string;
  date: string;
  mapEmbed: string;
  whatsappRsvp: string;
  gallery: string[];
}

export interface MenuPayload {
  restaurantName: string;
  categories: string[];
  allergens: string;
  items: Array<{ name: string; price: string; image: string }>;
}
