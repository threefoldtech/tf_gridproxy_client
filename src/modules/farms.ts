import { resolvePaginator } from "../utils"
import {
  CertificationType,
  FarmsBuilder,
  FarmsQuery,
} from "../builders/public_api"
import { AbstractClient } from "./abstract_client"

export interface PublicIp {
  id: string
  ip: string
  farmId: string
  contractId: number
  gateway: string
}

export interface Farm {
  name: string
  farmId: number
  twinId: number
  pricingPolicyId: number
  certificationType: CertificationType
  stellarAddress: string
  dedicated: boolean
  publicIps: PublicIp[]
}

export class FarmsClient extends AbstractClient<FarmsBuilder, FarmsQuery> {
  constructor(uri: string) {
    super({
      uri,
      Builder: FarmsBuilder,
    })
  }

  public async list(queries: Partial<FarmsQuery> = {}) {
    const res = await this.builder(queries).build("/farms")
    return resolvePaginator<Farm[]>(res)
  }
}
