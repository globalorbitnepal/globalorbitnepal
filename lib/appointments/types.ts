import type {
  AppointmentReferral,
  AppointmentService,
  AppointmentStudio,
} from "@/lib/appointments/constants";

export type AppointmentRecord = {
  id: string;
  createdAt: string;
  read: boolean;
  fullName: string;
  whatsapp: string;
  country: string;
  city: string;
  mobile: string;
  officeEmail: string;
  studio: AppointmentStudio;
  services: AppointmentService[];
  referral: AppointmentReferral;
  specialRequest: string;
};

export type AppointmentInput = Omit<AppointmentRecord, "id" | "createdAt" | "read">;
