import supertest from "supertest";
import { web } from "../src/apps/web.js";
import {
  removeTestUser,
  createTestUser,
  removeAllTestContacts,
  createTestContact,
  getTestContact,
  createManyTestContact,
} from "./test.util.js";
import { logger } from "../src/apps/logging.js";

describe("POST /api/contacts", function () {
  beforeEach(async () => {
    await createTestUser();
  });
  afterEach(async () => {
    await removeAllTestContacts();
    await removeTestUser();
  });

  it("should can create new contact", async () => {
    const result = await supertest(web)
      .post("/api/contacts")
      .set("Authorization", "test")
      .send({
        firstname: "test",
        lastname: "test",
        email: "test@gmail.com",
        phone: "082111200300",
      });

    expect(result.status).toBe(200);
    expect(result.body.data.id).toBeDefined();
    expect(result.body.data.firstname).toBe("test");
    expect(result.body.data.lastname).toBe("test");
    expect(result.body.data.email).toBe("test@gmail.com");
    expect(result.body.data.phone).toBe("082111200300");
  });

  it("should reject if request invalid", async () => {
    const result = await supertest(web)
      .post("/api/contacts")
      .set("Authorization", "test")
      .send({
        firstname: "",
        lastname: "test",
        email: "test",
        phone: "0821112003004005006007008009001000",
      });

    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });
});

describe("GET /api/contacts/:contactId", function () {
  beforeEach(async () => {
    await createTestUser();
    await createTestContact();
  });

  afterEach(async () => {
    await removeAllTestContacts();
    await removeTestUser();
  });

  it("should can get contact", async () => {
    const testContact = await getTestContact();

    const result = await supertest(web)
      .get(`/api/contacts/${testContact.id}`)
      .set("Authorization", "test");

    expect(result.status).toBe(200);
    expect(result.body.data.id).toBe(testContact.id);
    expect(result.body.data.firstname).toBe(testContact.firstname);
    expect(result.body.data.lastname).toBe(testContact.lastname);
    expect(result.body.data.email).toBe(testContact.email);
    expect(result.body.data.phone).toBe(testContact.phone);
  });

  it("should 404 if contact is not found", async () => {
    const testContact = await getTestContact();

    const result = await supertest(web)
      .get(`/api/contact/${testContact.id + 1}`)
      .set("Authorization", "test");

    expect(result.status).toBe(404);
  });
});

describe("PUT /api/contacts/:contactId", function () {
  beforeEach(async () => {
    await createTestUser();
    await createTestContact();
  });

  afterEach(async () => {
    await removeAllTestContacts();
    await removeTestUser();
  });

  it("should can update contact", async () => {
    const testContact = await getTestContact();

    const result = await supertest(web)
      .put(`/api/contacts/${testContact.id}`)
      .set("Authorization", "test")
      .send({
        firstname: "Nanda",
        lastname: "Hady",
        email: "nandahadymulyaa@gmail.com",
        phone: "082333444555",
      });

    expect(result.status).toBe(200);
    expect(result.body.data.id).toBe(testContact.id);
    expect(result.body.data.firstname).toBe("Nanda");
    expect(result.body.data.lastname).toBe("Hady");
    expect(result.body.data.email).toBe("nandahadymulyaa@gmail.com");
    expect(result.body.data.phone).toBe("082333444555");
  });

  it("should reject if request is invalid", async () => {
    const testContact = await getTestContact();

    const result = await supertest(web)
      .put(`/api/contacts/${testContact.id}`)
      .set("Authorization", "test")
      .send({
        firstname: "",
        lastname: "",
        email: "nanda",
        phone: "",
      });

    expect(result.status).toBe(400);
  });
});

describe("DELETE /api/contacts/:contactId", function () {
  beforeEach(async () => {
    await createTestUser();
    await createTestContact();
  });

  afterEach(async () => {
    await removeAllTestContacts();
    await removeTestUser();
  });

  it("should delete contact", async () => {
    const testContact = await getTestContact();

    const result = await supertest(web)
      .delete(`/api/contacts/${testContact.id}`)
      .set("Authorization", "test");

    expect(result.status).toBe(200);
    expect(result.body.message).toBe("remove contact is succeed");
  });

  it("should reject delete contact", async () => {
    const testContact = await getTestContact();

    const result = await supertest(web)
      .delete(`/api/contacts/${testContact.id + 1}`)
      .set("Authorization", "test");

    expect(result.status).toBe(404);
  });
});

describe("GET /api/contacts", function () {
  beforeEach(async () => {
    await createTestUser();
    await createManyTestContact();
  });

  afterEach(async () => {
    await removeAllTestContacts();
    await removeTestUser();
  });

  it("should search contact without query", async () => {
    const result = await supertest(web)
      .get("/api/contacts")
      .set("Authorization", "test");

    expect(result.status).toBe(200);
    expect(result.body.data.length).toBe(10);
    expect(result.body.paging.page).toBe(1);
    expect(result.body.paging.total_page).toBe(2);
    expect(result.body.paging.total_item).toBe(16);
  });

  it("should search contact page 2", async () => {
    const result = await supertest(web)
      .get("/api/contacts")
      .set("Authorization", "test")
      .query({
        page: 2,
      });

    expect(result.status).toBe(200);
    expect(result.body.data.length).toBe(6);
    expect(result.body.paging.page).toBe(2);
    expect(result.body.paging.total_page).toBe(2);
    expect(result.body.paging.total_item).toBe(16);
  });

  it("should search contact by name", async () => {
    const result = await supertest(web)
      .get("/api/contacts")
      .set("Authorization", "test")
      .query({
        name: "test 1",
      });

    expect(result.status).toBe(200);
    expect(result.body.data.length).toBe(7);
    expect(result.body.paging.page).toBe(1);
    expect(result.body.paging.total_page).toBe(1);
    expect(result.body.paging.total_item).toBe(7);
  });

  it("should search contact by email", async () => {
    const result = await supertest(web)
      .get("/api/contacts")
      .set("Authorization", "test")
      .query({
        email: "test1",
      });

    expect(result.status).toBe(200);
    expect(result.body.data.length).toBe(7);
    expect(result.body.paging.page).toBe(1);
    expect(result.body.paging.total_page).toBe(1);
    expect(result.body.paging.total_item).toBe(7);
  });

  it("should search contact by phone", async () => {
    const result = await supertest(web)
      .get("/api/contacts")
      .set("Authorization", "test")
      .query({
        phone: "0820002003001",
      });

    expect(result.status).toBe(200);
    expect(result.body.data.length).toBe(7);
    expect(result.body.paging.page).toBe(1);
    expect(result.body.paging.total_page).toBe(1);
    expect(result.body.paging.total_item).toBe(7);
  });
});
