import { ConfigService } from '@nestjs/config';
import { TypegooseModuleOptions } from 'nestjs-typegoose';
export const getMongoConfig = async (
  ConfigService: ConfigService,
): Promise<TypegooseModuleOptions> => {
  return {
    uri: getMongoString(ConfigService),
    ...getMongoOptions(),
  };
};

const getMongoString = (ConfigService: ConfigService) => {
  return (
    'mongodb://' +
    ConfigService.get('MONGO_LOGIN') +
    ':' +
    ConfigService.get('MONGO_PASSWORD') +
    '@' +
    ConfigService.get('MONGO_HOST') +
    ':' +
    ConfigService.get('MONGO_PORT') +
    '/' +
    ConfigService.get('MONGO_AUTHDATABASE')
  );
};

const getMongoOptions = () => ({
  useNewUrlParser: true,
});
