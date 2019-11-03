import uuid from 'uuid'
import * as dynamoDbLib from '../libs/dynamodb-lib'
import { success, failure } from '../libs/response-lib'

export const createTask = async event => {
  const params = {
    TableName: `Todo_${process.env.DEPLOY_STAGE}`,
    Item: {
      taskId: uuid.v4(),
      title: event.body.title,
      description: event.body.description,
      list: event.body.list,
      userId: event.requestContext.identity.cognitoIdentityId,
      createdAt: Date.now(),
      updatedAt: Date.now()
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
    TableName: `Todo_${process.env.DEPLOY_STAGE}`,
    Key: {
      taskId: event.pathParameters.taskId,
      userId: event.requestContext.identity.cognitoIdentityId
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
    TableName: `Todo_${process.env.DEPLOY_STAGE}`,
    Key: {
      taskId: event.pathParameters.taskId,
      userId: event.requestContext.identity.cognitoIdentityId
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
    TableName: `Todo_${process.env.DEPLOY_STAGE}`,
    Key: {
      taskId: event.pathParameters.taskId,
      userId: event.requestContext.identity.cognitoIdentityId
    },
    ExpressionAttributeNames: {
      '#t': 'title',
      '#d': 'description',
      '#l': 'list',
      '#uA': 'updatedAt'
    },
    ExpressionAttributeValues: {
      ':title': event.body.title || '',
      ':description': event.body.description || '',
      ':list': event.body.list || 'backlog',
      ':updatedAt': Date.now()
    },
    UpdateExpression: 'SET #t = :title, #d = :description, #l = :list, #uA = :updatedAt',
    ReturnValues: 'ALL_NEW'
  }

  try {
    await dynamoDbLib.call('update', params)
    return success({ status: true })
  } catch (e) {
    return failure(e)
  }
}
