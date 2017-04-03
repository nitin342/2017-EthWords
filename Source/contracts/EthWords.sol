pragma solidity ^0.4.0;

contract EthWords {

  //Initialization Variables

  address owner;
  address receiver;
  uint expirationTime;
  uint wordValue;
  bytes32 root;
  uint balance;

  //State Machine
  enum States {Init,Open}
  States public state;

  //Checks as Modifiers
  modifier checkOwner(){
    if (msg.sender != owner) throw;
    _;
  }

  modifier checkReceiver() {
    if (msg.sender != receiver) throw;
    _;
  }

  modifier checkTime() {
    if (now < expirationTime) throw;
    _;
  }

  modifier checkState(States _state) {
    if (state != _state) throw;
    _;
  }

  //Constructor
  function EthWords()
    payable
  {
    owner = msg.sender;
    state = States.Init;
  }

  //Open payment function

  function open(address rec, uint validityTime, uint wv, uint nw, bytes32 rt)
    payable
    checkOwner
    checkState(States.Init)
  {
    if (msg.value != wv * nw) throw;
    receiver = rec;
    expirationTime = now + validityTime;
    wordValue = wv;
    root = rt;
    balance = msg.value;
    state = States.Open;
  }

  //Claim function

  function claim(bytes32 word, uint wordCount)
    checkReceiver
    checkState(States.Open)
  {
    bytes32 wordScratch = word;

    for (uint i = 1; i <= wordCount; i++){
      wordScratch = sha3(wordScratch);
    }

    if(wordScratch != root) throw;

    if (msg.sender.send(wordCount * wordValue)) {
      selfdestruct(owner);
    }

  }

  //Refund function valid after timelock
  function refund()
    checkOwner
    checkTime
    checkState(States.Open)
  {
    selfdestruct(owner);
  }

  //Fallback function allows payments to contract any time
  function() payable { }


}
