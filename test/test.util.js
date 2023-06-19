import { prismaClient } from "../src/apps/database.js";
import bcrypt from "bcrypt";

export const removeTestUser = async () => {
  await prismaClient.user.deleteMany({
    where: {
      username: "test",
    },
  });
};

export const createTestUser = async () => {
  await prismaClient.user.create({
    data: {
      username: "test",
      password: await bcrypt.hash("secret", 10),
      name: "test",
      token: "test",
    },
  });
};

export const getTestUser = async () => {
  return prismaClient.user.findUnique({
    where: {
      username: "test",
    },
  });
};

export const removeAllTestContacts = async () => {
  await prismaClient.contact.deleteMany({
    where: {
      username: "test",
    },
  });
};

export const createTestContact = async () => {
  await prismaClient.contact.create({
    data: {
      username: "test",
      firstname: "test",
      lastname: "test",
      email: "test@gmail.com",
      phone: "082000200300",
    },
  });
};

export const createManyTestContact = async () => {
  for (let i = 0; i < 16; i++) {
    await prismaClient.contact.create({
      data: {
        username: "test",
        firstname: `test ${i}`,
        lastname: `test ${i}`,
        email: `test${i}@gmail.com`,
        phone: `082000200300${i}`,
      },
    });
  }
};

export const getTestContact = async () => {
  return prismaClient.contact.findFirst({
    where: {
      username: "test",
    },
  });
};
