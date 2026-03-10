// Class Schedule management with localStorage persistence

export interface ClassSession {
  id: string;
  name: string;
  instructor: string;
  day: 'Lundi' | 'Mardi' | 'Mercredi' | 'Jeudi' | 'Vendredi' | 'Samedi' | 'Dimanche';
  startTime: string;
  endTime: string;
  maxCapacity: number;
  currentEnrollment: number;
  color: string;
  description: string;
}

export interface ClassRegistration {
  id: string;
  classId: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  registeredAt: string;
}

const SCHEDULE_KEY = 'forge_gym_schedule';
const REGISTRATIONS_KEY = 'forge_gym_class_registrations';

const defaultSchedule: ClassSession[] = [
  { id: '1', name: 'HIIT Extreme', instructor: 'Sarah Martin', day: 'Lundi', startTime: '07:00', endTime: '08:00', maxCapacity: 20, currentEnrollment: 15, color: 'bg-primary', description: 'Entraînement haute intensité' },
  { id: '2', name: 'Yoga Flow', instructor: 'Julie Moreau', day: 'Lundi', startTime: '09:00', endTime: '10:00', maxCapacity: 15, currentEnrollment: 12, color: 'bg-accent', description: 'Yoga dynamique' },
  { id: '3', name: 'CrossFit', instructor: 'Sarah Martin', day: 'Lundi', startTime: '18:00', endTime: '19:00', maxCapacity: 25, currentEnrollment: 22, color: 'bg-primary', description: 'Entraînement fonctionnel' },
  { id: '4', name: 'Boxe', instructor: 'Thomas Bernard', day: 'Mardi', startTime: '10:00', endTime: '11:00', maxCapacity: 16, currentEnrollment: 10, color: 'bg-destructive', description: 'Techniques de boxe' },
  { id: '5', name: 'Pilates', instructor: 'Julie Moreau', day: 'Mardi', startTime: '12:00', endTime: '13:00', maxCapacity: 15, currentEnrollment: 8, color: 'bg-accent', description: 'Renforcement profond' },
  { id: '6', name: 'Musculation Guidée', instructor: 'Marc Dupont', day: 'Mardi', startTime: '19:00', endTime: '20:00', maxCapacity: 12, currentEnrollment: 12, color: 'bg-secondary', description: 'Session encadrée' },
  { id: '7', name: 'HIIT Extreme', instructor: 'Sarah Martin', day: 'Mercredi', startTime: '07:00', endTime: '08:00', maxCapacity: 20, currentEnrollment: 18, color: 'bg-primary', description: 'Entraînement haute intensité' },
  { id: '8', name: 'MMA', instructor: 'Thomas Bernard', day: 'Mercredi', startTime: '18:00', endTime: '19:30', maxCapacity: 14, currentEnrollment: 11, color: 'bg-destructive', description: 'Arts martiaux mixtes' },
  { id: '9', name: 'Yoga Relax', instructor: 'Julie Moreau', day: 'Jeudi', startTime: '20:00', endTime: '21:00', maxCapacity: 15, currentEnrollment: 9, color: 'bg-accent', description: 'Relaxation et étirements' },
  { id: '10', name: 'CrossFit', instructor: 'Sarah Martin', day: 'Vendredi', startTime: '18:00', endTime: '19:00', maxCapacity: 25, currentEnrollment: 20, color: 'bg-primary', description: 'Entraînement fonctionnel' },
  { id: '11', name: 'Boxe', instructor: 'Thomas Bernard', day: 'Samedi', startTime: '10:00', endTime: '11:30', maxCapacity: 16, currentEnrollment: 14, color: 'bg-destructive', description: 'Techniques de boxe' },
  { id: '12', name: 'Yoga Flow', instructor: 'Julie Moreau', day: 'Dimanche', startTime: '10:00', endTime: '11:00', maxCapacity: 15, currentEnrollment: 10, color: 'bg-accent', description: 'Yoga dynamique' },
];

export const getSchedule = (): ClassSession[] => {
  try {
    const stored = localStorage.getItem(SCHEDULE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.error('Error loading schedule:', e);
  }
  return defaultSchedule;
};

export const saveSchedule = (schedule: ClassSession[]): void => {
  try {
    localStorage.setItem(SCHEDULE_KEY, JSON.stringify(schedule));
  } catch (e) {
    console.error('Error saving schedule:', e);
  }
};

export const addClass = (classData: Omit<ClassSession, 'id' | 'currentEnrollment'>): ClassSession => {
  const schedule = getSchedule();
  const newClass: ClassSession = {
    ...classData,
    id: crypto.randomUUID(),
    currentEnrollment: 0,
  };
  schedule.push(newClass);
  saveSchedule(schedule);
  return newClass;
};

export const updateClass = (id: string, updates: Partial<ClassSession>): ClassSession | null => {
  const schedule = getSchedule();
  const index = schedule.findIndex(c => c.id === id);
  if (index === -1) return null;
  
  schedule[index] = { ...schedule[index], ...updates };
  saveSchedule(schedule);
  return schedule[index];
};

export const deleteClass = (id: string): boolean => {
  const schedule = getSchedule();
  const filtered = schedule.filter(c => c.id !== id);
  if (filtered.length === schedule.length) return false;
  
  saveSchedule(filtered);
  return true;
};

// Registrations
export const getRegistrations = (): ClassRegistration[] => {
  try {
    const stored = localStorage.getItem(REGISTRATIONS_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.error('Error loading registrations:', e);
  }
  return [];
};

export const registerForClass = (classId: string, clientData: { name: string; email: string; phone: string }): ClassRegistration | null => {
  const schedule = getSchedule();
  const classSession = schedule.find(c => c.id === classId);
  
  if (!classSession || classSession.currentEnrollment >= classSession.maxCapacity) {
    return null;
  }
  
  const registrations = getRegistrations();
  const newReg: ClassRegistration = {
    id: crypto.randomUUID(),
    classId,
    clientName: clientData.name,
    clientEmail: clientData.email,
    clientPhone: clientData.phone,
    registeredAt: new Date().toISOString(),
  };
  
  registrations.push(newReg);
  localStorage.setItem(REGISTRATIONS_KEY, JSON.stringify(registrations));
  
  // Update enrollment count
  updateClass(classId, { currentEnrollment: classSession.currentEnrollment + 1 });
  
  return newReg;
};

export const cancelRegistration = (registrationId: string): boolean => {
  const registrations = getRegistrations();
  const reg = registrations.find(r => r.id === registrationId);
  if (!reg) return false;
  
  const filtered = registrations.filter(r => r.id !== registrationId);
  localStorage.setItem(REGISTRATIONS_KEY, JSON.stringify(filtered));
  
  // Update enrollment count
  const schedule = getSchedule();
  const classSession = schedule.find(c => c.id === reg.classId);
  if (classSession) {
    updateClass(reg.classId, { currentEnrollment: Math.max(0, classSession.currentEnrollment - 1) });
  }
  
  return true;
};

export const getScheduleByDay = (day: ClassSession['day']): ClassSession[] => {
  return getSchedule()
    .filter(c => c.day === day)
    .sort((a, b) => a.startTime.localeCompare(b.startTime));
};

export const DAYS: ClassSession['day'][] = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
