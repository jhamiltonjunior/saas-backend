export interface IDatabase {
  query(sql: string, values: any[]): Promise<any>
  writer(sql: string, values: any[]): Promise<any>
  reader(sql: string, values: any[]): Promise<any>

  disconnect (): Promise<void>
}
