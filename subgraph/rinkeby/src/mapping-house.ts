import { BigInt, store, Address } from "@graphprotocol/graph-ts"
import { JSON, JSONEncoder } from "assemblyscript-json";
import {
  House,
  Approval,
  ApprovalForAll,
  MansionBurned,
  MansionMinted,
  MansionStaked,
  MansionStolen,
  MansionUnStaked,
  OwnershipTransferred,
  Paused,
  RanchBurned,
  RanchMinted,
  RanchStaked,
  RanchStolen,
  RanchUnStaked,
  ShackBurned,
  ShackMinted,
  ShackStaked,
  ShackStolen,
  ShackUnStaked,
  TestTokenMinted,
  TokenMinted,
  Transfer,
  Unpaused
} from "../generated/House/House"
import { Token, TokenEntity, StatisEntity, LogEntity } from "../generated/schema"

export function handleApproval(event: Approval): void {}
export function handleApprovalForAll(event: ApprovalForAll): void {}

export function handleMansionMinted(event: MansionMinted): void {
  let owner = event.params.owner.toHex();
  let tokenEntity = TokenEntity.load(owner);

  if (!tokenEntity) {
    tokenEntity = new TokenEntity(owner);
    tokenEntity.save();
  }

  let tokenId = event.params.tokenId.toHex() + "_house";
  let token = Token.load(tokenId);
  if (!token) {
    token = new Token(tokenId);
    token.staked = false;
    token.type = "TOKEN_TYPE_HOUSE_MANSION";
    token.tokenEntity = tokenEntity.id;
  } else {
    return;
  }

  token.save();

  // Change Global Status
  let statisEntity = StatisEntity.load("0x01");
  if (!statisEntity) {
    statisEntity = new StatisEntity("0x01");
  }

  statisEntity.mansionMinted = statisEntity.mansionMinted.plus(
    BigInt.fromI32(1)
  );
  statisEntity.save();

  // Write Event Log
  let logEntity = new LogEntity(event.params.blockNum.toHex());
  logEntity.owner = owner;
  logEntity.event = "HOUSE_MANSION_MINTED";
  logEntity.token = token.id;

  let date = new Date(event.block.timestamp.toI64() * 1000).toISOString();
  logEntity.time = date;
  logEntity.save();
}

export function handleRanchMinted(event: RanchMinted): void {
  let owner = event.params.owner.toHex();
  let tokenEntity = TokenEntity.load(owner);

  if (!tokenEntity) {
    tokenEntity = new TokenEntity(owner);
    tokenEntity.save();
  }

  let tokenId = event.params.tokenId.toHex() + "_house";
  let token = Token.load(tokenId);
  if (!token) {
    token = new Token(tokenId);
    token.staked = false;
    token.type = "TOKEN_TYPE_HOUSE_RANCH";
    token.tokenEntity = tokenEntity.id;
  } else {
    return;
  }

  token.save();

  // Change Global Status
  let statisEntity = StatisEntity.load("0x01");
  if (!statisEntity) {
    statisEntity = new StatisEntity("0x01");
  }

  statisEntity.ranchMinted = statisEntity.ranchMinted.plus(BigInt.fromI32(1));
  statisEntity.save();

  // Write Event Log
  let logEntity = new LogEntity(event.params.blockNum.toHex());
  logEntity.owner = owner;
  logEntity.event = "HOUSE_RANCH_MINTED";
  logEntity.token = token.id;

  let date = new Date(event.block.timestamp.toI64() * 1000).toISOString();
  logEntity.time = date;
  logEntity.save();
}

export function handleShackMinted(event: ShackMinted): void {
  let owner = event.params.owner.toHex();
  let tokenEntity = TokenEntity.load(owner);

  if (!tokenEntity) {
    tokenEntity = new TokenEntity(owner);
    tokenEntity.save();
  }

  let tokenId = event.params.tokenId.toHex() + "_house";
  let token = Token.load(tokenId);
  if (!token) {
    token = new Token(tokenId);
    token.staked = false;
    token.type = "TOKEN_TYPE_HOUSE_SHACK";
    token.tokenEntity = tokenEntity.id;
  } else {
    return;
  }

  token.save();

  // Change Global Status
  let statisEntity = StatisEntity.load("0x01");
  if (!statisEntity) {
    statisEntity = new StatisEntity("0x01");
  }

  statisEntity.shackMinted = statisEntity.shackMinted.plus(BigInt.fromI32(1));
  statisEntity.save();

  // Write Event Log
  let logEntity = new LogEntity(event.params.blockNum.toHex());
  logEntity.owner = owner;
  logEntity.event = "HOUSE_SHACK_MINTED";
  logEntity.token = token.id;

  let date = new Date(event.block.timestamp.toI64() * 1000).toISOString();
  logEntity.time = date;
  logEntity.save();
}

export function handleMansionStaked(event: MansionStaked): void {
  let owner = event.params.owner.toHex();
  let tokenEntity = TokenEntity.load(owner);

  if (!tokenEntity) {
    tokenEntity = new TokenEntity(owner);
    tokenEntity.save();
  }

  let tokenId = event.params.tokenId.toHex() + "_house";
  let token = Token.load(tokenId);
  if (!token) {
    return;
  }

  token.staked = true;
  token.tokenEntity = tokenEntity.id;
  token.save();

  // Change Global Status
  let statisEntity = StatisEntity.load("0x01");
  if (!statisEntity) {
    statisEntity = new StatisEntity("0x01");
  }

  statisEntity.mansionStaked = statisEntity.mansionStaked.plus(BigInt.fromI32(1));
  statisEntity.save();

  // Write Event Log
  let logEntity = new LogEntity(event.params.blockNum.toHex());
  logEntity.owner = owner;
  logEntity.event = "HOUSE_MANSION_STAKED";
  logEntity.token = token.id;

  let date = new Date(event.block.timestamp.toI64()*1000).toISOString();
  logEntity.time = date;
  logEntity.save();
}

export function handleRanchStaked(event: RanchStaked): void {
  let owner = event.params.owner.toHex();
  let tokenEntity = TokenEntity.load(owner);

  if (!tokenEntity) {
    tokenEntity = new TokenEntity(owner);
    tokenEntity.save();
  }

  let tokenId = event.params.tokenId.toHex() + "_house";
  let token = Token.load(tokenId);
  if (!token) {
    return;
  }

  token.staked = true;
  token.tokenEntity = tokenEntity.id;
  token.save();

  // Change Global Status
  let statisEntity = StatisEntity.load("0x01");
  if (!statisEntity) {
    statisEntity = new StatisEntity("0x01");
  }

  statisEntity.ranchStaked = statisEntity.ranchStaked.plus(BigInt.fromI32(1));
  statisEntity.save();

  // Write Event Log
  let logEntity = new LogEntity(event.params.blockNum.toHex());
  logEntity.owner = owner;
  logEntity.event = "HOUSE_RANCH_STAKED";
  logEntity.token = token.id;

  let date = new Date(event.block.timestamp.toI64()*1000).toISOString();
  logEntity.time = date;
  logEntity.save();
}

export function handleShackStaked(event: ShackStaked): void {
  let owner = event.params.owner.toHex();
  let tokenEntity = TokenEntity.load(owner);

  if (!tokenEntity) {
    tokenEntity = new TokenEntity(owner);
    tokenEntity.save();
  }

  let tokenId = event.params.tokenId.toHex() + "_house";
  let token = Token.load(tokenId);
  if (!token) {
    return;
  }

  token.staked = true;
  token.tokenEntity = tokenEntity.id;
  token.save();

  // Change Global Status
  let statisEntity = StatisEntity.load("0x01");
  if (!statisEntity) {
    statisEntity = new StatisEntity("0x01");
  }

  statisEntity.shackStaked = statisEntity.shackStaked.plus(BigInt.fromI32(1));
  statisEntity.save();

  // Write Event Log
  let logEntity = new LogEntity(event.params.blockNum.toHex());
  logEntity.owner = owner;
  logEntity.event = "HOUSE_SHACK_STAKED";
  logEntity.token = token.id;

  let date = new Date(event.block.timestamp.toI64()*1000).toISOString();
  logEntity.time = date;
  logEntity.save();
}

export function handleRanchUnStaked(event: RanchUnStaked): void {
  let owner = event.params.owner.toHex();
  let tokenEntity = TokenEntity.load(owner);

  if (!tokenEntity) {
    tokenEntity = new TokenEntity(owner);
    tokenEntity.save();
  }

  let tokenId = event.params.tokenId.toHex() + "_house";
  let token = Token.load(tokenId);
  if (!token) {
    return;
  }

  token.staked = false;
  token.tokenEntity = tokenEntity.id;
  token.save();

  // Change Global Status
  let statisEntity = StatisEntity.load("0x01");
  if (!statisEntity) {
    statisEntity = new StatisEntity("0x01");
  }

  statisEntity.ranchStaked = statisEntity.ranchStaked.minus(BigInt.fromI32(1));
  statisEntity.save();

  // Write Event Log
  let logEntity = new LogEntity(event.params.blockNum.toHex());
  logEntity.owner = owner;
  logEntity.event = "HOUSE_RANCH_UNSTAKED";
  logEntity.token = token.id;

  let date = new Date(event.block.timestamp.toI64()*1000).toISOString();
  logEntity.time = date;
  logEntity.save();
}

export function handleMansionUnStaked(event: MansionUnStaked): void {
  let owner = event.params.owner.toHex();
  let tokenEntity = TokenEntity.load(owner);

  if (!tokenEntity) {
    tokenEntity = new TokenEntity(owner);
    tokenEntity.save();
  }

  let tokenId = event.params.tokenId.toHex() + "_house";
  let token = Token.load(tokenId);
  if (!token) {
    return;
  }

  token.staked = false;
  token.tokenEntity = tokenEntity.id;
  token.save();

  // Change Global Status
  let statisEntity = StatisEntity.load("0x01");
  if (!statisEntity) {
    statisEntity = new StatisEntity("0x01");
  }

  statisEntity.mansionStaked = statisEntity.mansionStaked.minus(BigInt.fromI32(1));
  statisEntity.save();

  // Write Event Log
  let logEntity = new LogEntity(event.params.blockNum.toHex());
  logEntity.owner = owner;
  logEntity.event = "HOUSE_MANSION_UNSTAKED";
  logEntity.token = token.id;

  let date = new Date(event.block.timestamp.toI64()*1000).toISOString();
  logEntity.time = date;
  logEntity.save();
}

export function handleShackUnStaked(event: ShackUnStaked): void {
  let owner = event.params.owner.toHex();
  let tokenEntity = TokenEntity.load(owner);

  if (!tokenEntity) {
    tokenEntity = new TokenEntity(owner);
    tokenEntity.save();
  }

  let tokenId = event.params.tokenId.toHex() + "_house";
  let token = Token.load(tokenId);
  if (!token) {
    return;
  }

  token.staked = false;
  token.tokenEntity = tokenEntity.id;
  token.save();

  // Change Global Status
  let statisEntity = StatisEntity.load("0x01");
  if (!statisEntity) {
    statisEntity = new StatisEntity("0x01");
  }

  statisEntity.shackStaked = statisEntity.shackStaked.minus(BigInt.fromI32(1));
  statisEntity.save();

  // Write Event Log
  let logEntity = new LogEntity(event.params.blockNum.toHex());
  logEntity.owner = owner;
  logEntity.event = "HOUSE_SHACK_UNSTAKED";
  logEntity.token = token.id;

  let date = new Date(event.block.timestamp.toI64()*1000).toISOString();
  logEntity.time = date;
  logEntity.save();
}

// Burnt
export function handleMansionBurned(event: MansionBurned): void {
  let tokenId = event.params.tokenId.toHex() + "_house";
  let token = Token.load(tokenId);
  if (!token) {
    return;
  }

  store.remove("Token", tokenId);

  // Change Global Status
  let statisEntity = StatisEntity.load("0x01");
  if (!statisEntity) {
    statisEntity = new StatisEntity("0x01");
  }

  statisEntity.mansionBurned = statisEntity.mansionBurned.plus(BigInt.fromI32(1));
  statisEntity.save();

  let owner = event.transaction.from.toHex();

  // Write Event Log
  let logEntity = new LogEntity(event.params.blockNum.toHex());
  logEntity.owner = owner;
  logEntity.event = "HOUSE_MANSION_BURNED";
  logEntity.token = "";

  let date = new Date(event.block.timestamp.toI64()*1000).toISOString();
  logEntity.time = date;
  logEntity.save();
}

export function handleRanchBurned(event: RanchBurned): void {
  let tokenId = event.params.tokenId.toHex() + "_house";
  let token = Token.load(tokenId);
  if (!token) {
    return;
  }

  store.remove("Token", tokenId);

  // Change Global Status
  let statisEntity = StatisEntity.load("0x01");
  if (!statisEntity) {
    statisEntity = new StatisEntity("0x01");
  }

  statisEntity.ranchBurned = statisEntity.ranchBurned.plus(BigInt.fromI32(1));
  statisEntity.save();

  let owner = event.transaction.from.toHex();

  // Write Event Log
  let logEntity = new LogEntity(event.params.blockNum.toHex());
  logEntity.owner = owner;
  logEntity.event = "HOUSE_RANCH_BURNED";
  logEntity.token = "";

  let date = new Date(event.block.timestamp.toI64()*1000).toISOString();
  logEntity.time = date;
  logEntity.save();
}

export function handleShackBurned(event: ShackBurned): void {
  let tokenId = event.params.tokenId.toHex() + "_house";
  let token = Token.load(tokenId);
  if (!token) {
    return;
  }

  store.remove("Token", tokenId);

  // Change Global Status
  let statisEntity = StatisEntity.load("0x01");
  if (!statisEntity) {
    statisEntity = new StatisEntity("0x01");
  }

  statisEntity.shackBurned = statisEntity.shackBurned.plus(BigInt.fromI32(1));
  statisEntity.save();

  let owner = event.transaction.from.toHex();

  // Write Event Log
  let logEntity = new LogEntity(event.params.blockNum.toHex());
  logEntity.owner = owner;
  logEntity.event = "HOUSE_SHACK_BURNED";
  logEntity.token = "";

  let date = new Date(event.block.timestamp.toI64()*1000).toISOString();
  logEntity.time = date;
  logEntity.save();
}

// Stolen
export function handleMansionStolen(event: MansionStolen): void {
  let owner = event.params.owner.toHex();
  let tokenEntity = TokenEntity.load(owner);

  if (!tokenEntity) {
    tokenEntity = new TokenEntity(owner);
    tokenEntity.save();
  }

  let tokenId = event.params.tokenId.toHex() + "_house";
  let token = Token.load(tokenId);
  if (!token) {
    return;
  }

  token.staked = false;
  token.tokenEntity = tokenEntity.id;
  token.save();

  // Change Global Status
  let statisEntity = StatisEntity.load("0x01");
  if (!statisEntity) {
    statisEntity = new StatisEntity("0x01");
  }

  statisEntity.mansionStolen = statisEntity.mansionStolen.plus(BigInt.fromI32(1));
  statisEntity.totalStolenByCrazyCat = statisEntity.totalStolenByCrazyCat.plus(BigInt.fromI32(1));

  statisEntity.save();

  // Write Event Log
  let logEntity = new LogEntity(event.params.blockNum.toHex());
  logEntity.owner = owner;
  logEntity.event = "HOUSE_MANSION_STOLEN";
  logEntity.token = token.id;

  let date = new Date(event.block.timestamp.toI64()*1000).toISOString();
  logEntity.time = date;
  logEntity.save();
}

export function handleRanchStolen(event: RanchStolen): void {
  let owner = event.params.owner.toHex();
  let tokenEntity = TokenEntity.load(owner);

  if (!tokenEntity) {
    tokenEntity = new TokenEntity(owner);
    tokenEntity.save();
  }

  let tokenId = event.params.tokenId.toHex() + "_house";
  let token = Token.load(tokenId);
  if (!token) {
    return;
  }

  token.staked = false;
  token.tokenEntity = tokenEntity.id;
  token.save();

  // Change Global Status
  let statisEntity = StatisEntity.load("0x01");
  if (!statisEntity) {
    statisEntity = new StatisEntity("0x01");
  }

  statisEntity.ranchStolen = statisEntity.ranchStolen.plus(BigInt.fromI32(1));
  statisEntity.totalStolenByCrazyCat = statisEntity.totalStolenByCrazyCat.plus(BigInt.fromI32(1));
  statisEntity.save();

  // Write Event Log
  let logEntity = new LogEntity(event.params.blockNum.toHex());
  logEntity.owner = owner;
  logEntity.event = "HOUSE_RANCH_STOLEN";
  logEntity.token = token.id;

  let date = new Date(event.block.timestamp.toI64()*1000).toISOString();
  logEntity.time = date;
  logEntity.save();
}

export function handleShackStolen(event: ShackStolen): void {
  let owner = event.params.owner.toHex();
  let tokenEntity = TokenEntity.load(owner);

  if (!tokenEntity) {
    tokenEntity = new TokenEntity(owner);
    tokenEntity.save();
  }

  let tokenId = event.params.tokenId.toHex() + "_house";
  let token = Token.load(tokenId);
  if (!token) {
    return;
  }

  token.staked = false;
  token.tokenEntity = tokenEntity.id;
  token.save();

  // Change Global Status
  let statisEntity = StatisEntity.load("0x01");
  if (!statisEntity) {
    statisEntity = new StatisEntity("0x01");
  }

  statisEntity.shackStolen = statisEntity.shackStolen.plus(BigInt.fromI32(1));
  statisEntity.totalStolenByCrazyCat = statisEntity.totalStolenByCrazyCat.plus(BigInt.fromI32(1));
  statisEntity.save();

  // Write Event Log
  let logEntity = new LogEntity(event.params.blockNum.toHex());
  logEntity.owner = owner;
  logEntity.event = "HOUSE_SHACK_STOLEN";
  logEntity.token = token.id;

  let date = new Date(event.block.timestamp.toI64()*1000).toISOString();
  logEntity.time = date;
  logEntity.save();
}

//---------
export function handleOwnershipTransferred(event: OwnershipTransferred): void {}
export function handlePaused(event: Paused): void {}
export function handleTransfer(event: Transfer): void {
  let owner = event.params.to.toHex();
  let tokenEntity = TokenEntity.load(owner);

  if (!tokenEntity) {
    tokenEntity = new TokenEntity(owner);
    tokenEntity.save();
  }

  let tokenId = event.params.tokenId.toHex() + "_house";
  let token = Token.load(tokenId);
  if (!token) {
    return;
  }

  token.tokenEntity = tokenEntity.id;
  token.save();

  // Write Event Log
  let logEntity = new LogEntity(event.logIndex.toHex());
  logEntity.owner = owner;
  logEntity.event = "HOUSE_OWNERSHIP_TRANSFERED";
  logEntity.token = token.id;

  let date = new Date(event.block.timestamp.toI64()*1000).toISOString();
  logEntity.time = date;
  logEntity.save();
}

export function handleUnpaused(event: Unpaused): void {}

export function handleTokenMinted(event: TokenMinted): void {}

export function handleTestTokenMinted(event: TestTokenMinted): void {}
