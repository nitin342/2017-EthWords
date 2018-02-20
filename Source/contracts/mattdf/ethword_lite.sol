pragma solidity ^0.4.0;


contract EthWord {

    address public channelSender;
    address public channelRecipient;
    uint public channelTimeout;
    uint public unitPrice;
    bytes32 public tip;


    function EthWord() public {
        channelSender = msg.sender;
        state = States.Init;
    }

  /**
  * @dev Specifies and opens the payment channel
  * @param _channelRecipient Receiver's address
  * @param _validityTime Amount of time (in minutes) before Owner can claim
  * @param _unitPrice Amount of Eth (in wei) each payword is worth
  * @param _wordTip Tip word for the paywords
  */

  function open(address _channelRecipient, uint _validityTime, uint _unitPrice, bytes32 _wordTip) public
    payable
    checkOwner
    checkState(States.Init)
  {
    channelRecipient = _channelRecipient;
    channelTimeout = now + _validityTime * 1 minutes;
    unitPrice = _unitPrice;
    tip = _wordTip;
    state = States.Open;
  }

  /**
  * @dev A function allowing channelRecipient to claim payment
  * @param _word The channelRecipient's payword
  * @param _wordCount The channelRecipient's assertion of what the payword is worth
  */

  function claim(bytes32 _word, uint _wordCount) public
    checkReceiver
    checkState(States.Open)
  {
    // Lock the state to prevent reentrance
    state = States.Locked;

    // Compute the hashchain to get the tip
    bytes32 wordScratch = _word;
    for (uint i = 1; i <= _wordCount; i++){
      wordScratch = keccak256(wordScratch);
    }

    // Check if tip is correct
    if(wordScratch != tip) {
      state = States.Open;
      revert();
    }

    // If reached, tip is correct so pay the two parties
    if (msg.sender.send(_wordCount * unitPrice)) {
      selfdestruct(channelSender);
     }

    // If send fails, unlock the function for future calls
    state = States.Open;

  }

  /**
  * @dev A function to extend the validity of the contract
  * @param _validityTime Time (minutes) to extend the validity period by
  */

  function renew(uint _validityTime) public
    checkOwner
    checkState(States.Open)
    {
      channelTimeout += _validityTime * 1 minutes;
    }

  /**
  * @dev Refund the contract to the channelSender after validty period is expired
  */

  function refund() public
    checkOwner
    checkTime
    checkState(States.Open)
    {
      selfdestruct(channelSender);
    }

  /**
  * @dev Fallback function allows payment at any time
  */

  function() public payable { }

}
