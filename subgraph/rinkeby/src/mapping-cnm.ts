import { BigInt, store, Address } from "@graphprotocol/graph-ts"
import { JSONEncoder } from "assemblyscript-json";

import {
  CnM,
  Approval,
  ApprovalForAll,
  CatBurned,
  CatMinted,
  CatStaked,
  CatStolen,
  CatUnStaked,
  CrazyCatLadyBurned,
  CrazyCatLadyMinted,
  CrazyCatLadyStaked,
  CrazyCatLadyStolen,
  CrazyCatLadyUnStaked,
  MouseBurned,
  MouseMinted,
  MouseStaked,
  MouseStolen,
  MouseUnStaked,
  OwnershipTransferred,
  Paused,
  RollChanged,
  TestTokenMinted,
  TokenMinted,
  Transfer,
  Unpaused,
} from "../generated/CnM/CnM";
import {
  Token,
  TokenEntity,
  StatisEntity,
  LogEntity,
} from "../generated/schema";

const TOWER_ADDRESS = "";

export function handleApproval(event: Approval): void {}

export function handleApprovalForAll(event: ApprovalForAll): void {}

// ------minting section ---------------
export function handleMouseMinted(event: MouseMinted): void {
  let owner = event.params.owner.toHex();
  let tokenEntity = TokenEntity.load(owner);

  if (!tokenEntity) {
    tokenEntity = new TokenEntity(owner);
    tokenEntity.save();
  }

  let tokenId = event.params.tokenId.toHex() + "_cnm";
  let token = Token.load(tokenId);
  if (!token) {
    token = new Token(tokenId);
    token.staked = false;
    token.type = "TOKEN_TYPE_MOUSE";
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

  statisEntity.mouseMinted = statisEntity.mouseMinted.plus(BigInt.fromI32(1));
  statisEntity.save();

  // Write Event Log
  let logEntity = new LogEntity(event.params.blockNum.toHex());
  logEntity.owner = owner;
  logEntity.event = "MOUSE_MINTED";
  logEntity.token = token.id;

  let date = new Date(event.block.timestamp.toI64() * 1000).toISOString();
  logEntity.time = date;
  logEntity.save();
}

export function handleCatMinted(event: CatMinted): void {
  let owner = event.params.owner.toHex();
  let tokenEntity = TokenEntity.load(owner);

  if (!tokenEntity) {
    tokenEntity = new TokenEntity(owner);
    tokenEntity.save();
  }

  let tokenId = event.params.tokenId.toHex() + "_cnm";
  let token = Token.load(tokenId);
  if (!token) {
    token = new Token(tokenId);
    token.staked = false;
    token.type = "TOKEN_TYPE_CAT";
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

  statisEntity.catMinted = statisEntity.catMinted.plus(BigInt.fromI32(1));
  statisEntity.save();

  // Write Event Log
  let logEntity = new LogEntity(event.params.blockNum.toHex());
  logEntity.owner = owner;
  logEntity.event = "CAT_MINTED";
  logEntity.token = token.id;

  let date = new Date(event.block.timestamp.toI64() * 1000).toISOString();
  logEntity.time = date;
  logEntity.save();
}

export function handleCrazyCatLadyMinted(event: CrazyCatLadyMinted): void {
  let owner = event.params.owner.toHex();
  let tokenEntity = TokenEntity.load(owner);

  if (!tokenEntity) {
    tokenEntity = new TokenEntity(owner);
    tokenEntity.save();
  }

  let tokenId = event.params.tokenId.toHex() + "_cnm";
  let token = Token.load(tokenId);
  if (!token) {
    token = new Token(tokenId);
    token.staked = false;
    token.type = "TOKEN_TYPE_CATCRAZYLADY";
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

  statisEntity.crazyCatLadyMinted = statisEntity.crazyCatLadyMinted.plus(
    BigInt.fromI32(1)
  );
  statisEntity.save();

  // Write Event Log
  let logEntity = new LogEntity(event.params.blockNum.toHex());
  logEntity.owner = owner;
  logEntity.event = "CRAZYCATLADY_MINTED";
  logEntity.token = token.id;

  // let date = new Date(event.block.timestamp.toI64()*1000);
  let date = new Date(event.block.timestamp.toI64() * 1000).toISOString();
  logEntity.time = date;
  logEntity.save();
}

//------------------
export function handleMouseStaked(event: MouseStaked): void {
  let owner = event.params.owner.toHex();
  let tokenEntity = TokenEntity.load(owner);

  if (!tokenEntity) {
    tokenEntity = new TokenEntity(owner);
    tokenEntity.save();
  }

  let tokenId = event.params.tokenId.toHex() + "_cnm";
  let token = Token.load(tokenId);
  if (!token) {
    return;
  }
  if (token.tokenEntity === TOWER_ADDRESS) {
    token.tokenEntity = event.params.owner.toHex();
  }

  token.staked = true;
  token.tokenEntity = tokenEntity.id;
  token.save();

  // Change Global Status
  let statisEntity = StatisEntity.load("0x01");
  if (!statisEntity) {
    statisEntity = new StatisEntity("0x01");
  }

  statisEntity.mouseStaked = statisEntity.mouseStaked.plus(BigInt.fromI32(1));
  statisEntity.save();

  // Write Event Log
  let logEntity = new LogEntity(event.params.blockNum.toHex());
  logEntity.owner = owner;
  logEntity.event = "MOUSE_STAKED";
  logEntity.token = token.id;

  let date = new Date(event.block.timestamp.toI64() * 1000).toISOString();
  logEntity.time = date;
  logEntity.save();
}

export function handleCatStaked(event: CatStaked): void {
  let owner = event.params.owner.toHex();
  let tokenEntity = TokenEntity.load(owner);

  if (!tokenEntity) {
    tokenEntity = new TokenEntity(owner);
    tokenEntity.save();
  }

  let tokenId = event.params.tokenId.toHex() + "_cnm";
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

  statisEntity.catStaked = statisEntity.catStaked.plus(BigInt.fromI32(1));
  statisEntity.save();

  // Write Event Log
  let logEntity = new LogEntity(event.params.blockNum.toHex());
  logEntity.owner = owner;
  logEntity.event = "CAT_STAKED";
  logEntity.token = token.id;

  let date = new Date(event.block.timestamp.toI64() * 1000).toISOString();
  logEntity.time = date;
  logEntity.save();
}

export function handleCrazyCatLadyStaked(event: CrazyCatLadyStaked): void {
  let owner = event.params.owner.toHex();
  let tokenEntity = TokenEntity.load(owner);

  if (!tokenEntity) {
    tokenEntity = new TokenEntity(owner);
    tokenEntity.save();
  }

  let tokenId = event.params.tokenId.toHex() + "_cnm";
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

  statisEntity.crazyCatLadyStaked = statisEntity.crazyCatLadyStaked.plus(
    BigInt.fromI32(1)
  );
  statisEntity.save();

  // Write Event Log
  let logEntity = new LogEntity(event.params.blockNum.toHex());
  logEntity.owner = owner;
  logEntity.event = "CRAZYCATLADY_STAKED";
  logEntity.token = token.id;

  let date = new Date(event.block.timestamp.toI64() * 1000).toISOString();
  logEntity.time = date;
  logEntity.save();
}

//-----------------------
export function handleMouseUnStaked(event: MouseUnStaked): void {
  let owner = event.params.owner.toHex();
  let tokenEntity = TokenEntity.load(owner);

  if (!tokenEntity) {
    tokenEntity = new TokenEntity(owner);
    tokenEntity.save();
  }

  let tokenId = event.params.tokenId.toHex() + "_cnm";
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

  statisEntity.mouseStaked = statisEntity.mouseStaked.minus(BigInt.fromI32(1));
  statisEntity.save();

  // Write Event Log
  let logEntity = new LogEntity(event.params.blockNum.toHex());
  logEntity.owner = owner;
  logEntity.event = "MOUSE_UNSTAKED";
  logEntity.token = token.id;

  let date = new Date(event.block.timestamp.toI64() * 1000).toISOString();
  logEntity.time = date;
  logEntity.save();
}

export function handleCatUnStaked(event: CatUnStaked): void {
  let owner = event.params.owner.toHex();
  let tokenEntity = TokenEntity.load(owner);

  if (!tokenEntity) {
    tokenEntity = new TokenEntity(owner);
    tokenEntity.save();
  }

  let tokenId = event.params.tokenId.toHex() + "_cnm";
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

  statisEntity.catStaked = statisEntity.catStaked.minus(BigInt.fromI32(1));
  statisEntity.save();

  // Write Event Log
  let logEntity = new LogEntity(event.params.blockNum.toHex());
  logEntity.owner = owner;
  logEntity.event = "CAT_UNSTAKED";
  logEntity.token = token.id;

  let date = new Date(event.block.timestamp.toI64() * 1000).toISOString();
  logEntity.time = date;
  logEntity.save();
}

export function handleCrazyCatLadyUnStaked(event: CrazyCatLadyUnStaked): void {
  let owner = event.params.owner.toHex();
  let tokenEntity = TokenEntity.load(owner);

  if (!tokenEntity) {
    tokenEntity = new TokenEntity(owner);
    tokenEntity.save();
  }

  let tokenId = event.params.tokenId.toHex() + "_cnm";
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

  statisEntity.crazyCatLadyStaked = statisEntity.crazyCatLadyStaked.minus(
    BigInt.fromI32(1)
  );
  statisEntity.save();

  // Write Event Log
  let logEntity = new LogEntity(event.params.blockNum.toHex());
  logEntity.owner = owner;
  logEntity.event = "CRAZYCATLADY_UNSTAKED";
  logEntity.token = token.id;

  let date = new Date(event.block.timestamp.toI64() * 1000).toISOString();
  logEntity.time = date;
  logEntity.save();
}

//---------------------
export function handleMouseStolen(event: MouseStolen): void {
  let owner = event.params.owner.toHex();

  let tokenEntity = TokenEntity.load(owner);

  if (!tokenEntity) {
    tokenEntity = new TokenEntity(owner);
    tokenEntity.save();
  }

  let tokenId = event.params.tokenId.toHex() + "_cnm";
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

  statisEntity.mouseStolen = statisEntity.mouseStolen.plus(BigInt.fromI32(1));
  statisEntity.totalStolenByCat = statisEntity.totalStolenByCat.plus(
    BigInt.fromI32(1)
  );
  statisEntity.save();

  // Write Event Log
  let logEntity = new LogEntity(event.params.blockNum.toHex());
  logEntity.owner = owner;
  logEntity.event = "MOUSE_STOLEN";
  logEntity.token = token.id;

  let date = new Date(event.block.timestamp.toI64() * 1000).toISOString();
  logEntity.time = date;
  logEntity.save();
}

export function handleCatStolen(event: CatStolen): void {
  let owner = event.params.owner.toHex();
  let tokenEntity = TokenEntity.load(owner);

  if (!tokenEntity) {
    tokenEntity = new TokenEntity(owner);
    tokenEntity.save();
  }

  let tokenId = event.params.tokenId.toHex() + "_cnm";
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

  statisEntity.catStolen = statisEntity.catStolen.plus(BigInt.fromI32(1));
  statisEntity.totalStolenByCat = statisEntity.totalStolenByCat.plus(BigInt.fromI32(1));
  statisEntity.save();

  // Write Event Log
  let logEntity = new LogEntity(event.params.blockNum.toHex());
  logEntity.owner = owner;
  logEntity.event = "CAT_STOLEN";
  logEntity.token = token.id;

  let date = new Date(event.block.timestamp.toI64() * 1000).toISOString();
  logEntity.time = date;
  logEntity.save();
}

export function handleCrazyCatLadyStolen(event: CrazyCatLadyStolen): void {
  let owner = event.params.owner.toHex();
  let tokenEntity = TokenEntity.load(owner);

  if (!tokenEntity) {
    tokenEntity = new TokenEntity(owner);
    tokenEntity.save();
  }

  let tokenId = event.params.tokenId.toHex() + "_cnm";
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

  statisEntity.crazyCatLadyStolen = statisEntity.crazyCatLadyStolen.plus(BigInt.fromI32(1));
  statisEntity.totalStolenByCat = statisEntity.totalStolenByCat.plus(BigInt.fromI32(1));
  statisEntity.save();

  // Write Event Log
  let logEntity = new LogEntity(event.params.blockNum.toHex());
  logEntity.owner = owner;
  logEntity.event = "CRAZYCATLADY_STOLEN";
  logEntity.token = token.id;

  let date = new Date(event.block.timestamp.toI64() * 1000).toISOString();
  logEntity.time = date;
  logEntity.save();
}

//--------------------
export function handleMouseBurned(event: MouseBurned): void {
  let tokenId = event.params.tokenId.toHex() + "_cnm";
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

  statisEntity.mouseBurned = statisEntity.mouseBurned.plus(BigInt.fromI32(1));
  statisEntity.save();

  let owner = event.transaction.from.toHex();
  // Write Event Log
  let logEntity = new LogEntity(event.params.blockNum.toHex());
  logEntity.owner = owner;
  logEntity.event = "MOUSE_BURNED";
  logEntity.token = token.id;

  let date = new Date(event.block.timestamp.toI64() * 1000).toISOString();
  logEntity.time = date;
  logEntity.save();
}

export function handleCatBurned(event: CatBurned): void {
  let tokenId = event.params.tokenId.toHex() + "_cnm";
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

  statisEntity.catBurned = statisEntity.catBurned.plus(BigInt.fromI32(1));
  statisEntity.save();

  let owner = event.transaction.from.toHex();
  // Write Event Log
  let logEntity = new LogEntity(event.params.blockNum.toHex());
  logEntity.owner = owner;
  logEntity.event = "CAT_BURNED";
  logEntity.token = token.id;

  let date = new Date(event.block.timestamp.toI64() * 1000).toISOString();
  logEntity.time = date;
  logEntity.save();
}

export function handleCrazyCatLadyBurned(event: CrazyCatLadyBurned): void {
  let tokenId = event.params.tokenId.toHex() + "_cnm";
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

  statisEntity.crazyCatLadyBurned = statisEntity.crazyCatLadyBurned.plus(
    BigInt.fromI32(1)
  );
  statisEntity.save();

  let owner = event.transaction.from.toHex();
  // Write Event Log
  let logEntity = new LogEntity(event.params.blockNum.toHex());
  logEntity.owner = owner;
  logEntity.event = "CRAZYCATLADY_BURNED";
  logEntity.token = token.id;

  let date = new Date(event.block.timestamp.toI64() * 1000).toISOString();
  logEntity.time = date;
  logEntity.save();
}

export function handleOwnershipTransferred(event: OwnershipTransferred): void {}

export function handlePaused(event: Paused): void {}

export function handleTransfer(event: Transfer): void {
  let owner = event.params.to.toHex();
  let tokenEntity = TokenEntity.load(owner);

  if (!tokenEntity) {
    tokenEntity = new TokenEntity(owner);
    tokenEntity.save();
  }

  let tokenId = event.params.tokenId.toHex() + "_cnm";
  let token = Token.load(tokenId);
  if (!token) {
    return;
  }

  token.tokenEntity = tokenEntity.id;
  token.save();

  // Write Event Log
  let logEntity = new LogEntity(event.logIndex.toHex());
  logEntity.owner = owner;
  logEntity.event = "CNM_OWNERSHIP_TRANSFERED";
  logEntity.token = token.id;

  let date = new Date(event.block.timestamp.toI64() * 1000).toISOString();
  logEntity.time = date;
  logEntity.save();
}

export function handleRollChanged(event: RollChanged): void {
  let tokenId = event.params.tokenId.toHex() + "_cnm";
  let token = Token.load(tokenId);
  if (!token) {
    return;
  }
  
  let logEntity = new LogEntity(event.logIndex.toHex());
  logEntity.owner = event.params.owner.toHex();
  logEntity.event = "DICE_ROLLED";
  logEntity.token = token.id;

  let date = new Date(event.block.timestamp.toI64() * 1000).toISOString();
  logEntity.time = date;
  logEntity.save();
}

export function handleUnpaused(event: Unpaused): void {}

export function handleTokenMinted(event: TokenMinted): void {}

export function handleTestTokenMinted(event: TestTokenMinted): void {}
