import uuid from 'uuid'
import * as dynamoDbLib from '../libs/dynamodb-lib'
import { success, failure } from '../libs/response-lib'

const TableName = `Todo_${process.env.DEPLOY_STAGE}`

export const createTask = async event => {
  const params = {
    TableName: TableName,
    Item: {
      group: 'task',
      groupId: `task_${uuid.v4()}`,
      ownerId: event.requestContext.identity.cognitoIdentityId,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      attributes: {
        title: event.body.title,
        description: event.body.description,
        list: event.body.list,
        priority: event.body.priority
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
      groupId: `task_${event.pathParameters.taskId}`
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
      group: 'task',
      groupId: `task_${event.pathParameters.taskId}`
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
  const params = {
    TableName: TableName,
    Key: {
      group: 'task',
      groupId: `task_${event.pathParameters.taskId}`
    },
    ExpressionAttributeNames: {
      '#a': 'attributes',
      '#uA': 'updatedAt'
    },
    ExpressionAttributeValues: {
      ':attributes': {
        title: event.body.title || ' ',
        description: event.body.description || ' ',
        list: event.body.list || 'backlog',
        priority: event.body.priority || 0
      },
      ':updatedAt': Date.now()
    },
    UpdateExpression: 'SET #a = :attributes, #uA = :updatedAt',
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
      return failure({ status: false, error: 'Item not found.' })
    }
  } catch (e) {
    return failure(e)
  }
}
