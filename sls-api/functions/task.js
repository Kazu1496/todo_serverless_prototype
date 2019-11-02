import uuid from 'uuid';
import * as dynamoDbLib from "../libs/dynamodb-lib";
import { success, failure } from "../libs/response-lib";

export const create = async event => {
  const params = {
        TableName: `${process.env.DEPLOY_STAGE}_Todo`,
        Item: {
            id: uuid.v1(),
            title: event.body.title,
            description: event.body.description,
            list: event.body.list,
            userId: event.body.userId,
            createdAt: Date.now()
        }
    };

    try {
        await dynamoDbLib.call("put", params);
        return success(params.Item);
    } catch (e) {
        console.log(e);
        return failure({ status: false });
    }
};
