
pragma solidity ^0.4.18;


contract Channel {

    address public channelSender;
    address public channelRecipient;
    uint public startDate;
    uint public channelTimeout;
    uint public wordValue;
    bytes32 public wordRoot;

    //mapping (bytes32 => address) public signatures;

    function Channel(address to, uint timeout, uint value, bytes32 root) public payable {
        channelRecipient = to;
        channelSender = msg.sender;
        startDate = now;
        channelTimeout = timeout;
        wordValue = value;
        wordRoot = root;
    }

    function closeChannel(bytes32 _word, uint8 _wordCount) public {

        bytes32 wordScratch = _word;
        for (uint i = 1; i <= _wordCount; i++) {
            wordScratch = keccak256(wordScratch);
        }

        require(wordScratch == wordRoot);
        require(channelRecipient.send(_wordCount * wordValue));
        selfdestruct(channelSender);


    }

    function channelTimeout() public {
        require(startDate + channelTimeout <= now);
        selfdestruct(channelSender);
    }

}
