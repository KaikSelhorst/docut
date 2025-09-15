import { hash, type Options, verify } from '@node-rs/argon2'
import type { HashComparer, Hasher } from './protocols'

const argon2Options = {
  algorithm: 2,
  memoryCost: 16384,
  parallelism: 1,
  timeCost: 4
} as Options

export class Argon2Adapter implements Hasher, HashComparer {
  // biome-ignore lint/correctness/noUnusedFunctionParameters: this implements the protocol
  async hash(plaintext: string, salt?: string): Promise<string> {
    return hash(plaintext, argon2Options)
  }

  async compare(payload: { hash: string; password: string }): Promise<boolean> {
    return verify(payload.hash, payload.password, argon2Options)
  }
}
