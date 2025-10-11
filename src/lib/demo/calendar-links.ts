interface CalendarLinkParams {
  title: string;
  description: string;
  location: string;
  startDate: string; // YYYY-MM-DD
  startTime: string; // HH:mm
  durationMinutes: number;
  timezone: string;
}

/**
 * Generates a Google Calendar URL for adding an event
 */
export function generateGoogleCalendarURL(params: CalendarLinkParams): string {
  const { title, description, location, startDate, startTime, durationMinutes, timezone } = params;

  // Parse start datetime in user's timezone
  const dateParts = startDate.split('-').map(Number);
  const timeParts = startTime.split(':').map(Number);
  const [year = 2025, month = 1, day = 1] = dateParts;
  const [hour = 0, minute = 0] = timeParts;
  const startDateTime = new Date(year, month - 1, day, hour, minute);

  // Calculate end time
  const endDateTime = new Date(startDateTime.getTime() + durationMinutes * 60000);

  // Format for Google Calendar (YYYYMMDDTHHmmss)
  const formatGoogleDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = '00';
    return `${year}${month}${day}T${hours}${minutes}${seconds}`;
  };

  const startFormatted = formatGoogleDate(startDateTime);
  const endFormatted = formatGoogleDate(endDateTime);

  const params_obj = {
    action: 'TEMPLATE',
    text: title,
    dates: `${startFormatted}/${endFormatted}`,
    details: description,
    location: location,
    ctz: timezone,
  };

  const queryString = Object.entries(params_obj)
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .join('&');

  return `https://calendar.google.com/calendar/render?${queryString}`;
}

/**
 * Generates an Outlook Calendar URL for adding an event
 */
export function generateOutlookURL(params: CalendarLinkParams): string {
  const { title, description, location, startDate, startTime, durationMinutes } = params;

  // Parse start datetime
  const dateParts = startDate.split('-').map(Number);
  const timeParts = startTime.split(':').map(Number);
  const [year = 2025, month = 1, day = 1] = dateParts;
  const [hour = 0, minute = 0] = timeParts;
  const startDateTime = new Date(year, month - 1, day, hour, minute);

  // Calculate end time
  const endDateTime = new Date(startDateTime.getTime() + durationMinutes * 60000);

  // Format for Outlook (ISO 8601)
  const startFormatted = startDateTime.toISOString();
  const endFormatted = endDateTime.toISOString();

  const params_obj = {
    subject: title,
    body: description,
    location: location,
    startdt: startFormatted,
    enddt: endFormatted,
    path: '/calendar/action/compose',
    rru: 'addevent',
  };

  const queryString = Object.entries(params_obj)
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .join('&');

  return `https://outlook.live.com/calendar/0/deeplink/compose?${queryString}`;
}
