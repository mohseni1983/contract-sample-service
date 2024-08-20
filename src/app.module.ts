import { Module } from '@nestjs/common';

import { BlockchainModule } from './blockchain/blockchain.module';
import { ContractHandlerModule } from './contract-handler/contract-handler.module';

@Module({
  imports: [BlockchainModule, ContractHandlerModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
