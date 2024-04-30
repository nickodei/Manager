module Server

open Giraffe
open Saturn

let webApp = choose [ Api.create Api.recepiesApi ]

let app =
    application {
        use_router webApp
        memory_cache
        use_static "public"
        use_gzip
    }

run app
