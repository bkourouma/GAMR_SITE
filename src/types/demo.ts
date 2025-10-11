// Re-export Zod-inferred types from schema
export type {
  DemoRequest,
  TimeSlot,
  Role,
  Sector,
  Standard,
  Goal,
  TeamSize,
  Import,
  Module,
  MeetingTool,
  Mode,
  Language,
} from '@/lib/demo/schema';

// Additional types for API responses
export interface DemoRequestSuccessResponse {
  success: true;
  data: {
    id: string;
    message: string;
    calendarLinks: {
      icsDownload: string;
      googleCalendar: string;
      outlook: string;
    };
    summary: {
      fullName: string;
      organization: string;
      email: string;
      slot1: {
        date: string;
        time: string;
        timezone: string;
      };
      meetingTool: string;
    };
  };
}

export interface DemoRequestErrorResponse {
  success: false;
  error: {
    message: string;
    code: string;
    fields?: Record<string, string[]>;
  };
}

export type DemoRequestResponse = DemoRequestSuccessResponse | DemoRequestErrorResponse;
