const AWS = require('aws-sdk')
AWS.config.update({
    region: "eu-central-1"
})
const dynamoDB = new AWS.DynamoDB()

const WORKOUTS_RESOURCE = "/rest/workouts"
const WORKOUTS_SINGLE_RESOURCE = "/rest/workouts/{workoutsId}"

exports.handler = async (event) => {
    const resource = event.resource

    console.log(`RESOURCE ${resource}`)

    let response = null

    switch (resource) {
        case HEALTH_CHECK_RESOURCE:
            response = generateHttpResponse(200, "OK")
            break
        case WORKOUTS_RESOURCE:
            switch (event.httpMethod) {
                case "GET":
                    try {
                        const data = await queryWorkouts()
                        response = generateHttpResponse(200, data)
                    } catch (err) {
                        response = generateHttpResponse(500, err)
                    }
                    break
                case "POST":
                    try {
                        const data = await createWorkout(event.body)
                        response = generateHttpResponse(200, data)
                    } catch (err) {
                        response = generateHttpResponse(500, err)
                    }
                    break
                case "DELETE":
                    const workoutId = event.pathParameters.id
                    if (workoutId) {
                        try {
                            await deleteWorkout(workoutId)
                            response = generateHttpResponse(204)
                        } catch (err) {
                            response = generateHttpResponse(500, err)
                        }
                    } else {
                        response = generateHttpResponse(400, "No ID in query params")
                    }
                    break
            }
            break
        case WORKOUTS_SINGLE_RESOURCE:
            const workoutId = event.pathParameters.workoutId
            switch (event.httpMethod) {
                case "GET": {
                    try {
                        // fetch workout data
                        const data = await getWorkout(workoutId)
                        response = generateHttpResponse(200, data)
                    } catch (err) {
                        response = generateHttpResponse(500, err)
                    }
                }
                    break
                case "POST": {
                    try {
                        // add to workout data (new exercise)
                        const data = await addToWorkout(workoutId, event.body)
                        response = generateHttpResponse(200, data)
                    } catch (err) {
                        response = generateHttpResponse(500, err)
                    }
                }
                    break
                case "PATCH":
                    try {
                        // update existing exercise
                        const blah = await updateWorkout(workoutId, event.body)
                        response = generateHttpResponse(204)
                    } catch (err) {
                        response = generateHttpResponse(500, err)
                    }
                    break
                case "DELETE":
                    try {
                        // delete from workout
                        await deleteFromWorkout(workoutId, event.body)
                        response = generateHttpResponse(204)
                    } catch (err) {
                        response = generateHttpResponse(500, err)
                    }
                    break
            }
            break
    }

    console.log("Returning the following response: ", JSON.stringify(response))

    return response
}

function generateHttpResponse(statusCode, payload = null) {
    const response = {
        isBase64Encoded: false,
        statusCode
    }

    if (payload !== null) {
        const body = typeof payload === "string" ? payload : JSON.stringify(payload)
        response.body = body
    }
    return response
}

async function queryWorkouts() {
    // probably should work by yoinking the data from dynamoDB
    return [{
        id: 1,
        data: "test data"
    }, {
        id: 2,
        data: "test data 2"
    }]
}

async function getWorkout(id) {
    // TODO: call to go to dynamoDB

    // id is in date format YYYY-MM-DD e.g. 2021-04-01

    return {
        id,
        data: "test data"
    }
}

async function createWorkout(data) {
    const currentDate = new Date().toISOString()

    const id = currentDate.split("T")[0]

    // TODO: call to go to dynamoDB
    
    return {
        id,
        data: "test data"
    }
}

async function deleteWorkout(id) {    
    // TODO: call to go to dynamoDB

    // id is in date format YYYY-MM-DD e.g. 2021-04-01
}

async function addToWorkout(id, body) {
    // TODO: call to go to dynamoDB

    // id is in date format YYYY-MM-DD e.g. 2021-04-01
}

async function updateWorkout(id, body) {
    // TODO: call to go to dynamoDB

    // id is in date format YYYY-MM-DD e.g. 2021-04-01
}

async function deleteFromWorkout(id, body) {
    // TODO: call to go to dynamoDB

    // id is in date format YYYY-MM-DD e.g. 2021-04-01
}