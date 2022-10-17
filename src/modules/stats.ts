import { AbstractClient } from "./abstract_client"
import { StatsBuilder, StatsQuery } from "../builders/public_api"

export interface Stats {
  nodes: number
  farms: number
  countries: number
  totalCru: number
  totalSru: number
  totalMru: number
  totalHru: number
  publicIps: number
  accessNodes: number
  gateways: number
  twins: number
  contracts: number
  nodesDistribution: { [key: string]: number }
}

export class StatsClient extends AbstractClient<StatsBuilder, StatsQuery> {
  constructor(uri: string) {
    super({
      uri,
      Builder: StatsBuilder,
    })
  }

  public get(queries: Partial<StatsQuery> = {}): Promise<Stats> {
    return this.builder(queries).build<Stats>("/stats")
  }
}
