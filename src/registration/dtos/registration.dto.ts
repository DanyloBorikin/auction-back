import { Matches, Length, IsString } from 'class-validator';
import { PASSWORD_REGEXP, EMAIL_REGEXP } from '../../common/constants';
import { IsEqualWith } from '../../common/decorators/is-equal-with';
import { ApiProperty } from '@nestjs/swagger';

export class RegistrationDto {
  @ApiProperty({ example: 'Elvis', description: 'username' })
  @IsString()
  username: string;

  @ApiProperty({ example: 'test@test.com', description: 'Email address' })
  @Matches(EMAIL_REGEXP, { always: true })
  email: string;

  @ApiProperty({ example: 'Somepassword23#', description: 'Password' })
  @Length(10, 30)
  @Matches(PASSWORD_REGEXP, { always: true })
  password: string;

  @ApiProperty({ example: 'Somepassword23#', description: 'Password confirmation' })
  @IsEqualWith({ context: 'password' })
  passwordConfirm: string;
}
