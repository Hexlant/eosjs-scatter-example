export const network = {
    blockchain: 'eos',
    protocol: 'http',
    host: 'jungle.cryptolions.io',
    port: '18888',
    chainId: '038f4b0fc8ff18a4f0842a8f0564611f6e96e8535901dd45e43ac8691a1c4dca'
}

export const eosNetwork = {
    chainId: network.chainId,
    httpEndpoint: network.protocol + "://" + network.host + ":" + network.port,
    broadcast: true,
    verbose: true,
    sign: true
}