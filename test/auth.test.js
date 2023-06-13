import supertest from "supertest";
import { web } from "../src/apps/web.js";
import { prismaClient } from "../src/apps/database.js";
import { logger } from "../src/apps/logging.js";

describe('POST /api/auth', function () {
    afterEach(async () => {
        await prismaClient.user.deleteMany({
            where: {
                username: "test"
            }
        });
    });

    it('should can sign up new user', async () => {
        const result = await supertest(web)
            .post('/api/auth').send({
                username: "test",
                password: "secrettest",
                name: "Nanda HM Test"
            });

        logger.info(result.body);

        expect(result.status).toBe(200);
        expect(result.body.data.username).toBe("test");
        expect(result.body.data.name).toBe("Nanda HM Test");
        expect(result.body.data.password).toBeUndefined();
    });

    it('should reject if request body is invalid', async () => {
        const result = await supertest(web)
            .post('/api/auth').send({
                username: "",
                password: "",
                name: "",
            });

        logger.info(result.body);

        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    });

    it('should reject if username already registered', async () => {
        let result = await supertest(web)
            .post('/api/auth').send({
                username: "test",
                password: "secrettest",
                name: "Nanda HM Test"
            });

        logger.info(result.body);

        expect(result.status).toBe(200);
        expect(result.body.data.username).toBe("test");
        expect(result.body.data.name).toBe("Nanda HM Test");
        expect(result.body.data.password).toBeUndefined();

        result = await supertest(web)
            .post('/api/auth').send({
                username: "test",
                password: "secrettest",
                name: "Nanda HM Test"
            });

        logger.info(result.body);

        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    });
})
