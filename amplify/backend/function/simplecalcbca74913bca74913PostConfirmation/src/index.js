/**
 * @fileoverview
 *
 * This CloudFormation Trigger creates a handler which awaits the other handlers
 * specified in the `MODULES` env var, located at `./${MODULE}`.
 */

/**
 * The names of modules to load are stored as a comma-delimited string in the
 * `MODULES` env var.
 */
const moduleNames = process.env.MODULES.split(',');
/**
 * The array of imported modules.
 */
const modules = moduleNames.map(name => require(`./${name}`));

/**
 * This async handler iterates over the given modules and awaits them.
 *
 * @see https://docs.aws.amazon.com/lambda/latest/dg/nodejs-handler.html#nodejs-handler-async
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 * 
 */

 var aws = require('aws-sdk');
 var ddb = new aws.DynamoDB();

exports.handler = async (event, context) => {

  let date = new Date();

  if (event.request.userAttributes.sub) {

    let params = {
        Item: {
            'id': {S: event.request.userAttributes.sub},
            '__typename': {S: 'Teacher'},
            'email': {S: event.request.userAttributes.email},
            'createdAt': {S: date.toISOString()},
            'updatedAt': {S: date.toISOString()},
        },
        TableName: process.env.USERTABLE_NAME
    };

    // Call DynamoDB
    try {
        await ddb.putItem(params).promise()
        console.log("Success");
    } catch (err) {
        console.log("Error", err);
    }

    console.log("Success: Everything executed correctly");
    context.done(null, event);

  } else {
    // Nothing to do, the user's email ID is unknown
    console.log("Error: Nothing was written to DynamoDB");
    context.done(null, event);
  }
  /**
   * Instead of naively iterating over all handlers, run them concurrently with
   * `await Promise.all(...)`. This would otherwise just be determined by the
   * order of names in the `MODULES` var.
   */
  await Promise.all(modules.map(module => module.handler(event, context)));
  return event;
};
