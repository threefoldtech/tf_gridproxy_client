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

  public list(queries: Partial<NodesQuery> = {}): Promise<GridNode[]> {
    return this.builder(queries).build<GridNode[]>("/nodes")
  }

  public byId(nodeId: number): Promise<GridNode> {
    return this.builder({}).build<GridNode>(`/nodes/${nodeId}`)
  }
}
