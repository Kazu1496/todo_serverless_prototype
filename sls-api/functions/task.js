import uuid from 'uuid'
import * as dynamoDbLib from '../libs/dynamodb-lib'
import { success, failure } from '../libs/response-lib'

const TableName = `todo-group-${process.env.DEPLOY_STAGE}`

export const createTask = async event => {
  const data = JSON.parse(event.body)
  const params = {
    TableName: TableName,
    Item: {
      group: 'task',
      groupId: `task_${uuid.v4()}`,
      ownerId: event.requestContext.identity.cognitoIdentityId,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      attributes: {
        title: data.title || 'title',
        description: data.description || '説明文がありません',
        list: data.list || 'BACKLOG',
        priority: data.priority || 1
      }
    }
  }

  try {
    await dynamoDbLib.call('put', params)
    return success(params.Item)
  } catch (e) {
    return failure(e)
  }
}

export const deleteTask = async event => {
  const params = {
    TableName: TableName,
    Key: {
      group: 'task',
      groupId: event.pathParameters.id
    }
  }

  try {
    await dynamoDbLib.call('delete', params)
    return success({ status: true })
  } catch (e) {
    return failure(e)
  }
}

export const getTask = async event => {
  const params = {
    TableName: TableName,
    Key: {
      groupId: event.pathParameters.id,
      group: 'task'
    }
  }

  try {
    const result = await dynamoDbLib.call('get', params)
    if (result.Item) {
      return success(result.Item)
    } else {
      return failure({ status: false, error: 'Item not found.' })
    }
  } catch (e) {
    return failure(e)
  }
}

export const updateTask = async event => {
  const data = JSON.parse(event.body)
  const params = {
    TableName: TableName,
    Key: {
      group: 'task',
      groupId: event.pathParameters.id
    },
    ExpressionAttributeNames: {
      '#a': 'attributes',
      '#uA': 'updatedAt'
    },
    ExpressionAttributeValues: {
      ':attributes': {
        title: data.title || 'title',
        description: data.description || '説明文がありません',
        list: data.list || 'BACKLOG',
        priority: data.priority || 1
      },
      ':updatedAt': Date.now()
    },
    UpdateExpression: 'SET #a = :attributes, #uA = :updatedAt',
    ReturnValues: 'ALL_NEW'
  }

  try {
    const result = await dynamoDbLib.call('update', params)
    return success(result.Attributes)
  } catch (e) {
    return failure(e)
  }
}

export const moveTask = async event => {
  const data = JSON.parse(event.body)
  const params = {
    TableName: TableName,
    Key: {
      group: 'task',
      groupId: event.pathParameters.id
    },
    ExpressionAttributeNames: {
      '#a': 'attributes',
      '#l': 'list',
      '#uA': 'updatedAt'
    },
    ExpressionAttributeValues: {
      ':list': data || 'BACKLOG',
      ':updatedAt': Date.now()
    },
    UpdateExpression: 'SET #a.#l = :list, #uA = :updatedAt',
    ReturnValues: 'ALL_NEW'
  }

  try {
    await dynamoDbLib.call('update', params)
    return success({ status: true })
  } catch (e) {
    return failure(e)
  }
}

export const findTasks = async event => {
  const params = {
    TableName: TableName,
    IndexName: 'group-ownerId-index',
    ExpressionAttributeNames: {
      '#group': 'group',
      '#ownerId': 'ownerId'
    },
    ExpressionAttributeValues: {
      ':group': 'task',
      ':ownerId': event.requestContext.identity.cognitoIdentityId
    },
    KeyConditionExpression: '#group = :group AND #ownerId = :ownerId'
  }

  try {
    const result = await dynamoDbLib.call('query', params)
    if (result.Count) {
      return success(result.Items)
    } else {
      return failure([])
    }
  } catch (e) {
    return failure(e)
  }
}

export const purgeTasks = async event => {
  const data = JSON.parse(event.body)
  const deleteList = []
  data.forEach(taskId => {
    const deleteObj = {
      DeleteRequest: {
        Key: {
          group: 'task',
          groupId: taskId
        }
      }
    }
    deleteList.push(deleteObj)
  })

  const params = {
    RequestItems: {
      [TableName]: deleteList
    }
  }

  try {
    await dynamoDbLib.call('batchWrite', params)
    return success({ status: true })
  } catch (e) {
    return failure(e)
  }
}
