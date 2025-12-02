import { PoolCreated as PoolCreatedEvent } from "../generated/PointsHookFactory/PointsHookFactory"
import { PoolCreated } from "../generated/schema"

export function handlePoolCreated(event: PoolCreatedEvent): void {
  let entity = new PoolCreated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.tokenA = event.params.tokenA
  entity.tokenB = event.params.tokenB
  entity.fee = event.params.fee
  entity.pool = event.params.pool
  entity.hookContract = event.params.hookContract

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
