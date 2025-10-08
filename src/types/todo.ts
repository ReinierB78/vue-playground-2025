interface Todo {
  id?: number
  title: string
  description?: string
  category?: TodoCategory
  dueDate?: Date
  priority?: 'low' | 'medium' | 'high'
  completed?: boolean
  createdAt?: Date
  updatedAt?: Date
  softDeletedAt?: Date
}

type TodoCategory = 'work' | 'personal' | 'shopping' | 'others'

export type { Todo, TodoCategory }
