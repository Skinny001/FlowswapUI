import {
  SwapExecuted as SwapExecutedEvent,
  LiquidityAdded as LiquidityAddedEvent,
} from "../generated/PointsHook/PointsHook"
import { SwapExecuted, LiquidityAdded } from "../generated/schema"

export function handleSwapExecuted(event: SwapExecutedEvent): void {
  let entity = new SwapExecuted(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.sender = event.params.sender
  entity.tokenIn = event.params.tokenIn
  entity.tokenOut = event.params.tokenOut
  entity.amountIn = event.params.amountIn
  entity.amountOut = event.params.amountOut

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleLiquidityAdded(event: LiquidityAddedEvent): void {
  let entity = new LiquidityAdded(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.provider = event.params.provider
  entity.token0 = event.params.token0
  entity.token1 = event.params.token1
  entity.amount0 = event.params.amount0
  entity.amount1 = event.params.amount1

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
