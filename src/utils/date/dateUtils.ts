import { format, isToday as dateFnsIsToday, parseISO } from 'date-fns';

export const isToday = (dateString: string): boolean => {
  if (!dateString) return false;
  
  try {
    const date = parseISO(dateString);
    return dateFnsIsToday(date);
  } catch (error) {
    console.error('Error parsing date:', error);
    return false;
  }
};

export const formatDate = (dateString: string): string => {
  if (!dateString) return '';
  
  try {
    const date = parseISO(dateString);
    return format(date, 'PPpp');
  } catch (error) {
    console.error('Error formatting date:', error);
    return '';
  }
};