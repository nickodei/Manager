module Manager.Server.Database

open Npgsql
open SqlHydra.Query

let openContext () =
    let compiler = SqlKata.Compilers.PostgresCompiler()
    let dataSourceBuilder = NpgsqlDataSourceBuilder("Host=127.0.0.1;Username=api;Password=admin;Database=manager")

    let connection = dataSourceBuilder.Build()
    let conn = connection.OpenConnection()

    let ctx = new QueryContext(conn, compiler)
#if DEBUG
    ctx.Logger <- printfn "SQL: %O"
#endif
    ctx
