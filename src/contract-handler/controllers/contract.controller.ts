import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { BlockchainService } from "src/blockchain/services/blockchain.service";
import { TransferDto } from "../dto/transfer.dto";
import { TransferFromDto } from "../dto/transfer-from.dto";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('Contract')
@Controller('contract')
export class ContractController {
    constructor(
        private readonly blockchainService: BlockchainService
    ) {}

    @Get('balanceOf/:address')
    async balanceOf(@Param('address') address: string) {
        return await this.blockchainService.balanceOf(address);
    }

    @Get('allowance/:owner/:spender')
    async allowance(@Param('owner') owner: string, @Param('spender') spender: string) {
        return await this.blockchainService.allowance(owner, spender);
    }

    @Get('name')
    async name() {
        return await this.blockchainService.tokenName();
    }

    @Get('symbol')
    async symbol() {
        return await this.blockchainService.tokenSymbol();
    }

    @Get('decimals')
    async decimals() {
        return await this.blockchainService.tokenDecimals();
    }

    // @Get('owner')
    // async owner() {
    //     return await this.blockchainService.getOwner();
    // }

    @Get('totalSupply')
    async totalSupply() {
        return (await this.blockchainService.getTotalSupply()).toString();
    }



    @Post('transfer')
    async transfer(@Body() transferDto: TransferDto) {
        return await this.blockchainService.transfer(transferDto.to, transferDto.amount, transferDto.senderPrvKey);
    }

    @Post('transferFrom')
    async transferFrom(@Body() transferFromDto: TransferFromDto) {
        return await this.blockchainService.transferFrom(transferFromDto.from, transferFromDto.to, transferFromDto.amount, transferFromDto.senderPrvKey);
    }
}