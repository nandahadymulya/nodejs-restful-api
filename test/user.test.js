import supertest from "supertest";
import { web } from "../src/apps/web.js";
import { logger } from "../src/apps/logging.js";
import { removeTestUser, createTestUser } from "./test.util.js";

describe('GET /api/users/current', function () {
    beforeEach(async () => {
        await createTestUser();
    });

    afterEach(async () => {
        await removeTestUser();
    });

    it("should can get current user", async () => {
        const result = await supertest(web)
            .get('/api/users/current')
            .set("Authorization", "test")

        logger.info(result.body);

        expect(result.status).toBe(200);
        expect(result.body.data.username).toBe("test");
        expect(result.body.data.name).toBe("test");
    });

    it("should reject if token is invalid", async () => {
        const result = await supertest(web)
            .get('/api/users/current')
            .set("Authorization", "wrong")

        logger.info(result.body);

        expect(result.status).toBe(401);
        expect(result.body.errors).toBeDefined();
    });
});
