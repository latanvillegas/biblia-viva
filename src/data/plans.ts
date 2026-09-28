export type ReadingPlanDay = { day: number; title: string; passages: string[] };
export type ReadingPlan = { id: string; title: string; description: string; durationDays: number; days: ReadingPlanDay[] };

export const readingPlans: ReadingPlan[] = [
  {
    id: 'conoce-a-jesus-7', title: 'Conoce a Jesús', durationDays: 7,
    description: 'Siete días recorriendo pasajes clave de los Evangelios.',
    days: [
      { day: 1, title: 'El comienzo', passages: ['Juan 1'] },
      { day: 2, title: 'El llamado', passages: ['Marcos 1'] },
      { day: 3, title: 'Las bienaventuranzas', passages: ['Mateo 5'] },
      { day: 4, title: 'Fe en medio de la tormenta', passages: ['Marcos 4'] },
      { day: 5, title: 'El buen pastor', passages: ['Juan 10'] },
      { day: 6, title: 'La cruz', passages: ['Lucas 23'] },
      { day: 7, title: 'La resurrección', passages: ['Juan 20'] },
    ],
  },
  {
    id: 'salmos-5', title: 'Cinco días en los Salmos', durationDays: 5,
    description: 'Una introducción breve a oración, confianza y alabanza.',
    days: [1, 2, 3, 4, 5].map((day) => ({ day, title: `Día ${day}`, passages: [`Salmos ${[1, 23, 27, 46, 121][day - 1]}`] })),
  },
];
