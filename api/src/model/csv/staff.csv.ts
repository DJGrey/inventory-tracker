export class StaffCsvRow {
  staff_id: string;
  name: string;
  dob: string;
  role: 'Back-of-house' | 'Front-of-house' | 'Chef' | 'Manager';
  iban: string;
  bic: string;
  location_id: string;
}
