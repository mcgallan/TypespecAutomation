import { beforeEach } from "vitest"
import {
  contrastResult,
  start,
  selectFolder,
  preContrastResult,
  closeVscode,
  notEmptyFolderContinue,
} from "./common/commonSteps"
import { preCheckExtension, retry, sleep, test } from "./common/utils"
import fs from "node:fs"
import path from "node:path"
import {
  inputProjectName,
  selectEmitters,
  selectTemplate,
} from "./common/createSteps"

test("EmitTypespec-OpenAPI Document", async ({ launch }) => {
  const workspacePath = path.resolve(__dirname, "../EmitTypespecProject")
  const { page } = await launch({
    workspacePath,
  })
  await page
    .locator("li")
    .filter({ hasText: "EmitTypespecProject" })
    .first()
    .click()
  await sleep(3)
  await page
    .getByRole("textbox", { name: "input" })
    .fill(">Typespec: Emit From Typespec")
  await sleep(3)

  await page
    .locator("a")
    .filter({ hasText: "TypeSpec: Emit from TypeSpec" })
    .click()
  await sleep(3)
  await page
    .locator("label div")
    .filter({ hasText: /TextTranslation/ })
    .nth(3)
    .click()

  await sleep(3)

  await page
    .getByRole("option")
    .locator("a")
    .filter({ hasText: /Choose another emitter/ })
    .click()
  await sleep(3)

  await page
    .locator("a")
    .filter({ hasText: /OpenAPI Document/ })
    .click()
  await sleep(3)

  await page
    .locator("a")
    .filter({ hasText: /^OpenAPI3$/ })
    .click()
  await sleep(3)

  await preContrastResult(
    page,
    "OpenAPI3...Succeeded",
    "Failed to emit project Successful",
    [5, 2]
  )
})
