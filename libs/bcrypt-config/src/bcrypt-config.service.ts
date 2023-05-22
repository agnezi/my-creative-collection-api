import * as bcrypt from 'bcrypt';

import { Injectable } from '@nestjs/common';

@Injectable()
export class BcryptConfigService {
  hashPassword(password: string) {
    const saultRounds = 10;

    const hash = bcrypt.hashSync(password, saultRounds);

    return hash;
  }

  comparePassword(password: string, hash: string): boolean {
    return bcrypt.compareSync(password, hash);
  }
}
