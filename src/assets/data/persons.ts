export const persons = [
  {
    id: 1,
    name: 'Alice Johnson',
    dob: '1990-01-15',
    credits: 72
  },
  {
    id: 2,
    name: 'Bob Smith',
    dob: '1985-07-22',
    credits: 35
  },
  {
    id: 3,
    name: 'Charlie Brown',
    dob: '1992-11-08',
    credits: 91
  },
  {
    id: 4,
    name: 'David Lee',
    dob: '1988-03-12',
    credits: 17
  },
  {
    id: 5,
    name: 'Emily Wilson',
    dob: '1995-09-25',
    credits: 58
  },
  {
    id: 6,
    name: 'Frank Miller',
    dob: '1982-05-19',
    credits: 83
  },
  {
    id: 7,
    name: 'Grace Kim',
    dob: '1998-12-10',
    credits: 24
  },
  {
    id: 8,
    name: 'Henry Harris',
    dob: '1987-02-03',
    credits: 69
  },
  {
    id: 9,
    name: 'Isabella Martinez',
    dob: '1993-08-28',
    credits: 4
  },
  {
    id: 10,
    name: 'Jack Taylor',
    dob: '1989-04-21',
    credits: 97
  },
  {
    id: 11,
    name: 'Karen Nguyen',
    dob: '1996-10-14',
    credits: 32
  },
  {
    id: 12,
    name: 'Liam Anderson',
    dob: '1984-06-11',
    credits: 75
  }
]

interface Person {
  id: number
  name: string
  dob: string
  credits: number
}

export type { Person }
