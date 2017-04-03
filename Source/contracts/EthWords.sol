pragma solidity ^0.4.0;

contract EthWords {

  //Initialization Variables

  address public owner;
  address public receiver;
  uint public expirationTime;
  uint public wordValue;
  bytes32 public root;
  //uint public balance; //Not sure we need this: will discuss

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
  {
    owner = msg.sender;
    state = States.Init;
  }

  /**
  * @dev Specifies and opens the payment channel
  * @param _receiver Receiver's address
  * @param _validityTime Amount of time (in minutes) before Owner can claim
  * @param _wordValue Amount of Eth (in wei) each payword is worth
  * @param _wordRoot Root word for the paywords
  */

  //function open(address rec, uint validityTime, uint wv, uint nw, bytes32 rt)
  function open(address _receiver, uint _validityTime, uint _wordValue, bytes32 _wordRoot)
    payable
    checkOwner
    checkState(States.Init)
  {
    //This line is buggy, I think msg.value doesn't return what we think
    //if (msg.value != wv * nw) throw;
    receiver = _receiver;
    expirationTime = now + _validityTime * 1 minutes;
    wordValue = _wordValue;
    root = _wordRoot;
    //balance = msg.value;
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
