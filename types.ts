export interface Vehicle {
  id: string;
  location: string;
  type: "ALL" | "CARGO" | "PASSENGER" | "SPECIAL";
  driver: Driver;
}

export interface Driver {
  id: string;
  name: string;
  phone: string;
}
