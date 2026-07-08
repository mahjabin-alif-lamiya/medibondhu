// Sample doctor directory (static data for prototype)
// In production this would come from a MongoDB Atlas collection

export const doctors = [
  {
    id: 1,
    name: "Dr. Rafiqul Islam",
    specialty: "Cardiologist",
    hospital: "Chittagong Medical College Hospital",
    area: "Chattogram",
    phone: "01711000001",
    experience: "15 years",
  },
  {
    id: 2,
    name: "Dr. Sabrina Akter",
    specialty: "Cardiologist",
    hospital: "Imperial Hospital",
    area: "Chattogram",
    phone: "01711000002",
    experience: "10 years",
  },
  {
    id: 3,
    name: "Dr. Mahbubur Rahman",
    specialty: "Medicine Specialist",
    hospital: "Dhaka Medical College Hospital",
    area: "Dhaka",
    phone: "01711000003",
    experience: "12 years",
  },
  {
    id: 4,
    name: "Dr. Nusrat Jahan",
    specialty: "Medicine Specialist",
    hospital: "Square Hospital",
    area: "Dhaka",
    phone: "01711000004",
    experience: "8 years",
  },
  {
    id: 5,
    name: "Dr. Kamrul Hasan",
    specialty: "Dermatologist",
    hospital: "Chittagong General Hospital",
    area: "Chattogram",
    phone: "01711000005",
    experience: "9 years",
  },
  {
    id: 6,
    name: "Dr. Tanvir Ahmed",
    specialty: "Pediatrician",
    hospital: "Shishu Hospital",
    area: "Dhaka",
    phone: "01711000006",
    experience: "11 years",
  },
  {
    id: 7,
    name: "Dr. Farhana Yasmin",
    specialty: "Psychiatrist",
    hospital: "National Institute of Mental Health",
    area: "Dhaka",
    phone: "01711000007",
    experience: "14 years",
  },
  {
    id: 8,
    name: "Dr. Saiful Islam",
    specialty: "Orthopedic Specialist",
    hospital: "Chittagong Medical College Hospital",
    area: "Chattogram",
    phone: "01711000008",
    experience: "13 years",
  },
  {
    id: 9,
    name: "Dr. Rubaiya Haque",
    specialty: "Gynecologist",
    hospital: "Ibn Sina Hospital",
    area: "Dhaka",
    phone: "01711000009",
    experience: "10 years",
  },
  {
    id: 10,
    name: "Dr. Ashraful Alam",
    specialty: "ENT Specialist",
    hospital: "Parkview Hospital",
    area: "Chattogram",
    phone: "01711000010",
    experience: "7 years",
  },
];

// Find doctors whose specialty matches what the AI recommended
export function findDoctors(specialty) {
  if (!specialty) return [];

  const target = specialty.toLowerCase().trim();

  const exact = doctors.filter((doc) => doc.specialty.toLowerCase() === target);
  if (exact.length > 0) return exact;

  const loose = doctors.filter((doc) => {
    const docSpec = doc.specialty.toLowerCase();
    return docSpec.includes(target) || target.includes(docSpec.split(" ")[0]);
  });
  if (loose.length > 0) return loose;

  return doctors.filter((doc) => doc.specialty === "Medicine Specialist");
}