import { resolvePaginator } from "utils"
import { NodesBuilder, NodesQuery } from "../builders/nodes"
import { AbstractClient } from "./abstract_client"
import { GridNode } from "./gateways"

export class NodesClient extends AbstractClient<NodesBuilder, NodesQuery> {
  constructor(uri: string) {
    super({
      uri,
      Builder: NodesBuilder,
    })
  }

  public async list(queries: Partial<NodesQuery> = {}) {
    const res = await this.builder(queries).build("/nodes")
    return resolvePaginator<GridNode[]>(res)
  }

  public async byId(nodeId: number): Promise<GridNode> {
    const res = await this.builder({}).build(`/nodes/${nodeId}`)
    return res.json()
  }
}
