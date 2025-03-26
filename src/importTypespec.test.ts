import { beforeEach } from "vitest"
import { sleep, test } from "./common/utils"
import fs from "node:fs"
import path from "node:path"
import {
  closeVscode,
  contrastResult,
  installExtension,
  notEmptyFolderContinue,
  preContrastResult,
  selectFolder,
  start,
} from "./common/commonSteps"
import screenshot from "screenshot-desktop"

beforeEach(() => {
  const importTypespec = path.resolve(
    __dirname,
    "../ImportTypespecProjectOpenApi3"
  )
  if (fs.existsSync(importTypespec)) {
    let hasOpenapi3File = false
    for (const file of fs.readdirSync(importTypespec)) {
      if (file === "openapi.3.0.yaml") {
        hasOpenapi3File = true
      } else {
        const filePath = path.resolve(importTypespec, file)
        fs.rmSync(filePath, { recursive: true, force: true })
      }
    }
    if (!hasOpenapi3File) {
      throw new Error("Failed to find openapi3 file")
    }
  } else {
    throw new Error("Failed to find ImportTypespecProjectOpenApi3 directory")
  }
})

test("ImportTypespecFromOpenApi3", async ({ launch }) => {
  const workspacePath = path.resolve(
    __dirname,
    "../importTypespecProjectOpenApi3"
  )
  const { page } = await launch({
    workspacePath,
  })
  await installExtension(page)

  await start(page, {
    folderName: "importTypespecProjectOpenApi3",
    command: "Import TypeSpec from Openapi3",
  })
  await selectFolder()
  let img = await screenshot()
  let buffer = Buffer.from(img)
  await sleep(3)
  fs.writeFileSync(
    `${process.env.BUILD_ARTIFACT_STAGING_DIRECTORY || "."}/importError.png`,
    buffer
  )
  await notEmptyFolderContinue(page)
  await selectFolder("openapi.3.0.yaml")
  await sleep(3)
  fs.writeFileSync(
    `${process.env.BUILD_ARTIFACT_STAGING_DIRECTORY || "."}/importError.png`,
    buffer
  )
  await preContrastResult(
    page,
    "OpenAPI succeeded",
    "Failed to import project successfully",
    [10, 3]
  )
  await contrastResult(["openapi.3.0.yaml", "main.tsp"], workspacePath)
  await closeVscode(page)
})
