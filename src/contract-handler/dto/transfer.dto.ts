import { ApiProperty } from "@nestjs/swagger";

export class TransferDto {
    @ApiProperty()
    to: string;
    @ApiProperty()
    amount: string;
    @ApiProperty()
    senderPrvKey: string;
}