import {
  ContractsBuilder,
  ContractsQuery,
  ContractState,
  ContractType,
} from "../builders/public_api"
import { AbstractClient } from "./abstract_client"

export enum Discount {
  Default = "Default",
  None = "none",
  Bronze = "Bronze",
  Silver = "Silver",
  Gold = "Gold",
}

export interface ContractDetails {
  nodeId: number
  deployment_data?: string
  deployment_hash?: string
  number_of_public_ips?: number
}

export interface ContractBilling {
  amountBilled: number
  discountReceived: Discount
  timestamp: number
}

export interface Contract {
  contractId: number
  twinId: number
  state: ContractState
  created_at: number
  type: ContractType
  details: ContractDetails
  billing: Array<ContractBilling>
}

export class ContractsClient extends AbstractClient<
  ContractsBuilder,
  ContractsQuery
> {
  constructor(uri: string) {
    super({
      uri,
      Builder: ContractsBuilder,
    })
  }

  public list(queries: Partial<ContractsQuery> = {}): Promise<Contract[]> {
    return this.builder(queries).build<Contract[]>("/contracts")
  }
}
