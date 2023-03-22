# arbitrum-claim
Checks ARB balance and immediately transfers if > 0

## Installation
```
git clone https://github.com/d4rk4444/arbitrum-claim.git
cd arbitrum-claim
npm i
```
      
## Configuration
All settings are in the .env file
      
1. RPC link   
2. Gas limit for transaction     
3. Gas price     
4. Priority gas price
       
!!!!You need to insert private keys in the private.js file.     
!!!!You need to insert addresses for receiving ARB in the exchange.js file.       
      
## Running
Transfer launch       
```
node index
```
Claim launch       
```
node claim
```
