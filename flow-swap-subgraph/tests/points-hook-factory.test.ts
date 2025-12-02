import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address } from "@graphprotocol/graph-ts"
import { PoolCreated } from "../generated/schema"
import { PoolCreated as PoolCreatedEvent } from "../generated/PointsHookFactory/PointsHookFactory"
import { handlePoolCreated } from "../src/points-hook-factory"
import { createPoolCreatedEvent } from "./points-hook-factory-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/subgraphs/developing/creating/unit-testing-framework/#tests-structure

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let tokenA = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let tokenB = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let fee = 123
    let pool = Address.fromString("0x0000000000000000000000000000000000000001")
    let hookContract = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let newPoolCreatedEvent = createPoolCreatedEvent(
      tokenA,
      tokenB,
      fee,
      pool,
      hookContract
    )
    handlePoolCreated(newPoolCreatedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/subgraphs/developing/creating/unit-testing-framework/#write-a-unit-test

  test("PoolCreated created and stored", () => {
    assert.entityCount("PoolCreated", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "PoolCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "tokenA",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "PoolCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "tokenB",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "PoolCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "fee",
      "123"
    )
    assert.fieldEquals(
      "PoolCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "pool",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "PoolCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "hookContract",
      "0x0000000000000000000000000000000000000001"
    )

    // More assert options:
    // https://thegraph.com/docs/en/subgraphs/developing/creating/unit-testing-framework/#asserts
  })
})
