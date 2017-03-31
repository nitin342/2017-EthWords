pragma solidity ^0.4.0;
contract HashWallet {
  struct Wallet{
    address Owner;
    uint balance;
    uint rate;
    uint hashMaxCount;
    bytes32 finalHash;
    address receiver;
    uint endTime;
  }

  Wallet myWallet;

    //Constructor
    //function HashWallet(uint _rate, uint _hashMaxCount, bytes32 _finalHash, address _receiver) payable {
    function HashWallet(uint _rate, uint _hashMaxCount, bytes32 _finalHash, address _receiver, uint _duration) payable {
        if (msg.value != _rate * _hashMaxCount)
          throw;
        myWallet.Owner = msg.sender;
        myWallet.balance = msg.value;
        myWallet.rate = _rate;
        myWallet.hashMaxCount = _hashMaxCount;
        myWallet.finalHash = _finalHash;
        myWallet.receiver = _receiver;
        myWallet.endTime = now + _duration;
    }

    //function WalletInfo() constant returns(address _Owner, uint _balance, uint _hashMaxCount, bytes32 _finalHash, address _receiver){
    function WalletInfo() constant returns(address _Owner, uint _balance, uint _hashMaxCount, bytes32 _finalHash, address _receiver, uint _endTime){
        _Owner = myWallet.Owner;
        _balance = myWallet.balance;
        _hashMaxCount = myWallet.hashMaxCount;
        _finalHash = myWallet.finalHash;
        _receiver = myWallet.receiver;
        _endTime = myWallet.endTime;
    }

    //function Pay(uint _hashCount, bytes32 _initialHash) returns(bool success){
    function Pay(uint _hashCount, bytes32 _initialHash){
      if (msg.sender != myWallet.receiver || _hashCount > myWallet.hashMaxCount)
        //return false;
        throw;

      bytes32 hash_tmp = _initialHash;
      for (uint i = 1; i <= _hashCount; i++){
        hash_tmp = sha3(hash_tmp);
      }
      if (hash_tmp != myWallet.finalHash)
        //return false;
        throw;

      //msg.sender.transfer(myWallet.coin * _hashCount); //solidity v 0.4.10
      if (!msg.sender.send(myWallet.rate * _hashCount))
        //return false;
        throw;

      //refund
      suicide(myWallet.Owner);
      //selfdestruct(myWallet.Owner);
      //return true;

    }

/*
    function deposite() payable returns(uint){
      if (msg.sender != myWallet.Owner)
        throw;
      myWallet.balance += msg.value;
      return myWallet.balance;
    }
*/
    function withdraw() {
      if (msg.sender != myWallet.Owner || now < myWallet.endTime)
        throw;
      suicide(myWallet.Owner);
    }
}
