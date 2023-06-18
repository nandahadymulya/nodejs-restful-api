import supertest from "supertest";
import { web } from "../src/apps/web.js";
import { removeTestUser, createTestUser, getTestUser } from "./test.util.js";
import bcrypt from "bcrypt";

describe("GET /api/users/current", function () {
  beforeEach(async () => {
    await createTestUser();
  });

  afterEach(async () => {
    await removeTestUser();
  });

  it("should can get current user", async () => {
    const result = await supertest(web)
      .get("/api/users/current")
      .set("Authorization", "test");

    expect(result.status).toBe(200);
    expect(result.body.data.username).toBe("test");
    expect(result.body.data.name).toBe("test");
  });

  it("should reject if token is invalid", async () => {
    const result = await supertest(web)
      .get("/api/users/current")
      .set("Authorization", "wrong");

    expect(result.status).toBe(401);
    expect(result.body.errors).toBeDefined();
  });
});

describe("PATCH /api/users/current", function () {
  beforeEach(async () => {
    await createTestUser();
  });

  afterEach(async () => {
    await removeTestUser();
  });

  it("should can update user", async () => {
    const result = await supertest(web)
      .patch("/api/users/current")
      .set("Authorization", "test")
      .send({
        name: "nanda",
        password: "secreted",
      });

    expect(result.status).toBe(200);
    expect(result.body.data.username).toBe("test");
    expect(result.body.data.name).toBe("nanda");

    const user = await getTestUser();
    expect(await bcrypt.compare("secreted", user.password)).toBe(true);
  });

  it("should reject if request is invalid", async () => {
    const result = await supertest(web)
      .get("/api/users/current")
      .set("Authorization", "wrong")
      .send({});

    expect(result.status).toBe(401);
    expect(result.body.errors).toBeDefined();
  });
});
