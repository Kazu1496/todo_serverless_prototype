import { TaskListEnum } from './types/index'

export const formatListName = name => {
  return TaskListEnum[name]
}
