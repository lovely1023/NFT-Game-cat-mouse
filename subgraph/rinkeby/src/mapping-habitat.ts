import { BigDecimal, BigInt } from "@graphprotocol/graph-ts"
import {
  Habitat,
  CatClaimed,
  CrazyCatLadyClaimed,
  HouseClaimed,
  MouseClaimed,
  OwnershipTransferred,
  Paused,
  TokenStaked,
  Unpaused,
} from "../generated/Habitat/Habitat";
import { Token } from "../generated/schema"

export function handleCatClaimed(event: CatClaimed): void {
  let tokenId = event.params.tokenId.toHex() + "_cnm";
  let token = Token.load(tokenId);
  if (!token) {
    return;
  }

  token.claimed = token.claimed.plus(BigDecimal.fromString(event.params.earned.toString()));
  token.save();
}

export function handleCrazyCatLadyClaimed(event: CrazyCatLadyClaimed): void {
  let tokenId = event.params.tokenId.toHex() + "_cnm";
  let token = Token.load(tokenId);
  if (!token) {
    return;
  }

  token.claimed = token.claimed.plus(BigDecimal.fromString(event.params.earned.toString()));
  token.save();
}

export function handleHouseClaimed(event: HouseClaimed): void {
  let tokenId = event.params.tokenId.toHex() + "_house";
  let token = Token.load(tokenId);
  if (!token) {
    return;
  }

  token.claimed = token.claimed.plus(BigDecimal.fromString(event.params.earned.toString()));
  token.save();
}

export function handleMouseClaimed(event: MouseClaimed): void {
  let tokenId = event.params.tokenId.toHex() + "_cnm";
  let token = Token.load(tokenId);
  if (!token) {
    return;
  }

  token.claimed = token.claimed.plus(BigDecimal.fromString(event.params.earned.toString()));
  token.save();
}

export function handleOwnershipTransferred(event: OwnershipTransferred): void {}

export function handlePaused(event: Paused): void {}

export function handleTokenStaked(event: TokenStaked): void {}

export function handleUnpaused(event: Unpaused): void {}
