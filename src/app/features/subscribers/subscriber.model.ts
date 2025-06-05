export interface Subscriber {
  id: number;
  subscriberNameEn: string;
  subscriberNameAr: string;
  planId: number;
  subscriberType: number;
  status: number;
  issueDate?: string;
  phoneNo?: string;
  nationalID?: string;
  email?: string;
  resNo?: string;
  createdAt?: string;
  createdBy?: number;
  updatedAt?: string;
  updatedBy?: number;
}
