import * as dynamoDbLib from '../libs/dynamodb-lib'
import { success, failure } from '../libs/response-lib'

const TableName = `Todo_${process.env.DEPLOY_STAGE}`

export const createUser = async event => {
  const params = {
    TableName: TableName,
    Item: {
      group: 'user',
      groupId: event.userName,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      attributes: {
        nickname: ' ',
        image: ' ',
        email: event.request.userAttributes.email
      }
    }
  }

  try {
    await dynamoDbLib.call('put', params)
    return event
  } catch (e) {
    return failure(e)
  }
}

export const getUser = async event => {
  const params = {
    TableName: TableName,
    Key: {
      group: 'user',
      groupId: event.pathParameters.userId
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

export const updateUser = async event => {
  const params = {
    TableName: TableName,
    Key: {
      group: 'user',
      groupId: event.pathParameters.userId
    },
    ExpressionAttributeNames: {
      '#a': 'attributes',
      '#uA': 'updatedAt'
    },
    ExpressionAttributeValues: {
      ':attributes': {
        nickname: event.body.nickname || ' ',
        image: event.body.image || ' ',
        email: event.body.email
      },
      ':updatedAt': Date.now()
    },
    UpdateExpression: 'SET #a = :attributes, #uA = :updatedAt',
    ReturnValues: 'ALL_NEW'
  }

  try {
    await dynamoDbLib.call('update', params)
    return success(params.Item)
  } catch (e) {
    return failure(e)
  }
}
