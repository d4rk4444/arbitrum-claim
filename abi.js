export const abi = [
    {
        "type":"function",
        "name":"balanceOf",
        "inputs": [{"name":"account","type":"address"}],
        "outputs": [{"name":"amount","type":"uint256"}]
    },
    {
        "type":"function",
        "name":"transfer",
        "inputs": [
            {"name":"recipient","type":"address"},
            {"name":"amount","type":"uint256"}
        ]
    },
    {
        "type":"function",
        "name":"claimableTokens",
        "inputs": [{"name":"account","type":"address"}],
        "outputs": [{"name":"airdrop","type":"uint256"}]
    },
    {
        "type":"function",
        "name":"claim",
        "inputs": [],
    },
]