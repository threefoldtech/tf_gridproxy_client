import { assertPattern, assertString } from "../utils"

export type BuilderMapper<T> = {
  [K in keyof T]: string
}

export type BuilderValidator<T> = {
  [K in keyof T]: (value: T[K]) => void | never
}

export interface BuilderOptions<T> {
  mapper: BuilderMapper<T>
  validator: BuilderValidator<T>
  queries: Partial<T>
}

export abstract class AbstractBuilder<T> {
  public abstract readonly uri: string
  private readonly __queries: Partial<T>
  private readonly __mapper: BuilderMapper<T>
  private readonly __validator: BuilderValidator<T>

  public constructor(options: BuilderOptions<T>) {
    this.__mapper = options.mapper
    this.__validator = options.validator
    this.__queries = options.queries

    const self = this
    for (const key of Object.keys(self.__mapper)) {
      Object.defineProperty(self, key, {
        value(value: any) {
          self.__queries[key as any] = value
          return self
        },
      })
    }
  }

  public async build<R>(path: string): Promise<R> {
    assertString(path)
    assertPattern(path, /^\//)

    const out: string[] = []

    for (const key in this.__queries) {
      this.__validator[key](this.__queries[key]!)
      out.push(`${this.__mapper[key]}=${this.__queries[key]}`)
    }

    const query = out.length > 0 ? `?${out.join("&")}` : ""
    const response = await fetch(`${this.uri}${path}${query}`)
    return response.json()
  }
}

export type BuilderMethods<T> = {
  [K in keyof T]: (value: T[K]) => AbstractBuilder<T>
}
