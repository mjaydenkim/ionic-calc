export type AmplifyDependentResourcesAttributes = {
    "api": {
        "simplecalc": {
            "GraphQLAPIIdOutput": "string",
            "GraphQLAPIEndpointOutput": "string"
        }
    },
    "auth": {
        "userPoolGroups": {
            "TeacherGroupRole": "string",
            "StudentGroupRole": "string"
        },
        "simplecalcbca74913bca74913": {
            "IdentityPoolId": "string",
            "IdentityPoolName": "string",
            "UserPoolId": "string",
            "UserPoolArn": "string",
            "UserPoolName": "string",
            "AppClientIDWeb": "string",
            "AppClientID": "string"
        }
    },
    "function": {
        "simplecalcbca74913bca74913PostConfirmation": {
            "Name": "string",
            "Arn": "string",
            "LambdaExecutionRole": "string",
            "Region": "string"
        }
    }
}