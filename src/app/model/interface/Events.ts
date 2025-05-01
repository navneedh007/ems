
export interface Ievents{
    eventID: number;
    name: string;
    categoryID: number;
    locationID: number;
    startDate: string;
    endDate: string;
    userID: number;
    description: string;
    isPrice: boolean;
    price: number;
    isActive: boolean;
    bookedCapacity: number;
}