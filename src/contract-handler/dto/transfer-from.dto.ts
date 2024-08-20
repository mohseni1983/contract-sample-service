import { ApiProperty } from "@nestjs/swagger";

export class TransferFromDto {
    @ApiProperty()
    from: string;
    @ApiProperty()
    to: string;
    @ApiProperty()
    amount: string;
    @ApiProperty()
    senderPrvKey: string;
}