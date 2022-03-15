import path from 'path'

const swaggerConfig = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "API Colors Management",
            version: "1.0.0",
            contact: {
                name: "LuisEdMB",
                url: "https://github.com/LuisEdMB",
                email: "bedregae@gmail.com",
            },
        }
    },
    apis: [`${path.join(__dirname, "../../api/controllers/*.ts")}`],
}

export default swaggerConfig