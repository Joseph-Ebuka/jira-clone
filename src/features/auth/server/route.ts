import { ID } from "node-appwrite";
import { Hono } from "hono";

import { createAdminClient } from "@/lib/appwrite";
import { zValidator } from "@hono/zod-validator";
import { setCookie } from "hono/cookie";

import { loginSchema, registerSchema } from "../schemas";
import { AUTH_COOKIE } from "../constants";

const app = new Hono()
  .post("/login", zValidator("json", loginSchema), async (c) => {
    const { email, password } = await c.req.valid("json");

    const { account } = await createAdminClient();

    const session = await account.createEmailPasswordSession(email, password);

    setCookie(c, AUTH_COOKIE, session.secret, {
      path: "/",
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 30,
    });

    return c.json({ success: true });
  })
  .post("/register", zValidator("json", registerSchema), async (c) => {
    try {
      const { name, email, password } = await c.req.valid("json");

      console.log("Received registration request:", { name, email, password });

      const { account } = await createAdminClient();

      // Create user
      const user = await account.create(ID.unique(), email, password, name);

      // Create session
      const session = await account.createEmailPasswordSession(email, password);

      setCookie(c, AUTH_COOKIE, session.secret, {
        path: "/",
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 60 * 60 * 24 * 30,
      });

      return c.json({ data: user });
    } catch (error) {
      console.error("Registration error:", error);
      return c.json({ error: error.message }, 500);
    }
  });

export default app;
