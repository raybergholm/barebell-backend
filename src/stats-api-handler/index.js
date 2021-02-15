const AWS = require('aws-sdk')
AWS.config.update({
    region: "eu-central-1"
})
const dynamoDB = new AWS.DynamoDB() // indexed storage
const s3 = new AWS.S3() // long-term storage if querying long-term trends

const LATEST_RESOURCE = "/stats/latest"

exports.handler = async (event) => {
    const resource = event.resource

    console.log(`RESOURCE ${resource}`)

    let response = null

    switch (resource) {
        case LATEST_RESOURCE:
            try {
                const data = await getLatestWorkout(event.body)
                response = generateHttpResponse(200, data)
            } catch (err) {
                response = generateHttpResponse(500, err)
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

async function getLatestWorkout(body) {
    // TODO: grab from dynamoDB
    return [{
        id: 1,
        data: "test data"
    }]
}
