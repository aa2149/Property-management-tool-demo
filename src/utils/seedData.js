import { collection, addDoc, getDocs, Timestamp } from 'firebase/firestore'
import { db } from '../firebase'

const SEED_ISSUES = [
  {
    ticketNumber: 'MNT-0001',
    property: 'Palm View Villa',
    category: 'AC/HVAC',
    urgency: 'High',
    description: 'AC unit in master bedroom not cooling. Temperature stuck at 28°C despite setting it to 20°C. Guests are complaining.',
    photoUrl: null, photoName: null,
    status: 'In Progress',
    submittedAt: Timestamp.fromDate(new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)),
  },
  {
    ticketNumber: 'MNT-0002',
    property: 'Marina Bay Suite',
    category: 'Plumbing',
    urgency: 'High',
    description: 'Bathroom tap in guest toilet is leaking continuously. Water pooling on floor creating a safety hazard.',
    photoUrl: null, photoName: null,
    status: 'Open',
    submittedAt: Timestamp.fromDate(new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)),
  },
  {
    ticketNumber: 'MNT-0003',
    property: 'Downtown Loft 4B',
    category: 'Electrical',
    urgency: 'High',
    description: 'Power socket in living room sparking when plugging in appliances. Tripped the circuit breaker twice.',
    photoUrl: null, photoName: null,
    status: 'Open',
    submittedAt: Timestamp.fromDate(new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)),
  },
  {
    ticketNumber: 'MNT-0004',
    property: 'Sunset Heights 12',
    category: 'Furniture',
    urgency: 'Medium',
    description: 'Dining table leg is cracked and wobbles badly. Guests have reported concern about it collapsing during meals.',
    photoUrl: null, photoName: null,
    status: 'Open',
    submittedAt: Timestamp.fromDate(new Date(Date.now() - 4 * 24 * 60 * 60 * 1000)),
  },
  {
    ticketNumber: 'MNT-0005',
    property: 'Garden Terrace A',
    category: 'Cleaning',
    urgency: 'Medium',
    description: 'Pool area needs thorough cleaning. Leaves and debris have accumulated overnight. Guests arriving tomorrow.',
    photoUrl: null, photoName: null,
    status: 'Resolved',
    submittedAt: Timestamp.fromDate(new Date(Date.now() - 5 * 24 * 60 * 60 * 1000)),
  },
  {
    ticketNumber: 'MNT-0006',
    property: 'Palm View Villa',
    category: 'Plumbing',
    urgency: 'Medium',
    description: 'Hot water pressure in the main bathroom shower is very low. Cold water is fine. Possibly a valve issue.',
    photoUrl: null, photoName: null,
    status: 'In Progress',
    submittedAt: Timestamp.fromDate(new Date(Date.now() - 6 * 24 * 60 * 60 * 1000)),
  },
  {
    ticketNumber: 'MNT-0007',
    property: 'Marina Bay Suite',
    category: 'Electrical',
    urgency: 'Low',
    description: 'Two ceiling light bulbs in the hallway are out. Not urgent but should be replaced before next check-in.',
    photoUrl: null, photoName: null,
    status: 'Resolved',
    submittedAt: Timestamp.fromDate(new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)),
  },
  {
    ticketNumber: 'MNT-0008',
    property: 'Downtown Loft 4B',
    category: 'Furniture',
    urgency: 'Low',
    description: 'TV remote control not working. Batteries replaced but still no response. May need replacement unit.',
    photoUrl: null, photoName: null,
    status: 'Open',
    submittedAt: Timestamp.fromDate(new Date(Date.now() - 8 * 24 * 60 * 60 * 1000)),
  },
  {
    ticketNumber: 'MNT-0009',
    property: 'Sunset Heights 12',
    category: 'AC/HVAC',
    urgency: 'Low',
    description: 'AC unit making a rattling noise when running but still cooling fine. Should be inspected on next routine visit.',
    photoUrl: null, photoName: null,
    status: 'Open',
    submittedAt: Timestamp.fromDate(new Date(Date.now() - 9 * 24 * 60 * 60 * 1000)),
  },
  {
    ticketNumber: 'MNT-0010',
    property: 'Garden Terrace A',
    category: 'Other',
    urgency: 'Medium',
    description: 'Entry keypad battery low — access code entry is intermittently failing. Guests locked out once already.',
    photoUrl: null, photoName: null,
    status: 'In Progress',
    submittedAt: Timestamp.fromDate(new Date(Date.now() - 10 * 24 * 60 * 60 * 1000)),
  },
]

export async function seedDemoData() {
  // Check if already seeded
  const snap = await getDocs(collection(db, 'maintenanceIssues'))
  if (!snap.empty) {
    return { alreadySeeded: true, count: snap.size }
  }

  // Insert all seed issues
  const promises = SEED_ISSUES.map(issue =>
    addDoc(collection(db, 'maintenanceIssues'), {
      ...issue,
      _author: 'Areej Ahmed',
      _github: 'https://github.com/aa2149',
      _task:   'Q5 — Demo Seed Data',
    })
  )
  await Promise.all(promises)
  return { alreadySeeded: false, count: SEED_ISSUES.length }
}