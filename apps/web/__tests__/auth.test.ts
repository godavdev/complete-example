import { expect, test } from "@playwright/test"

test.describe("Sign Up", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:3000/sign-up")
  })

  test("sign up button should be visible", async ({ page }) => {
    const signUpButton = page.getByRole("button", {
      name: "Sign Up",
    })
    await expect(signUpButton).toBeVisible()
  })

  test("sign in button should be visible", async ({ page }) => {
    const signInButton = page.getByRole("link", {
      name: "Sign In",
    })
    await expect(signInButton).toBeVisible()
  })

  test("should sign up successfully", async ({ page }) => {
    await page.getByPlaceholder("Enter your name").fill("Test User ")
    await page
      .getByPlaceholder("Enter your email")
      .fill(`testuser${Date.now()}@example.com`)
    await page.getByPlaceholder("Enter your password").fill("password123")
    await page
      .getByRole("button", {
        name: "Sign Up",
      })
      .click()

    await page.waitForURL("http://localhost:3000/posts")

    await expect(
      page.getByRole("button", {
        name: "Post",
      }),
    ).toBeVisible()
  })
})
