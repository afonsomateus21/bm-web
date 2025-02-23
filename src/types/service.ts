enum ServicesCategory {
  FootAndHand = "FOOT_HAND",
  Hair = "HAIR",
  Extension = "EXTENSION"
}

export interface Service {
  id: string;
  title: string;
  description: string;
  category: ServicesCategory;
  professionalId: string;
  duration: number;
  price: number;
  photo?: string;
}