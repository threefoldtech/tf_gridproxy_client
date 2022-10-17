import { TwinsBuilder, TwinsQuery } from "../builders/twins"
import { AbstractClient } from "./abstract_client"

export interface Twin {
  twinId: number
  accountId: string
  ip: string
}

export class TwinsClient extends AbstractClient<TwinsBuilder, TwinsQuery> {
  constructor(uri: string) {
    super({
      uri,
      Builder: TwinsBuilder,
    })
  }

  public list(queries: Partial<TwinsQuery> = {}): Promise<Twin[]> {
    return this.builder(queries).build<Twin[]>("/twins")
  }
}
