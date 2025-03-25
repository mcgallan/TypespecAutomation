import { contrastResult, preContrastResult } from "./common/commonSteps"
import { sleep, test } from "./common/utils"
import path from "node:path"

// 左侧菜单栏
// test("EmitTypespec-OpenAPI Document", async ({ launch }) => {
//   const workspacePath = path.resolve(__dirname, "../EmitTypespecProject")
//   const { page } = await launch({
//     workspacePath,
//   })
//   await page
//     .getByRole("treeitem", { name: "Azure.AI.TextTranslation" })
//     .locator("a")
//     .click()
//   await sleep(3)

//   await page.getByRole("treeitem", { name: "main.tsp" }).locator("a").click({
//     button: "right",
//   })
//   await sleep(3)
//   await page.screenshot({
//     path: `${process.env.BUILD_ARTIFACT_STAGING_DIRECTORY || "."}/1.png`,
//   })
//   await page.getByRole("menuitem", { name: "Emit from TypeSpec" }).click()

//   await sleep(10)
//   await page.screenshot({
//     path: `${process.env.BUILD_ARTIFACT_STAGING_DIRECTORY || "."}/2.png`,
//   })

//   await page
//     .getByRole("option")
//     .locator("a")
//     .filter({ hasText: /Choose another emitter/ })
//     .click()
//   await sleep(3)
//   await page.screenshot({
//     path: `${process.env.BUILD_ARTIFACT_STAGING_DIRECTORY || "."}/3.png`,
//   })

//   await page
//     .locator("a")
//     .filter({ hasText: /OpenAPI Document/ })
//     .click()
//   await sleep(3)
//   await page.screenshot({
//     path: `${process.env.BUILD_ARTIFACT_STAGING_DIRECTORY || "."}/4.png`,
//   })

//   await page
//     .locator("a")
//     .filter({ hasText: /^OpenAPI3$/ })
//     .click()

//   await preContrastResult(
//     page,
//     "OpenAPI3...Succeeded",
//     "Failed to emit project Successful",
//     [5, 2]
//   )
//   await contrastResult(
//     ["openapi.3.0.yaml"],
//     path.resolve(
//       workspacePath,
//       "./Azure.AI.TextTranslation/tsp-output/@typespec/openapi3"
//     )
//   )
// })

test("EmitTypespec-OpenAPI Document", async ({ launch }) => {
  const workspacePath = path.resolve(__dirname, "../EmitTypespecProject")
  const { page } = await launch({
    workspacePath,
  })

  await page.getByText("View", { exact: true }).click()
  await sleep(10)
  await page.screenshot({
    path: `${process.env.BUILD_ARTIFACT_STAGING_DIRECTORY || "."}/-1.png`,
  })
  await page.getByRole("menuitem", { name: "Output Ctrl+Shift+U" }).click()
  await sleep(10)
  await page.screenshot({
    path: `${process.env.BUILD_ARTIFACT_STAGING_DIRECTORY || "."}/-2.png`,
  })
  await page
    .locator("li")
    .filter({ hasText: "EmitTypespecProject" })
    .first()
    .click()
  await sleep(10)
  await page.screenshot({
    path: `${process.env.BUILD_ARTIFACT_STAGING_DIRECTORY || "."}/1.png`,
  })
  await page
    .getByRole("textbox", { name: "input" })
    .fill(">Typespec: Emit from Typespec")
  await sleep(10)
  await page.screenshot({
    path: `${process.env.BUILD_ARTIFACT_STAGING_DIRECTORY || "."}/2.png`,
  })
  await sleep(3)
  await page.keyboard.press("Enter")
  await sleep(10)
  await page.screenshot({
    path: `${process.env.BUILD_ARTIFACT_STAGING_DIRECTORY || "."}/3.png`,
  })
  await sleep(3)
  await page.keyboard.press("Enter")
  await page
    .getByRole("textbox", { name: "input" })
    .fill("choose another emitter")
  await sleep(10)
  await page.screenshot({
    path: `${process.env.BUILD_ARTIFACT_STAGING_DIRECTORY || "."}/4.png`,
  })
  await sleep(3)
  await page.keyboard.press("Enter")
  await page.getByRole("textbox", { name: "input" }).fill("OpenAPI Document")
  await page.screenshot({
    path: `${process.env.BUILD_ARTIFACT_STAGING_DIRECTORY || "."}/5.png`,
  })
  await sleep(3)
  await page.keyboard.press("Enter")
  await sleep(3)
  await page.keyboard.press("Enter")
  // await preContrastResult(
  //     page,
  //     "OpenAPI3...Succeeded",
  //     "Failed to emit project Successful",
  //     [5, 2]
  //   )
  //   await contrastResult(
  //     ["openapi.3.0.yaml"],
  //     path.resolve(
  //       workspacePath,
  //       "./Azure.AI.TextTranslation/tsp-output/@typespec/openapi3"
  //     )
  //   )
})
