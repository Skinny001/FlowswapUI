import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address, BigInt } from "@graphprotocol/graph-ts"
import { SwapExecuted } from "../generated/schema"
import { SwapExecuted as SwapExecutedEvent } from "../generated/PointsHook/PointsHook"
import { handleSwapExecuted } from "../src/points-hook"
import { createSwapExecutedEvent } from "./points-hook-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/subgraphs/developing/creating/unit-testing-framework/#tests-structure

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let sender = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let tokenIn = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let tokenOut = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let amountIn = BigInt.fromI32(234)
    let amountOut = BigInt.fromI32(234)
    let newSwapExecutedEvent = createSwapExecutedEvent(
      sender,
      tokenIn,
      tokenOut,
      amountIn,
      amountOut
    )
    handleSwapExecuted(newSwapExecutedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/subgraphs/developing/creating/unit-testing-framework/#write-a-unit-test

  test("SwapExecuted created and stored", () => {
    assert.entityCount("SwapExecuted", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "SwapExecuted",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "sender",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "SwapExecuted",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "tokenIn",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "SwapExecuted",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "tokenOut",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "SwapExecuted",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "amountIn",
      "234"
    )
    assert.fieldEquals(
      "SwapExecuted",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "amountOut",
      "234"
    )

    // More assert options:
    // https://thegraph.com/docs/en/subgraphs/developing/creating/unit-testing-framework/#asserts
  })
})
