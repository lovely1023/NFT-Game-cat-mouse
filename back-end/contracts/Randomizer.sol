// SPDX-License-Identifier: MIT LICENSE

pragma solidity ^0.8.4;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@chainlink/contracts/src/v0.8/VRFConsumerBase.sol";
import "./interfaces/IRandomizer.sol";

contract RandomGenerator is IRandomizer, VRFConsumerBase, Ownable {
    event RandomSeed(uint256 commitId);
    event NewRandomNumber(uint256 randomResult);
    event DiceRolled(bytes32 indexed requestId, address indexed roller);
    event DiceLanded(bytes32 indexed requestId, uint256 indexed result);

    event ClaimMintReady();

    // variables
        uint256 private constant ROLL_IN_PROGRESS = 42;
    bool public toggled = false;
    bytes32 public latestRequestId;
    uint256 public randomResult;
    
    bytes32 private s_keyHash;
    uint256 private s_fee;
    uint256 private nonce;
    uint16 public override commitId = 292;

    // commit id -> offchain random
    mapping(uint16 => uint256) public commitRandoms;
    // address => can call addCommitRandom
    mapping(address => bool) private admins;
    mapping(bytes32 => address) private s_rollers;
    mapping(address => uint256) private s_results;

    /**
     *
     * Network: Rinkeby
     *   LINK	0x01BE23585060835E02B77ef475b0Cc51aA1e0709
     *   VRF Coordinator	0xb3dCcb4Cf7a26f6cf6B120Cf5A73875B7BBc655B
     *   Key Hash	0x2ed0feb3e7fd2022120aa84fab1945545a9f2ffc9076fd6156fa96eaff4c1311
     *   Fee	0.1 LINK
     */

    /**
     * @notice Constructor
     * @dev https://docs.chain.link/docs/vrf-contracts/
     * @param vrfCoordinator: address of the VRF coordinator
     * @param link: address of the LINK token
     * @param keyHash: hashKey for requesting Random
     */
    // constructor
    constructor(address vrfCoordinator, address link, bytes32 keyHash)
        VRFConsumerBase(vrfCoordinator, link)
    {
        s_keyHash = keyHash;
        s_fee = 2000000000000000000;
    }
    /**
     * @notice Request randomness
     */
    function getRandomNumber() external onlyOwner returns (bytes32 requestId) {
        require(s_keyHash != bytes32(0), "Must have valid key hash");
        require(LINK.balanceOf(address(this)) >= s_fee, "Not enough LINK tokens");
        latestRequestId = requestRandomness(s_keyHash, s_fee);
        requestId = latestRequestId;
    }

    // rollDice function
    function rollDice(address roller) public onlyOwner returns (bytes32 requestId) {
        // checking LINK balance
        require(LINK.balanceOf(address(this)) >= s_fee, "Not enough LINK to pay fee");

        // checking if roller has already rolled die
        require(s_results[roller] == 0, "Already rolled");

        // requesting randomness
        requestId = requestRandomness(s_keyHash, s_fee);

        // storing requestId and roller address
        s_rollers[requestId] = roller;

        // emitting event to signal rolling of die
        s_results[roller] = ROLL_IN_PROGRESS;
        emit DiceRolled(requestId, roller);
    }

    /** 
     * @notice return random result
     * when you are live, please comment the test part and then uncomment live part

     */
     function random() external override returns (uint256) {
       if(toggled) {
        require(s_keyHash != bytes32(0), "Must have valid key hash");
        require(LINK.balanceOf(address(this)) >= s_fee, "Not enough LINK tokens");
        latestRequestId = requestRandomness(s_keyHash, s_fee);
        return randomResult;
       } else {
        uint256 random = _random(nonce);
        nonce++;
        return random;
       }
     }

     function _random(uint256 id) internal view returns(uint256) {
         return uint256(keccak256(
            abi.encodePacked(
                blockhash(block.number),
                block.timestamp + block.difficulty +
            ((uint256(keccak256(abi.encodePacked(block.coinbase)))) / (block.timestamp)) +
            block.gaslimit + id + 
            ((uint256(keccak256(abi.encodePacked(tx.origin)))) / (block.timestamp)) +
            block.number)
        ));
     }

     function sRandom(uint256 tokenId) external override view returns (uint256) {
        return _random(tokenId);
     }

    /**
     * @notice Change the fee
     * @param _fee: new fee (in LINK)
     */
    function setFee(uint256 _fee) external onlyOwner {
        s_fee = _fee;
    }

    /**
     * @notice Change the keyHash
     * @param _keyHash: new keyHash
     */
    function setKeyHash(bytes32 _keyHash) external onlyOwner {
        s_keyHash = _keyHash;
    }

    /**
     * @notice View random result
     */
    function viewRandomResult() external view returns (uint256) {
        return randomResult;
    }

    /**
     * @notice Callback function used by ChainLink's VRF Coordinator
     */
    function fulfillRandomness(bytes32 requestId, uint256 randomness) internal override {
        uint256 d20Value = randomness % 20 + 1;
        s_results[s_rollers[requestId]] = d20Value;
        emit DiceLanded(requestId, d20Value);
        emit NewRandomNumber(randomness);
        randomResult = randomness;
    }

     // Increase commitId
    function increaseCommitId() external {
        require(owner() == _msgSender() || admins[_msgSender()], "Only admins can call this");
        require(getCommitRandom(commitId - 1) > 0 || commitId == 1, "Random seed not set");
        commitId += 1;
    }

      // Seed the current commit id so that pending commits can be revealed
    function addCommitRandom(uint256 seed) external {
        require(owner() == _msgSender() || admins[_msgSender()], "Only admins can call this");
        commitRandoms[commitId - 1] = seed;

        emit ClaimMintReady();
    }

    function addAdmin(address addr) public onlyOwner {
        admins[addr] = true;
    }

    function getCommitRandom(uint16 id) public view override returns (uint256) {
        return this.sRandom(id);
    }

    function toggleToggled() external onlyOwner {
        toggled = !toggled;
    }
}