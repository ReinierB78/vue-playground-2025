interface Todo {
  id?: string
  title: string
  description?: string
  category?: TodoCategory
  dueDate?: Date
  priority?: 'none' | 'low' | 'medium' | 'high'
  completed?: boolean
  createdAt?: Date
  updatedAt?: Date
  softDeletedAt?: Date
}

type TodoCategory = 'work' | 'personal' | 'shopping' | 'others' | unknown

export type { Todo, TodoCategory }
