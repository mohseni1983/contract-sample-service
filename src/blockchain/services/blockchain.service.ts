import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { ethers } from "ethers";
import { ERC20ABI } from "../utils/erc20abi";

@Injectable()
export class BlockchainService{
    constructor(
        @Inject('BLOCKCHAIN_INFO') private info:{contractAddress:string, rpcUrl:string}
    ){}
    provider = new ethers.JsonRpcProvider(this.info.rpcUrl);
    publicContract = new ethers.Contract(this.info.contractAddress,ERC20ABI,this.provider);


    async balanceOf(address:string){
        try{
            const balance = await this.publicContract.balanceOf(address);
            const decimalBalance = ethers.formatUnits(balance, await this.tokenDecimals());
            return {
                balance: balance.toString(),
                decimalBalance: decimalBalance
            };
        } catch (e){
            throw new BadRequestException(e.message);
        }

    }

    async allowance(owner:string,spender:string){
        try{
            const allowance = await this.publicContract.allowance(owner,spender);
            return allowance.toString();
        } catch (e){
            throw new BadRequestException(e.message);
        }

    }

    async tokenName(){
        try{
            const name = await this.publicContract.name();
            return name;
        } catch (e){
            throw new BadRequestException(e.message);
        }

    }

    async tokenSymbol(){
        try{
            const symbol = await this.publicContract.symbol();
            return symbol;
        } catch (e){
            throw new BadRequestException(e.message);
        }

    }

    async tokenDecimals(){
        try{
            const decimals = await this.publicContract.decimals();
            return decimals;
        } catch (e){
            throw new BadRequestException(e.message);
        }

    }

    // async getOwner(){
    //     try{
    //         const owner = await this.publicContract.owner();
    //         return owner;
    //     } catch (e){
    //         throw new BadRequestException(e.message);
    //     }

    // }

    async getTotalSupply(){
        try{
            const totalSupply = await this.publicContract.totalSupply();
            return totalSupply;
        } catch (e){
            throw new BadRequestException(e.message);
        }

    }

    async transfer(to:string,amount:string, senderPrvKey:string){
        try{
            const balance = await this.balanceOf(senderPrvKey);
            if(+balance.balance < +amount){
                throw new BadRequestException('Not enough balance');
            }

            const wallet = new ethers.Wallet(senderPrvKey, this.provider);
            const privateContract = this.publicContract.connect(wallet);
            const estimateGas = await privateContract.getFunction('transfer')(to,amount);
            const tx = await privateContract.getFunction('transfer')(to,amount, {
                gasLimit: estimateGas
            });
            const receipt = await tx.wait();
            return receipt;
        } catch (e){
            throw new BadRequestException(e.message);
        }

    }

    async transferFrom(from:string,to:string,amount:string, spenderPrvKey:string){
        try{
            const allowance = await this.allowance(from,spenderPrvKey);
            if(+allowance < +amount){
                throw new BadRequestException('Not enough allowance');
            }
            const balance = await this.balanceOf(from);
            if(+balance.balance < +amount){
                throw new BadRequestException('Not enough balance');
            }
            const wallet = new ethers.Wallet(spenderPrvKey, this.provider);
            const privateContract = this.publicContract.connect(wallet);
            const estimateGas = await privateContract.getFunction('transferFrom')(from,to, amount);
            const tx = await privateContract.getFunction('transferFrom')(from,to, amount, {
                gasLimit: estimateGas
            });
            const receipt = await tx.wait();
            return receipt;
        } catch (e){
            throw new BadRequestException(e.message);
        }

    }







}