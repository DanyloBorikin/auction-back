import { Matches, Length, IsString } from 'class-validator';
import { EMAIL_REGEXP } from '../../common/constants';
import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty({ example: 'Elvis', description: 'username' })
  @IsString()
  username: string;

  @ApiProperty({ example: 'test@test.com', description: 'Email address' })
  @Matches(EMAIL_REGEXP, { always: true })
  email: string;
}