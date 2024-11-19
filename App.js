import React, { useState } from 'react';
import { ethers } from "ethers";
import Web3 from "web3";
import './App.css';

const App = () => {
    const [fromLocation, setFromLocation] = useState('');
    const [toLocation, setToLocation] = useState('');
    const [statusMessage, setStatusMessage] = useState('');
    const [userAddress, setUserAddress] = useState("");
    const [ToAddress, setToAddress] = useState("");

    const handleGetRide = async() => {
        if (!fromLocation || !toLocation) {
            setStatusMessage('Please enter both locations.');
            return;
        }
        setStatusMessage(`Searching for rides from ${fromLocation} to ${toLocation}...`);
        // Additional logic to fetch or initiate ride can be added here
        
        // Create a new instance of Web3 using the MetaMask provider
      const web3 = new Web3(window.ethereum);

      // Request MetaMask to connect
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const accounts = await web3.eth.getAccounts();
      const userAddress = "0xC2fBE7A39C3a90CC990b8869b64dDA6763E04e54";
      const destinationAddress = "0xF9F376819e0a39976f17FB89d0b1Af8689a4D775";
      setUserAddress(userAddress);
      setToAddress("0xF9F376819e0a39976f17FB89d0b1Af8689a4D775");

      // Convert totalPrice to Ether (Assuming 1 ETH = 3000 USD for demo purposes)
      const ethPrice = (300 / 9000000).toFixed(18); // Convert USD to Ether
              
      
      // Define the transaction parameters
      const transactionParameters = {
        to: "0xF9F376819e0a39976f17FB89d0b1Af8689a4D775", // Replace with your Ethereum address
        from: userAddress, // MetaMask account
        value: web3.utils.toWei(ethPrice, "ether"), // Convert Ether to Wei
        gas: "200000", // Basic transaction gas limit
      };

      // Send the transaction
      const transactionHash = await window.ethereum.request({
        method: "eth_sendTransaction",
        params: [transactionParameters],
      });
      
      alert("transaction successful");
      setStatusMessage(`Got ride from ${fromLocation} to ${toLocation}...`);
        
    };

    return (
        <div className="container">
            <h1 className="title">Decentralized Ride Sharing</h1>
            <div className="input-container">
                <label>From Location:</label>
                <input
                    type="text"
                    placeholder="Enter starting location"
                    value={fromLocation}
                    onChange={(e) => setFromLocation(e.target.value)}
                />
            </div>
            <div className="input-container">
                <label>To Location:</label>
                <input
                    type="text"
                    placeholder="Enter destination"
                    value={toLocation}
                    onChange={(e) => setToLocation(e.target.value)}
                />
            </div>
            <div className="wallet-info">
                <p><strong>Wallet paying From:</strong> {userAddress || "Not connected"}</p>
                <p><strong>Wallet paying To:</strong> {ToAddress || "Not connected"}</p>
            </div>
            <button className="get-ride-button" onClick={handleGetRide}>Get Ride</button>
            {statusMessage && <p className="status-message">{statusMessage}</p>}
        </div>
    );
};

export default App;
