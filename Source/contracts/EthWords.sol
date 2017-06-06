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
  enum States {Init,Open,Locked}
  States public state;

  //Check sender is owner
  modifier checkOwner(){
    if (msg.sender != owner) throw;
    _;
  }

  //Check sender is receiver
  modifier checkReceiver() {
    if (msg.sender != receiver) throw;
    _;
  }

  //Check that contract has been expired
  modifier checkTime() {
    if (now < expirationTime) throw;
    _;
  }

  //Check that the state of the state machine
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

  function open(address _receiver, uint _validityTime, uint _wordValue, bytes32 _wordRoot)
    payable
    checkOwner
    checkState(States.Init)
  {
    receiver = _receiver;
    expirationTime = now + _validityTime * 1 minutes;
    wordValue = _wordValue;
    root = _wordRoot;
    state = States.Open;
  }

  /**
  * @dev A function allowing receiver to claim payment
  * @param _word The receiver's payword
  * @param _wordCount The receiver's assertion of what the payword is worth
  */

  function claim(bytes32 _word, uint _wordCount)
    checkReceiver
    checkState(States.Open)
  {
    // Lock the state to prevent reentrance
    state = States.Locked;

    // Compute the hashchain to get the root
    bytes32 wordScratch = _word;
    for (uint i = 1; i <= _wordCount; i++){
      wordScratch = sha3(wordScratch);
    }

    // Check if root is correct
    if(wordScratch != root) {
      state = States.Open;
      throw;
    }

    // If reached, root is correct so pay the two parties
    if (msg.sender.send(_wordCount * wordValue)) {
      selfdestruct(owner);
     }

    // If send fails, unlock the function for future calls
    state = States.Open;

  }

  /**
  * @dev A function to extend the validity of the contract
  * @param _validityTime Time (minutes) to extend the validity period by
  */

  function renew(uint _validityTime)
    checkOwner
    checkState(States.Open)
    {
      expirationTime += _validityTime * 1 minutes;
    }

  /**
  * @dev Refund the contract to the owner after validty period is expired
  */

  function refund()
    checkOwner
    checkTime
    checkState(States.Open)
    {
      selfdestruct(owner);
    }

  /**
  * @dev Fallback function allows payment at any time
  */

  function() payable { }

}
