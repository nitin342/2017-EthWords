//create privatenet using Geth and Ethereum Wallet
//create two account plus the main account using Ethereum Wallet or geth command line
//run Geth console
//mine
//let the owner and the receiver have 200 ETH balance from the main account
//copy the following script and paste it on Geth console and wait


//define waitmining function
function waitmining(){while (eth.pendingTransactions.length != 0){setTimeout(function () {}, 50)};}//wait 50 ms

//make sure that the account numbers are correct
var owner = eth.accounts[1]
var receiver = eth.accounts[2]

//Unlock owner, receiver accounts
personal.unlockAccount(owner)//need password of the account
personal.unlockAccount(receiver) //neead password of the account

//raw data of the compiled contract. Get it from a previous EthWord compiled contract using Ethereum Wallet or from Remix
var contract_data = '0x6060604052341561000f57600080fd5b60008054600160a060020a03191633600160a060020a03161781556005805460ff191690556103f490819061004490396000f3006060604052600436106100985763ffffffff7c010000000000000000000000000000000000000000000000000000000060003504166342020803811461009a578063590e1ae3146100b75780635baa7509146100ca57806363f44968146100e05780636720388a146100f95780638da5cb5b1461011e578063da284dcc1461014d578063ebf0c71714610160578063f7260d3e14610173575b005b610098600160a060020a0360043516602435604435606435610186565b34156100c257600080fd5b610098610211565b34156100d557600080fd5b610098600435610266565b34156100eb57600080fd5b6100986004356024356102b1565b341561010457600080fd5b61010c610398565b60405190815260200160405180910390f35b341561012957600080fd5b61013161039e565b604051600160a060020a03909116815260200160405180910390f35b341561015857600080fd5b61010c6103ad565b341561016b57600080fd5b61010c6103b3565b341561017e57600080fd5b6101316103b9565b60005433600160a060020a039081169116146101a157600080fd5b60008060055460ff1660028111156101b557fe5b146101bf57600080fd5b6001805473ffffffffffffffffffffffffffffffffffffffff1916600160a060020a038716178155603c85024201600255600384905560048390556005805460ff191682805b02179055505050505050565b60005433600160a060020a0390811691161461022c57600080fd5b600254421161023a57600080fd5b60018060055460ff16600281111561024e57fe5b1461025857600080fd5b600054600160a060020a0316ff5b60005433600160a060020a0390811691161461028157600080fd5b60018060055460ff16600281111561029557fe5b1461029f57600080fd5b5060028054603c909202919091019055565b600154600090819033600160a060020a039081169116146102d157600080fd5b60018060055460ff1660028111156102e557fe5b146102ef57600080fd5b6005805460ff19166002179055849250600191505b83821161032b57826040519081526020016040519081900390209250600190910190610304565b6004548314610346576005805460ff19166001179055600080fd5b33600160a060020a03166108fc60035486029081150290604051600060405180830381858888f193505050501561038557600054600160a060020a0316ff5b600580546001919060ff19168280610205565b60035481565b600054600160a060020a031681565b60025481565b60045481565b600154600160a060020a0316815600a165627a7a723058202a37819f60f8e14aac2ebc994c0e99a2e513e9f652e01e4e5354956a0267d98e0029'

//abi of the contract. Get it from a EthWord previous compiled contract using Ethereum Wallet or from Remix
var abi = [{"constant":false,"inputs":[{"name":"_receiver","type":"address"},{"name":"_validityTime","type":"uint256"},{"name":"_wordValue","type":"uint256"},{"name":"_wordRoot","type":"bytes32"}],"name":"open","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[],"name":"refund","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_validityTime","type":"uint256"}],"name":"renew","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_word","type":"bytes32"},{"name":"_wordCount","type":"uint256"}],"name":"claim","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"wordValue","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"expirationTime","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"root","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"receiver","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"}]




//hashchain indexed from 0 to 99. index 0 --> claim 100 Payword, index 99 --> claim 1 PayWord. Get it from PayWord.out
var hashChain = ['0x16474cc3d0bb390f630cb7a11eb4c14e94b02394165010b8f0e2bd194c62cb83', '0xe85701be6b442b84b959120da6967684ac337756fa7ca8a0da95d1e71c50a6c9', '0x2cd91c3f37694d4910a3539a56805eac8bec08f50b4eedddc6e17e309abc9f69', '0x537af3c02a7b1f8d8024030a747b6d6661030b20cdfc087a62e10bd190796e45', '0x457a0398a5cd55b6b0854579a0530e4ee41208b995bf4a91f7fbaf08be09bcd2', '0xb6da2de3afde2ec1ba817da0f8a99be2deed7a05a431b8bb624e69a0743ffd94', '0xa564d2abffb69657da866804715e041d1f473296adc972a585bb0f57fdd1e14b', '0x8c2545580f85f5649dd28384a13687487dbd976a4ed1b0b973aadb83581ade4f', '0x2a29665f736499e4b03753ac43ab358f1a020e813e64ab984c0fafd694969f7b', '0x2e173176891c1b36e556d0d9698d2d33afd69d92634e0140a6e47a6323a629e8', '0x9420514406830d5aaed572a0a8d6f302c76edd85411ac162788a4d9b82c161d5', '0x8b9a05a8f11af3c042a2d7de6b57a0839f7d72675b27b2dae3e0405572625851', '0x6f12ef0f0818e9460af413ad90e180dff262213bd9fbf5e15be0899289d21546', '0x5e0ec0df2950b91c255c22c5572b13dcb9fe8d8c5f4f97b7eef6fd533c42e847', '0xd45e0553a89910825fc75e0313ace9d011c76ce7206e6f462cc66c9fb930bf94', '0x3d133bf12b30a8c50dff8000a933000413a00958d392facd264a161cefcdd299', '0x0e9b436fb57642793ff8184a5a5e7158d48a347d92e357b2e5bd3705b273b297', '0xa604c4ac6dbab2a9eb04d55789b589edbdcc16183170465e3d4ef8522dffcb75', '0x46714ec2b358b7647588a67d2ace92f2937370d2c7c0ff6bb90ef074067b48ec', '0xc7e8967da926b5f0444dc3ea93a5fd1b06e1a7ceb710049c5b8b039dbf987546', '0xda3680118f973a2663e662a97aa50abb9e684a1b8f7c7ff2556648fd22b860d4', '0x526e4a8ce6ff1b00679d705f052bc322375940e5f3499dee296dfcd19f460e8f', '0xe86fe383f2bfbb16d28df529c8b0a29d0f7a5e1a8af41a93fe22bc63227754a8', '0xb334730a8326758883d6fe99a0b52fee67f9fd0a393eeaaa5d8ba62fbcb3b530', '0x1908e4fc6964c138c603272100e4fb6c2b78aa75f87ebe58d30fc2a019058bf1', '0xc41586c5c7ff6bab51a49b821d36334b76cb34468dfdcb63f6ac51ca96c82f95', '0xb3f4a60489a95fd1f6aba4d74f1d5dcafa4e21383ebe8bdc779095d57fc2390e', '0xa358f60800ec855e32f22e1f5c9d86e32ee6e7f54ce076ec131b95e5f399be5e', '0xcc92111b4d2cafc27b5efbb4f1fc06e704c57c35c467f6b27b9d78bd0266a71b', '0xe9fc9550944344d1ce4eff588c1d305ded9160e0e1403c6b4c8d90cb40261bcd', '0x670dd5340b2af71935a313db586fecb5981b11bb6c9dd1503d075c4352c5f64f', '0x3ca351e43e72e4583fc8ee8586b78b74e2dc1739a1b3113bcd6cfe1b2f3eade1', '0xe95d64190efc00e6df0be30302191af08eecf394365c5d611b8b8c08d4ddc327', '0x7f06357b269025e0c120e82bf485f749b68b36e5a55a706ce07fde76240f7c90', '0x4ade2a4005fa83273f5cf3113854d7223f5d2bf53e67b3466b399d4a29edb288', '0x9e1478d19e3160797b1fa5f8d4ef65ffc8f1e3699c23b10646051e4d5f1734b7', '0x104b005822a1175a3e8e2dc5826acbda614c94f5aee1d300fcd8dc1684b19273', '0xcf716f4c910e93fb57c7b38fd47a2f002cc75a11376a73f4af3b7a28c2b83f5a', '0x6192925094241a34d91a55443ff286097382ec12b24a495f382b00900abb3bad', '0x9b4b9223f58e04aeac4983634269dca9118f8ef146aa8e5aa9ed4e2328ccef8b', '0xd240747949dab8f3b24ed463a95074d9b9937bfb8c51698aa63b4f89bd7fc7a6', '0x94b18f4448cb660d8a771c91233c0fbcbd263b1676256c95b0ff587513ca7815', '0x3331af9e89eff7081aa5e3ddc53a1331923c97c0dc3586fc8d07369790537d2e', '0x544bd2c745fc077c173df4d088a74ab4d188b4e54e44ef5f3e02786d554b6c0a', '0xe9c01c689aefd1bb103c116fcb175b709040a3491f81edc4b8b90234da0b29d1', '0xc6dc7607c426cf07eddbe23ef0050cd14c82d4cd7a691e31d49d675e32eea8db', '0xd45fc3c3c0927e6234f61bf2ba549d1adb39ad045fe4a5e8bc20ea8aba64fd12', '0x6ab48cf162c3471e7650b6edd7e9308b5bf1d67baabc95fffba01c21c2ae78e0', '0x51179cb0f06bb54fdac684bbb09982f623cb3fc10f666da7be66623f8762fef5', '0xbd7a89e2f8e00a787a54c5a920b34c9c7cc292f6449a78d33f1def74d7c006ab', '0x09bf7c8e19eeb75e575801c0459a648891bc178d2bb38db93c203e6ca0231743', '0xc91c2dbf134ec283b68ad30d1e3b5d73decf177e8caded08f86e9e87747c12d5', '0x40981f18b021845ebf484c327cf2b3d3db9c7cef36656743b02fde7b1f7a3140', '0xe17b729e4a4d0a0cf9b8aa66510bd8390c1ff7cc7f3a71fc21a455684e9592b5', '0xc07630eba89b154ce2470883e6474217a19b525660480620ddb5d707513f6649', '0xa6b469b3bb20f0098c898eb868eb1236b8c87fc0db148d37098b62a974b5fcd0', '0x85dfcc9e758bbe18d24b6b124db0db0d4072413c77f710758cffdda80e5d048c', '0x2b3c53c4a76ac6b278041f2ceae337cbedbaaeb42bfd2595a3bffd5be55174d1', '0xd25a2b41df3baeb7cf85266addda2da370f146695e0f5df745e54e80ab3b62ec', '0x217dd6fb024eaa155db9123bb8446eae3ba8859cf56deb3f4b830c36e7eafb45', '0xd7fd189d6784f2675cf9e784fe8633e3144206211b790acb47432a3b6f0846ee', '0xd8da93beb6089a8bc211cf991f1d4f676e3afca5518b0229d7a3f255f23639df', '0xf6bb283f36b050e1056d8b1ca05f97b296d9fe266607b3d8be4c28950a466dd1', '0xfe4dca86d4a478324f46010b9ddcba5170ecaaeff7411b4eb97cff3089f3a899', '0x9212d9cf11fe62091e716620b9f86b280ab31742453e939ab5416a2e7babef9a', '0x4b3bfe56c5ee82c4e1c4a8d6dec6fbbd75342f166ecfa80d4cc4bb60a27a1cef', '0xbf9474487396d5c8df763e758c607dd4d1f397a15fb2a64213f9069b213ed917', '0xcdfda1616098aff8429e2797fbbad138f20a6ca3dac59478c7e6f316287077fa', '0x0db81a942a5a64ab29069927c417dd30fd2db7c6a9d6211dc6214fd6d27c2af9', '0x61440c479795933094be06858d7039dfc3368eeab92d521cbbeac43a3b2aa157', '0x8e6e8b007e7a0b533a30b20c52883c024d5aabd871bb648bee70a9078899d75b', '0xaa43d1b1ee38d56f0152ca3ba30ec7ec379de061f4455728288ba6548a8d142b', '0x3a6e23025206e6f61a2aa26da7aa3a9df2c5547010ca86fa12df87508b92e929', '0x254669a7fde6ec8c2b0e3a5927f320710cafa3408890984477399dc35d45c713', '0xd09e9218ea2de1a1c6708f009fa95ccdccd724cf1e8b1111d5f91445ce193622', '0xdbf17666b1e6ac2f6404e61b408ed47b728d58e0bcda0e64fa46fd35f90c387f', '0xf8c88766ef70a960d2d0215ea6fda5c86fee16bf2f85a8cc7f517a68fc8efcaf', '0x408c0f6e3eed50d058440df6fb9a9eb3685afb6404b4d609e15509702390a641', '0xe17cb82bc75322efbf33c42a7e3aebf7f4f288ef4fd954f2bc49f7ac5b6fab63', '0x0c5d36d979ff77ae3fda1793c82129b5a866006333c93b0c0ba462eb1e947256', '0x7ab0fbd5b235b518ca5e9bc6a3d47d57e62827e5514ad46f0ed88f2ce86058d4', '0xa9e7af9f2b06a9b720fb20ff46649c31ed99dba7e06ddf677211a15f5c514c5c', '0x01a3c3ecabb609ca49e4a813d8d01f202c133fdcd630637b2e50749f965889a3', '0x4eb1a17877f6c2a879eeb3c5040eeead1608af46e0ab95be65f1007e4aa8a6ed', '0xe851e7d67e6652d245460870861fb8be4f830c00199df2105d8f9bcbc0cb240d', '0xd37bd9cf3db640061ae73ca0462694bf8ae1302165f9deaae5c4b77a5b1430e3', '0xa680df44f5ae8848f59507478f36931e2d1e2c51e57dbb7b304b5cd6ee469d4e', '0x96dc68c3e2ccca319ce09d013174c4e492a640a4e94571784d7dee23ac444933', '0xb12471d018db73ce193e145cd004ac505db46f2252a8dffd2b77ce434564cf7f', '0xcf5a2d462fddaab3ac33b1513ff7eebea46e4a9d53468843cf8fd1a795fb6f5b', '0xa6b3ad570b2ac66456e3c2becb5d30d5a01930f8483573c57b6bc73fb48aac64', '0xf58773df5bc483265e15f0ee350b222209f271d10d3140a504f3d9e444e7b851', '0xac1aabcf761a71a5e93a55cbb928bf2417f8c4c01135e791947466798a7e9804', '0x27935d812f57220cd7a99deb037d21badaabad728e6b63441b1fae0102caedf0', '0x0af9ef01743c3015f53763f39b8c313d150fabb8f8842a9e367b499c12e97d53', '0xd85ac4b2e91a58658e4efa0f45c5e00bb9618af2bbcbb69095ef2dfdc6cd7914', '0x14c6c406f79c85735c6a4ae692c28b7a1dd276357658e06ede0f1354f7d0f4bc', '0x7a79bc173be200b9cca340786d8920f32a2df9d23235ba9d2f30a00436d803d2', '0xc06b183be2b580d6d36e0a29c1bca77f698863ac4f5a66d22765edf8e66a1ea6', '0x9b970f5bc4d858f643e11ee2c6219c51f48d5435849ba6393664df4a17922927']

//variable to store GasCost for each experiment
var gasCost = "#PayWord" + "," + "contractGasUsed" + "," + "openGasUsed" + "," + "claimGasUsed" + "\n"
//------------------------------------------------------------------------------------------
//loop 
for (i=0; i<100; i++){

//deploy EthWord contract
var contractHashTx = eth.sendTransaction({ from: owner, data: contract_data, gas : '3000000'});

//wait for contract deployment is to be mined
waitmining()

//get the contract address
var contractAddress = eth.getTransactionReceipt(contractHashTx).contractAddress;

//get GasCost of contract deployment
var contractGasUsed = eth.getTransactionReceipt(contractHashTx).gasUsed;

//instance of the contract to ease function call
var ethword = eth.contract(abi).at(contractAddress);

//invoke open function, _receiver = receiver, _validityTime = 20, _wordValue = 10000000000000000 wei = 0.01 ETH, _wordRoot = hashChain_root; get it from PayWord.out, from:owner, value = 1ETH, gas limit = 3000000
var openHashTx = ethword.open(receiver, 20, '10000000000000000','0x6a275c297303b37025a9d3659d1475f45363e909acf765affb65ab44d6f0f056' ,{from: owner, value: '1000000000000000000', gas: '3000000'});

//wait for open transaction to be mined
waitmining()

//get GasCost of open function invocation
var openGasUsed = eth.getTransactionReceipt(openHashTx).gasUsed;

//invoke claim function, _word = hashChain[i], _wordCount = 100 -i, from: receiver, gas: '3000000'
var claimHashTx = ethword.claim(hashChain[i],100-i,{from: receiver, gas: '3000000'});

//wait for claim transaction to be mined
waitmining()

//get GasCost of claim function invocation
var claimGasUsed = eth.getTransactionReceipt(claimHashTx).gasUsed;

//store gasCost of 1 iteration
gasCost+= (100 - i) + "," + contractGasUsed + "," + openGasUsed + "," + claimGasUsed + "\n";
}
//---------------------------------------------------------------------------

//print Gascost
console.log(gasCost)
