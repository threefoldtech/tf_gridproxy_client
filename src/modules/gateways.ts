import { AbstractClient } from "./abstract_client"
import {
  CertificationType,
  GatewayBuilder,
  GatewaysQuery,
  NodeStatus,
} from "../builders/public_api"
import { assertId, resolvePaginator } from "../utils"

export interface Resources {
  cru: number
  sru: number
  hru: number
  mru: number
}
export interface Location {
  country: string
  city: string
}
export interface PublicConfig {
  domain: string
  gw4: string
  gw6: string
  ipv4: string
  ipv6: string
}

export interface GridNode {
  id: string
  nodeId: number
  farmId: number
  twinId: number
  country: string
  gridVersion: number
  city: string
  uptime: number
  created: number
  farmingPolicyId: number
  updatedAt: number
  total_resources: Resources
  used_resources: Resources
  location: Location
  publicConfig: PublicConfig
  status: NodeStatus
  certificationType: CertificationType
  dedicated: boolean
  rentContractId: number
  rentedByTwinId: number
}

export class GatewaysClient extends AbstractClient<
  GatewayBuilder,
  GatewaysQuery
> {
  constructor(uri: string) {
    super({
      uri,
      Builder: GatewayBuilder,
    })
  }

  public async list(queries: Partial<GatewaysQuery> = {}) {
    const res = await this.builder(queries).build("/gateways")
    return resolvePaginator<GridNode[]>(res)
  }

  public async byId(nodeId: number): Promise<GridNode> {
    assertId(nodeId)
    const res = await this.builder({}).build(`/gateways/${nodeId}`)
    return res.json()
  }
}
