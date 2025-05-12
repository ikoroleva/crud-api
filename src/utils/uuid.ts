import { validate as uuidValidate } from 'uuid';

export const isUuid = (maybe: string) => uuidValidate(maybe);
