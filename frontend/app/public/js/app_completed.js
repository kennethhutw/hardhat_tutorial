window.App = {
    token: null,
    web3: null,
    account:null,
    start :async function (){

        const { web3 } = this;
        // Bootstrap the Hardhat token abstraction for Use.
        let data = await  $.getJSON('public/js/Token.json');
        this.token =   new web3.eth.Contract(
            data.abi,
            '0x0644A73092a16aE2d8EfbA30cBeA1dc6215B7Ba7',
          );
        // Get the initial account balance so it can be displayed.
      // todo
      const _accs = await web3.eth.getAccounts();
      console.log(" accounts :", _accs);
      this.account = _accs[0];
        this.refreshBalance();
    },
    setStatus: function (message){
        var status = document.getElementById("status");
        status.innerHTML = message;

    },
    refreshBalance : async function(){

        // todo
        const {balanceOf} = this.token.methods;
        const balance = await balanceOf( this.account).call();
    
        var balance_element = document.getElementById("balance");
             balance_element.innerHTML = balance;
  
    },
    sendCoin :async function(){
    
        var amount = parseInt(document.getElementById("amount").value);
        var receiver = document.getElementById("receiver").value;

        this.setStatus("Initiating transaction... (please wait)");

// todo
        const {transfer} = this.token.methods;
        await transfer(receiver, amount).send({from:this.account});

        this.setStatus("Transaction complete!");
        this.refreshBalance();

    }
};

window.addEventListener('load', function(){

    //checking if web3 has been injected by the browser (Mist/MetaMask)
    if (window.ethereum) {
        // use MetaMask's provider
        App.web3 = new Web3(window.ethereum);
        window.ethereum.enable(); // get permission to access accounts
    
        // detect Metamask account change
        window.ethereum.on('accountsChanged', function (accounts) {
          console.log('accountsChanges',accounts);
          App.start();
        });
    
         // detect Network account change
        window.ethereum.on('networkChanged', function(networkId){
          console.log('networkChanged',networkId);
    
          App.start();
        });
      } else {
        console.warn(
          "No web3 detected. Falling back to http://127.0.0.1:8545. You should remove this fallback when you deploy live",
        );
        // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
        App.web3 = new Web3(
          new Web3.providers.HttpProvider("http://127.0.0.1:8545"),
        );
      }

    App.start();
});