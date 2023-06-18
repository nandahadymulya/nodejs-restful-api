import supertest from "supertest";
import { web } from "../src/apps/web.js";
import { logger } from "../src/apps/logging.js";
import { removeTestUser, createTestUser, getTestUser } from "./test.util.js";

describe("POST /api/auth/signup", function () {
  afterEach(async () => {
    await removeTestUser();
  });

  it("should can sign up new user", async () => {
    const result = await supertest(web).post("/api/auth/signup").send({
      username: "test",
      password: "secret",
      name: "test",
    });

    expect(result.status).toBe(200);
    expect(result.body.data.username).toBe("test");
    expect(result.body.data.name).toBe("test");
    expect(result.body.data.password).toBeUndefined();
  });

  it("should reject if request body is invalid", async () => {
    const result = await supertest(web).post("/api/auth/signup").send({
      username: "",
      password: "",
      name: "",
    });

    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });

  it("should reject if username already exist", async () => {
    let result = await supertest(web).post("/api/auth/signup").send({
      username: "test",
      password: "secret",
      name: "test",
    });

    expect(result.status).toBe(200);
    expect(result.body.data.username).toBe("test");
    expect(result.body.data.name).toBe("test");
    expect(result.body.data.password).toBeUndefined();

    result = await supertest(web).post("/api/auth").send({
      username: "test",
      password: "secret",
      name: "test",
    });

    expect(result.status).toBe(401);
    expect(result.body.errors).toBeDefined();
  });
});

describe("POST /api/auth/signin", function () {
  beforeEach(async () => {
    await createTestUser();
  });

  afterEach(async () => {
    await removeTestUser();
  });

  it("should can signin", async () => {
    const result = await supertest(web).post("/api/auth/signin").send({
      username: "test",
      password: "secret",
    });

    expect(result.status).toBe(200);
    expect(result.body.data.token).toBeDefined();
    expect(result.body.data.token).not.toBe("test");
  });

  it("should reject signin", async () => {
    const result = await supertest(web).post("/api/auth/signin").send({
      username: "",
      password: "",
    });

    logger.info(result.body);

    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });

  it("should reject signin if password is wrong", async () => {
    const result = await supertest(web).post("/api/auth/signin").send({
      username: "test",
      password: "wrong",
    });

    expect(result.status).toBe(401);
    expect(result.body.errors).toBeDefined();
  });

  it("should reject signin if username is wrong", async () => {
    const result = await supertest(web).post("/api/auth").send({
      username: "wrong",
      password: "secret",
    });

    expect(result.status).toBe(401);
    expect(result.body.errors).toBeDefined();
  });
});

describe("DELETE /api/auth/signout", function () {
  beforeEach(async () => {
    await createTestUser();
  });

  afterEach(async () => {
    await removeTestUser();
  });

  it("should can signout", async () => {
    const result = await supertest(web)
      .delete("/api/auth/signout")
      .set("Authorization", "test");

    expect(result.status).toBe(200);
    expect(result.body.data).toBe("sign out succeed");

    const user = await getTestUser();
    expect(user.token).toBeNull();
  });

  it("should reject signout if token is invalid", async () => {
    const result = await supertest(web)
      .delete("/api/auth/signout")
      .set("Authorization", "wrong");

    expect(result.status).toBe(401);
  });
});
