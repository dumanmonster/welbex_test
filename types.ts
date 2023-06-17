export interface Vehicle {
  id: string;
  location: Region;
  type: "ALL" | "CARGO" | "PASSENGER" | "SPECIAL";
  driver: Driver;
  
}

export interface Driver {
  id: string;
  name: string;
  phone: string;
}

export interface Region {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}
