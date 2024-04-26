module Common.Database

open FSharp.Data.Sql

[<AutoOpen>]
module Database =
    [<Literal>]
    let dbVendor = Common.DatabaseProviderTypes.POSTGRESQL

    [<Literal>]
    let connectionString = "Host=127.0.0.1;Username=api;Password=admin;Database=manager"

    [<Literal>]
    let useOptTypes = Common.NullableColumnType.OPTION

    type database = SqlDataProvider<dbVendor, connectionString, UseOptionTypes=useOptTypes>
    
    let createContext (conn: string) =
        database.GetDataContext(conn)
