import { JwtModuleOptions } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

export const getJWTConfig = async (
  ConfigService: ConfigService,
): Promise<JwtModuleOptions> => {
  return {
    secret: ConfigService.get('JWT_SECRET'),
  };
};
