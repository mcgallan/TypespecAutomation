import { beforeEach } from "vitest"
import {
  contrastResult,
  start,
  selectFolder,
  preContrastResult,
  closeVscode,
  notEmptyFolderContinue,
  installExtension,
} from "./common/commonSteps"
import { sleep, test } from "./common/utils"
import fs from "node:fs"
import path from "node:path"
import {
  inputProjectName,
  selectEmitters,
  selectTemplate,
} from "./common/createSteps"
import screenshot from "screenshot-desktop"

beforeEach(() => {
  const dir = path.resolve(__dirname, "../CreateTypespecProject")
  if (fs.existsSync(dir)) {
    for (const file of fs.readdirSync(dir)) {
      const filePath = path.resolve(dir, file)
      fs.rmSync(filePath, { recursive: true, force: true })
    }
  } else {
    fs.mkdirSync(dir, { recursive: true })
  }
})

test("CreateTypespec-Generic REST API", async ({ launch }) => {
  const workspacePath = path.resolve(__dirname, "../CreateTypespecProject")
  const { page } = await launch({
    workspacePath,
  })
  try {
    await installExtension(page)
    let img = await screenshot()
    let buffer = Buffer.from(img)
    await sleep(3)
    fs.writeFileSync(
      `${process.env.BUILD_ARTIFACT_STAGING_DIRECTORY || "."}/1.png`,
      buffer
    )
    await start(page, {
      folderName: "CreateTypespecProject",
      command: "Create Typespec Project",
    })
    img = await screenshot()
    buffer = Buffer.from(img)
    await sleep(3)
    fs.writeFileSync(
      `${process.env.BUILD_ARTIFACT_STAGING_DIRECTORY || "."}/2.png`,
      buffer
    )
    await selectFolder()
    img = await screenshot()
    buffer = Buffer.from(img)
    await sleep(3)
    fs.writeFileSync(
      `${process.env.BUILD_ARTIFACT_STAGING_DIRECTORY || "."}/3.png`,
      buffer
    )
    await selectTemplate(page, "Generic REST API")
    img = await screenshot()
    buffer = Buffer.from(img)
    await sleep(3)
    fs.writeFileSync(
      `${process.env.BUILD_ARTIFACT_STAGING_DIRECTORY || "."}/4.png`,
      buffer
    )
    await inputProjectName(page)
    await selectEmitters(page, ["OpenAPI"])
    await preContrastResult(
      page,
      "Project created!",
      "Failed to create project Successful",
      [10, 10]
    )
    await contrastResult(
      [
        ".gitignore",
        "main.tsp",
        "node_modules",
        "package-lock.json",
        "package.json",
        "tspconfig.yaml",
      ],
      workspacePath
    )
  } catch (e) {
    console.error(e)
  } finally {
    await page.keyboard.press("Alt+F4")
  }
})

// test("CreateTypespec-Special scenarios-button", async ({ launch }) => {
//   const { page } = await launch({ workspacePath: "./test" })
//   await installExtension(page)

//   await page
//     .getByLabel(/Explorer/)
//     .first()
//     .click()
//   await page.getByRole("button", { name: "Create TypeSpec Project" }).click()
//   await selectFolder()
//   await notEmptyFolderContinue(page)
//   await closeVscode(page)
// })
