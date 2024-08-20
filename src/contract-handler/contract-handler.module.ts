import { Module } from '@nestjs/common';
import { BlockchainModule } from 'src/blockchain/blockchain.module';
import { ContractController } from './controllers/contract.controller';

@Module({
    imports: [
        BlockchainModule.register({
            contractAddress: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
            rpcUrl: 'https://bsc-dataseed.binance.org/'
        })
    ],
    controllers: [
        ContractController
    ],
    providers: [],
})
export class ContractHandlerModule {}
