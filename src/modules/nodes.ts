import { resolvePaginator } from "../utils"
import { NodesBuilder, type NodesQuery } from "../builders/nodes"
import { AbstractClient } from "./abstract_client"
import type { GridNode } from "./gateways"
import type { Farm, FarmsClient } from "./farms"

export interface NodesExtractOptions {
  loadFarm?: boolean
}

export class NodesClient extends AbstractClient<NodesBuilder, NodesQuery> {
  public farms: Map<number, Farm>

  constructor(uri: string, private readonly __farmsClient: FarmsClient) {
    super({
      uri,
      Builder: NodesBuilder,
    })

    this.farms = new Map<number, Farm>()
    this.getFarm = this.getFarm.bind(this)
  }

  public async list(
    queries: Partial<NodesQuery> = {},
    extraOptions: NodesExtractOptions = {}
  ) {
    const res = await this.builder(queries).build("/nodes")
    const nodes = await resolvePaginator<GridNode[]>(res)
    if (extraOptions.loadFarm) {
      nodes.data = await Promise.all(nodes.data.map(this.getFarm))
    }
    return nodes
  }

  public async byId(
    nodeId: number,
    extraOptions: NodesExtractOptions = {}
  ): Promise<GridNode> {
    const res = await this.builder({}).build(`/nodes/${nodeId}`)
    const node = await res.json()
    if (extraOptions.loadFarm && node) {
      return this.getFarm(node)
    }
    return node
  }

  public async getFarm(node: GridNode): Promise<GridNode> {
    if (this.farms.has(node.farmId)) {
      node.farm = this.farms.get(node.farmId)!
      return node
    }

    const { data } = await this.__farmsClient.list({ farmId: node.farmId })
    const [farm] = data
    this.farms = this.farms.set(node.farmId, farm)
    node.farm = farm
    return node
  }
}
