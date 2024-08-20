import { DynamicModule, Module } from '@nestjs/common';
import { BlockchainService } from './services/blockchain.service';

@Module({})
export class BlockchainModule {
    static register(info:{
        contractAddress:string,
        rpcUrl:string
    }):DynamicModule{
        return {
            module: BlockchainModule,
            providers: [
                {
                    provide: 'BLOCKCHAIN_INFO',
                    useValue: info
                },
                BlockchainService
            ],
            exports: [BlockchainService]
        }

    }
}
