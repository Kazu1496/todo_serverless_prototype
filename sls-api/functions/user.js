import * as dynamoDbLib from '../libs/dynamodb-lib'
import { success, failure } from '../libs/response-lib'

const TableName = `todo-user-${process.env.DEPLOY_STAGE}`

export const createUser = async event => {
  console.log(event, '😚')
  const params = {
    TableName: TableName,
    Item: {
      id: event.userName,
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
    console.log(e, '😂')
    return failure(e)
  }
}

export const getUser = async event => {
  const params = {
    TableName: TableName,
    Key: {
      id: event.pathParameters.userId
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
      id: event.pathParameters.userId
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
