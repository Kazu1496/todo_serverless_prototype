const awsmobile = {
  Auth: {
    region: process.env.VUE_APP_AWS_COGNITO_REGION,
    aws_cognito_identity_pool_id: process.env.VUE_APP_AWS_IDENTITY_POOL_ID,
    userPoolId: process.env.VUE_APP_AWS_POOLS_ID,
    userPoolWebClientId: process.env.VUE_APP_AWS_POOLS_WEB_CLIENT_ID
  },
  API: {
    endpoints: [
      {
        name: 'dev-sls-api',
        endpoint: process.env.VUE_APP_API_URL_BASE
      }
    ]
  }
}

export default awsmobile
