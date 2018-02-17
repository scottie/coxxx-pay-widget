//Scott lindh

const abi = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_value","type":"uint256"}],"name":"burn","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_value","type":"uint256"}],"name":"burnFrom","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"},{"name":"_extraData","type":"bytes"}],"name":"approveAndCall","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Burn","type":"event"}];
const Eth = require('ethjs-query');
const EthContract = require('ethjs-contract');
var coxxxContract = '0x2134057C0b461F898D375Cead652Acae62b59541'; // 
//https://etherscan.io/address/0x2134057c0b461f898d375cead652acae62b59541#code
(function() {
    // Localize jQuery variable
    var jQuery;
    //const Eth = require('ethjs-query')
    //const EthContract = require('ethjs-contract')
    
    /******** Load jQuery if not present *********/
    if (window.jQuery === undefined || window.jQuery.fn.jquery !== '1.4.2') {
        console.log("loading jquery...");
        var script_tag = document.createElement('script');
        script_tag.setAttribute("type","text/javascript");
        script_tag.setAttribute("src",
            "http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js");
        if (script_tag.readyState) {
          script_tag.onreadystatechange = function () { // For old versions of IE
              if (this.readyState == 'complete' || this.readyState == 'loaded') {
                  scriptLoadHandler();
              }
          };
        } else {
          script_tag.onload = scriptLoadHandler;
        }
        // Try to find the head, otherwise default to the documentElement
        console.log("[CoxxxCoin]");
        (document.getElementsByTagName("head")[0] || document.documentElement).appendChild(script_tag);
    } else {
        // The jQuery version on the window is the one we want to use
        jQuery = window.jQuery;
        
        if(account.toString() == "undefined"){
            console.log("Please login to MetaMask, then try again.");
            $('#coxxxCoin-widget-container').html('Please login with metamask, then try again.');
        }
        if (web3.eth.accounts[0] === 'undefined') {
            console.log("Please login to MetaMask");
            document.body.innerHTML = 'Oops! Your browser does not support this, please download MetaMask plugin.';   
        }
        else {
            main();
        }
        
    }

    /******** Called once jQuery has loaded ******/
    function scriptLoadHandler() {      

        // Restore $ and window.jQuery to their previous values and store the
        // new jQuery in our local jQuery variable
        jQuery = window.jQuery.noConflict(true);
        // Call our main function
        main(); 
    }
    
    function clicky (siteAddress, paymentAmount, siteUrl, callback) {
                console.log("ethJS libarys loaded!");
                var button = document.querySelector('button.transferFunds');
                button.addEventListener('click', function() {
                    console.log(siteAddress);
                    console.log(paymentAmount);    
                    console.log(siteUrl);                
                    var account = web3.eth.accounts[0];
                    if(account.toString() == "undefined"){
                        console.log("Please login to MetaMask, then try again.");
                        $('#coxxxCoin-widget-container').html('Please login with metamask, then try again.');
                    }
                    else{
                        console.log("ETH Address: " + account); 
                        // getBalance(account); 
                        getBalance(account);
                        getCoxxxBalance(account, function(balance){
                        console.log('Coxxx Coin Tokens Owned: ' + balance);
                        if(parseInt(balance) > paymentAmount ){ // gas fee
                            console.log("You have enough cox coin pay");
                            return(callback(true));
                        }else{
                          console.log("You dont have enough tokens to pay");
                          return(callback(false));
                        } 
                   

                   });
                }
        });      
    };
    
    //
    function getCoxxxBalance(addr, callback){       
        var tknAddress = (addr).substring(2);
        var contractData = ('0x70a08231000000000000000000000000' + tknAddress);
        console.log("Web3 libary version: " + web3.version.api); // web3 libary version
        web3.eth.call({
            to: coxxxContract, 
            data: contractData  
            }, function(err, result) {
            if (result) { 
                var tokens = web3.toBigNumber(result).toString(); 
                //console.log('Coxxx Coin Tokens Owned: ' + web3.fromWei(tokens, 'ether'));
                return(callback(web3.fromWei(tokens, 'ether')));
            }
            else {
                console.log(err); // Dump errors here
            }
        });
    }

    //metamask balance
    function getBalance(address) {
        var address, wei, balance
        try {
            web3.eth.getBalance(address, function (error, wei) {
                if (!error) {
                    var balance = web3.fromWei(wei, 'ether');
                    console.log("ETH Balance: " + balance.toString());
                }
            });
        } catch (err) {
            //document.getElementById("output").innerHTML = err;
            console.log(err);
        }
    }

    /******** Our main function ********/
    function main() { 

        console.log("[CoxxxCoin]");
        
        jQuery(document).ready(function($) {  
            var siteAddress = $('#coxxxWidget').attr("siteAddress");
            var paymentAmount = $('#coxxxWidget').attr("paymentAmount"); 
            var siteUrl = $('#coxxxWidget').attr("siteUrl");  
                        
            console.log("Document ready...")
            /******* Load CSS *******/
            var css_link = $("<link>", { 
                rel: "stylesheet", 
                type: "text/css", 
                href: "style.css" 
            });

            css_link.appendTo('head');  

            /******** Load Widget ******/
            //
            //window.addEventListener('load', function() {
                console.log("Load Event Received...")
                // Check if Web3 has been injected by the browser:
                if (typeof web3 !== 'undefined') {              
                    // You have a web3 browser!
                    web3.version.getNetwork((err, netId) => {
                        if(!err){
                            switch (netId) {
                                case "1":
                                  console.log('Running on mainnet')
                                  break
                                case "2":
                                  console.log('Running on deprecated Morden test network.')
                                  break
                                case "3":
                                  console.log('Running on ropsten test network.')
                                  break
                                case "4":
                                  console.log('Running on Rinkeby test network.')
                                  break
                                case "42":
                                  console.log('Running on Kovan test network.')
                                  break
                                default:
                                  console.log('Running on unknown network.')
                              }                            
                        }else{
                            console.log(err);
                            return;
                        }
                        
                        
                        //jQuery('button.transferFunds').trigger('click');
                      });

                    //startApp(web3);
                    /******* Load HTML *******/         
                   console.log("MetaMask detected, starting web3 experiance...");        
                   $('#coxxxCoin-widget-container').html('<button class="transferFunds">Subscribe with CoxxxCoins!</button>');
                   var addr = web3.eth.accounts[0]; //naga
                   if(typeof addr == "undefined"){
                        console.log("Please login to MetaMask, then try again.");
                        $('#coxxxCoin-widget-container').html('Please login with metamask, then try again.');
                        return;
                    }
                    //addr = user addresss
                    //siteAddress = sites address
                   clicky(siteAddress, paymentAmount, siteUrl, function(d){
                       console.log("Enough Coins: " + d);
                       if(d){
                            //https://etherscan.io/transcation/
                            
                            /**
                             * Set allowance for other address
                             *
                             * Allows `_spender` to spend no more than `_value` tokens in your behalf
                             *
                             * @param _spender The address authorized to spend
                             * @param _value the max amount they can spend
                             */
                            //function approve(address _spender, uint256 _value) public
                            //    returns (bool success) {
                            //    allowance[msg.sender][_spender] = _value;
                            //    return true;
                            //}
                            var gas = 0;
                            const eth = new Eth(web3.currentProvider);
                            const contract = new EthContract(eth);
                            const coxxxToken = contract(abi);
                            var coxxx = coxxxToken.at(coxxxContract);
                            eth.estimateGas({
                                from: eth.accounts[0], 
                                to: "0x0Fe18f369c7F34208922cAEBbd5d21E131E44692", 
                                value: web3.toWei(1, "ether")
                              }, 
                              function(e, d) {
                                //var gas = web3.toBigNumber(gas).toString();                            
                                if (gas.toString() != "null") {
                                  gas = d; 
                                  console.log("Gas: " + d);
                                  console.log("You have enough coins.");
                                  //coxxx.approve(function(error, result) { console.log('result: ' + result, 'error: ' + error); } );
                                  /*
                                  coxxx.approve(siteAddress,paymentAmount, {from:eth.accounts[0]}, function(e, d){
                                          //console.log(d); 
                                          if(e == null){
                                              console.log("Payment has been made");
                                              //log transaction id
                                              //
                                          }
                                          else{
                                              console.log("Error: " + e);
                                          }
                                          
                                  //        //webhook / callback
                                      });
                                  }else{
                                      console.log("You dont have enough coins to make this transaction.");
                                      //callback error to display on widget
                                      $('#coxxxCoin-widget-container').html('Your balance is not enough to make this transaction.');
                                  };
                                  });
                                  */
                                  coxxx.approve(siteAddress, eth.accounts[0], paymentAmount)
                                    .then(async result => {
                                    const tx = await coxxx.transferFrom.sendTransaction(eth.accounts[0], siteAddress, paymentAmount);
                                    console.log({success: true, data: {from: eth.accounts[0], to: siteAddress, amount: paymentAmount, tx: tx}});
                                    })
                                    .catch(error => {
                                    console.log('Unable to approve transfer ' + paymentAmount + ' tokens to the address ' + siteAddress, {success: false});
                                    });
                                }
                            });
                        }else {
                          console.log("Please install MetaMask.");
                          $('#coxxxCoin-widget-container').html('<img src="https://github.com/MetaMask/faq/raw/master/images/download-metamask.png"></img>');
                          return;
                        }
                      //
                     // Warn the user that they need to get a web3 browser
                     // Or install MetaMask, etc...
                        
                   });
                } 
              
              });        
        //});
    }
    
    })(); // Call anon function right away 