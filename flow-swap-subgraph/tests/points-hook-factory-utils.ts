import { newMockEvent } from "matchstick-as"
import { ethereum, Address } from "@graphprotocol/graph-ts"
import { PoolCreated } from "../generated/PointsHookFactory/PointsHookFactory"

export function createPoolCreatedEvent(
  tokenA: Address,
  tokenB: Address,
  fee: i32,
  pool: Address,
  hookContract: Address
): PoolCreated {
  let poolCreatedEvent = changetype<PoolCreated>(newMockEvent())

  poolCreatedEvent.parameters = new Array()

  poolCreatedEvent.parameters.push(
    new ethereum.EventParam("tokenA", ethereum.Value.fromAddress(tokenA))
  )
  poolCreatedEvent.parameters.push(
    new ethereum.EventParam("tokenB", ethereum.Value.fromAddress(tokenB))
  )
  poolCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "fee",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(fee))
    )
  )
  poolCreatedEvent.parameters.push(
    new ethereum.EventParam("pool", ethereum.Value.fromAddress(pool))
  )
  poolCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "hookContract",
      ethereum.Value.fromAddress(hookContract)
    )
  )

  return poolCreatedEvent
}
